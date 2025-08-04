import {
  createUser,
} from '../services/userServices.js';
import { generateToken } from '../utils/jwt.js';



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


// export const loginUser = async (req, res) => {
//   const { data, error } = await loginUserService(req.body);
//   if (error) return res.status(401).json({ error: error.message });
//   res.json(data);
// };

// export const getUserProfile = async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });

//   const { data, error } = await getUser(token);
//   if (error) return res.status(401).json({ error: error.message });
//   res.json(data);
// };