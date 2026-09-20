import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';
import { authenticate } from './cart/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = await getDb();

  if (req.method === 'GET') {
    // Get reviews for a product
    const { productId } = req.query;

    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
      const reviews = await sql`
        SELECT 
          r.*,
          p.full_name as user_name,
          p.avatar_url as user_avatar
        FROM reviews r
        JOIN profiles p ON r.user_id = p.id
        WHERE r.product_id = ${productId}
        ORDER BY r.created_at DESC
      `;

      res.status(200).json({  reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else if (req.method === 'POST') {
    // Create a review
    const auth = await authenticate(req);
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { productId, rating, comment, images } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({ error: 'Product ID and rating are required' });
    }

    try {
      // Check if user already reviewed this product
      const existing = await sql`
        SELECT id FROM reviews WHERE user_id = ${auth.userId} AND product_id = ${productId}
      `;

      if (existing.length > 0) {
        return res.status(409).json({ error: 'You already reviewed this product' });
      }

      // Create review
      await sql`
        INSERT INTO reviews (product_id, user_id, rating, comment, images)
        VALUES (${productId}, ${auth.userId}, ${rating}, ${comment || null}, ${images || '[]'})
      `;

      // Update product rating
      const avgResult = await sql`
        SELECT AVG(rating) as avg_rating, COUNT(*) as review_count
        FROM reviews
        WHERE product_id = ${productId}
      `;

      const avgRating = parseFloat(avgResult[0].avg_rating);
      const reviewCount = parseInt(avgResult[0].review_count);

      await sql`
        UPDATE products
        SET rating = ${avgRating}, reviews_count = ${reviewCount}
        WHERE id = ${productId}
      `;

      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  } else if (req.method === 'PUT') {
    // Mark review as helpful
    const auth = await authenticate(req);
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { reviewId } = req.body;

    if (!reviewId) {
      return res.status(400).json({ error: 'Review ID is required' });
    }

    try {
      await sql`
        UPDATE reviews
        SET helpful_count = helpful_count + 1
        WHERE id = ${reviewId}
      `;

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: 'Failed to update review' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
