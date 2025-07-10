// controllers/authController.js
import bcrypt from 'bcrypt';
import { db } from '../config/dbClient.js';
import { users } from '../config/schema.js';
import { eq } from 'drizzle-orm';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password, address,role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    address,
    role: role ||'user',
  }).returning();

  const token = generateToken({ id: newUser[0].id, role: newUser[0].role });

  res.status(201).json({
    user: {
      id: newUser[0].id,
      name: newUser[0].name,
      email: newUser[0].email,
      address: newUser[0].address,
      role: newUser[0].role,
    },
    token,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const found = await db.select().from(users).where(eq(users.email, email));
  const user = found[0];

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken({ id: user.id, role: user.role });

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
    },
    token,
  });
};

export const updateUserPassword = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id;

  if (!newPassword) return res.status(400).json({ message: 'New password required' });

  const hashed = await bcrypt.hash(newPassword, 10);
  await db.update(users)
    .set({ password: hashed })
    .where(eq(users.id, userId));

  res.json({ message: 'Password updated successfully' });
};
