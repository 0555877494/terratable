import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';
import { authenticate } from './cart/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticate(req);
  if (!auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = await getDb();

  if (req.method === 'GET') {
    // Get wishlist
    try {
      const wishlist = await sql`
        SELECT 
          w.id,
          w.product_id,
          p.name,
          p.price,
          p.image,
          p.category,
          p.origin,
          p.rating,
          p.reviews_count,
          p.in_stock,
          p.stock_count
        FROM wishlist w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = ${auth.userId}
        ORDER BY w.created_at DESC
      `;

      res.status(200).json({ data: wishlist });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
  } else if (req.method === 'POST') {
    // Add to wishlist
    try {
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      // Check if already in wishlist
      const existing = await sql`
        SELECT id FROM wishlist WHERE user_id = ${auth.userId} AND product_id = ${productId}
      `;

      if (existing.length > 0) {
        return res.status(409).json({ error: 'Product already in wishlist' });
      }

      await sql`
        INSERT INTO wishlist (user_id, product_id)
        VALUES (${auth.userId}, ${productId})
      `;

      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).json({ error: 'Failed to add to wishlist' });
    }
  } else if (req.method === 'DELETE') {
    // Remove from wishlist
    try {
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      await sql`
        DELETE FROM wishlist WHERE user_id = ${auth.userId} AND product_id = ${productId}
      `;

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ error: 'Failed to remove from wishlist' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
