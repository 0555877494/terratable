import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';
import { authenticate } from './index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = await authenticate(req);
  if (!auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = await getDb();
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // Check if product exists and is in stock
    const products = await sql`
      SELECT id, stock_count, in_stock FROM products WHERE id = ${productId}
    `;

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];
    if (!product.in_stock || product.stock_count < quantity) {
      return res.status(400).json({ error: 'Product out of stock' });
    }

    // Check if item already in cart
    const existing = await sql`
      SELECT id, quantity FROM cart WHERE user_id = ${auth.userId} AND product_id = ${productId}
    `;

    if (existing.length > 0) {
      // Update quantity
      await sql`
        UPDATE cart 
        SET quantity = quantity + ${quantity}, updated_at = NOW()
        WHERE id = ${existing[0].id}
      `;
    } else {
      // Add new item
      await sql`
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (${auth.userId}, ${productId}, ${quantity})
      `;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
}
