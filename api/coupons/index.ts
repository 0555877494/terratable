import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = await getDb();

  if (req.method === 'POST') {
    // Validate coupon
    const { code, cartTotal } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Coupon code is required' });
    }

    try {
      const coupons = await sql`
        SELECT * FROM coupons 
        WHERE code = ${code.toUpperCase()} 
        AND active = true
        AND (expires_at IS NULL OR expires_at > NOW())
        AND (max_uses IS NULL OR used_count < max_uses)
      `;

      if (coupons.length === 0) {
        return res.status(404).json({ error: 'Invalid or expired coupon' });
      }

      const coupon = coupons[0];

      // Check minimum order
      if (coupon.min_order && cartTotal < coupon.min_order) {
        return res.status(400).json({ 
          error: `Minimum order of $${coupon.min_order} required` 
        });
      }

      // Calculate discount
      let discount = 0;
      if (coupon.discount_type === 'percentage') {
        discount = cartTotal * (coupon.discount / 100);
      } else {
        discount = coupon.discount;
      }

      res.status(200).json({
        valid: true,
        discount,
        discountType: coupon.discount_type,
        message: `Coupon applied! You save $${discount.toFixed(2)}`
      });
    } catch (error) {
      console.error('Error validating coupon:', error);
      res.status(500).json({ error: 'Failed to validate coupon' });
    }
  } else if (req.method === 'PUT') {
    // Apply coupon (increment usage)
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Coupon code is required' });
    }

    try {
      await sql`
        UPDATE coupons
        SET used_count = used_count + 1
        WHERE code = ${code.toUpperCase()}
      `;

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error applying coupon:', error);
      res.status(500).json({ error: 'Failed to apply coupon' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
