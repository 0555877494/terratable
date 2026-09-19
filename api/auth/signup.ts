import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sql = await getDb();
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  if (role === 'admin') {
    return res.status(403).json({ error: 'Admin registration is not allowed' });
  }

  try {
    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM profiles WHERE email = ${email}
    `;

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await sql`
      INSERT INTO profiles (email, password_hash, full_name, role)
      VALUES (${email}, ${passwordHash}, ${name}, ${role || 'customer'})
      RETURNING id, email, full_name, role, phone, address
    `;

    // Create loyalty points entry
    await sql`
      INSERT INTO loyalty_points (user_id, points, tier)
      VALUES (${newUser[0].id}, 0, 'bronze')
    `;

    // Generate token
    const token = jwt.sign(
      { userId: newUser[0].id, email: newUser[0].email, role: newUser[0].role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].full_name,
        role: newUser[0].role,
        phone: newUser[0].phone,
        address: newUser[0].address
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
}
