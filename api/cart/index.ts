import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function authenticate(req: VercelRequest): Promise<{ userId: string; role: string } | null> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticate(req);
  if (!auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = await getDb();

  try {
    const cartItems = await sql`
      SELECT 
        c.id,
        c.product_id,
        c.quantity,
        p.name,
        p.price,
        p.image,
        p.category,
        p.origin,
        p.weight,
        p.in_stock,
        p.stock_count,
        (c.quantity * p.price) as subtotal
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ${auth.userId}
      ORDER BY c.created_at DESC
    `;

    const subtotal = cartItems.reduce((sum: number, item: any) => sum + parseFloat(item.subtotal), 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal >= 50 ? 0 : 7.99;
    const total = subtotal + tax + shipping;

    res.status(200).json({
      items: cartItems,
      subtotal,
      tax,
      shipping,
      total,
      itemCount: cartItems.reduce((sum: number, item: any) => sum + parseInt(item.quantity), 0)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
}
