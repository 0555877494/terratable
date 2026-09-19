import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = await getDb();
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    const product = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;

    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ data: product[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}
