import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = await getDb();

  try {
    const products = await sql`
      SELECT * FROM products 
      ORDER BY 
        CASE badge 
          WHEN 'bestseller' THEN 1 
          WHEN 'new' THEN 2 
          WHEN 'sale' THEN 3 
          WHEN 'limited' THEN 4 
          ELSE 5 
        END,
        rating DESC
    `;

    res.status(200).json({ data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
