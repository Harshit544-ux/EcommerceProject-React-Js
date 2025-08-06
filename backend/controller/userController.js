import {
  createUser,
  loginUserService
} from '../services/userServices.js';
import { generateToken } from '../utils/jwt.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create user in Supabase (or your DB)
    const user = await createUser({ name, email, password });

    // Generate JWT token
    const token = generateToken(user.id); // use `user.id` or `user._id` depending on your DB

    return res.status(201).json({ success: true, token });
  } catch (error) {
    if (error.message.includes('User already registered')) {
        return res.status(409).json({ success: false, message: 'User already exists' });
    }
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = await loginUserService(email, password);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};



export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({ success: true, token });
  } else {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
};
