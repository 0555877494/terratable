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
    // Get user orders
    try {
      const orders = await sql`
        SELECT 
          o.*,
          json_agg(
            json_build_object(
              'id', oi.id,
              'product_id', oi.product_id,
              'quantity', oi.quantity,
              'price', oi.price,
              'product', json_build_object(
                'name', p.name,
                'image', p.image,
                'origin', p.origin
              )
            )
          ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ${auth.userId}
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;

      res.status(200).json({ data: orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  } else if (req.method === 'POST') {
    // Create new order
    try {
      const { shippingAddress, paymentMethod, notes, couponCode } = req.body;

      // Get cart items
      const cartItems = await sql`
        SELECT 
          c.product_id,
          c.quantity,
          p.price,
          p.stock_count,
          p.in_stock
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ${auth.userId}
      `;

      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      // Calculate totals
      const subtotal = cartItems.reduce((sum: number, item: any) => 
        sum + (parseFloat(item.price) * parseInt(item.quantity)), 0
      );
      const tax = subtotal * 0.08;
      const shipping = subtotal >= 50 ? 0 : 7.99;
      const total = subtotal + tax + shipping;

      // Create order
      const newOrder = await sql`
        INSERT INTO orders (
          user_id, status, total, subtotal, tax, shipping,
          payment_method, shipping_address, notes, coupon_code
        )
        VALUES (
          ${auth.userId}, 'pending', ${total}, ${subtotal}, ${tax}, ${shipping},
          ${paymentMethod}, ${shippingAddress}, ${notes || null}, ${couponCode || null}
        )
        RETURNING id
      `;

      const orderId = newOrder[0].id;

      // Create order items
      for (const item of cartItems) {
        await sql`
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (${orderId}, ${item.product_id}, ${item.quantity}, ${item.price})
        `;

        // Update stock
        await sql`
          UPDATE products 
          SET stock_count = stock_count - ${item.quantity}
          WHERE id = ${item.product_id}
        `;
      }

      // Clear cart
      await sql`DELETE FROM cart WHERE user_id = ${auth.userId}`;

      // Add loyalty points
      const pointsEarned = Math.floor(total);
      await sql`
        INSERT INTO loyalty_points (user_id, points, total_earned)
        VALUES (${auth.userId}, ${pointsEarned}, ${pointsEarned})
        ON CONFLICT (user_id) 
        DO UPDATE SET 
          points = loyalty_points.points + ${pointsEarned},
          total_earned = loyalty_points.total_earned + ${pointsEarned}
      `;

      res.status(201).json({ 
        orderId,
        total,
        message: 'Order created successfully'
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
