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
    // Get user's loyalty points
    try {
      const loyalty = await sql`
        SELECT * FROM loyalty_points WHERE user_id = ${auth.userId}
      `;

      if (loyalty.length === 0) {
        return res.status(200).json({
          points: 0,
          tier: 'bronze',
          totalEarned: 0,
          totalRedeemed: 0
        });
      }

      const data = loyalty[0];
      
      // Calculate next tier
      const tiers = [
        { name: 'bronze', min: 0, max: 999 },
        { name: 'silver', min: 1000, max: 2499 },
        { name: 'gold', min: 2500, max: 4999 },
        { name: 'platinum', min: 5000, max: Infinity }
      ];

      const currentTier = tiers.find(t => t.name === data.tier) || tiers[0];
      const nextTier = tiers[tiers.indexOf(currentTier) + 1];
      const pointsToNextTier = nextTier ? nextTier.min - data.points : 0;

      res.status(200).json({
        points: data.points,
        tier: data.tier,
        totalEarned: data.total_earned,
        totalRedeemed: data.total_redeemed,
        nextTier: nextTier?.name || null,
        pointsToNextTier
      });
    } catch (error) {
      console.error('Error fetching loyalty points:', error);
      res.status(500).json({ error: 'Failed to fetch loyalty points' });
    }
  } else if (req.method === 'POST') {
    // Redeem points
    const { points, reward } = req.body;

    if (!points || !reward) {
      return res.status(400).json({ error: 'Points and reward are required' });
    }

    try {
      const loyalty = await sql`
        SELECT * FROM loyalty_points WHERE user_id = ${auth.userId}
      `;

      if (loyalty.length === 0 || loyalty[0].points < points) {
        return res.status(400).json({ error: 'Insufficient points' });
      }

      // Update points
      await sql`
        UPDATE loyalty_points
        SET 
          points = points - ${points},
          total_redeemed = total_redeemed + ${points},
          updated_at = NOW()
        WHERE user_id = ${auth.userId}
      `;

      res.status(200).json({ 
        success: true, 
        message: `Redeemed ${points} points for ${reward}` 
      });
    } catch (error) {
      console.error('Error redeeming points:', error);
      res.status(500).json({ error: 'Failed to redeem points' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
