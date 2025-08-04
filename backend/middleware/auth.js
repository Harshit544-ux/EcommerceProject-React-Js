// import { getUser } from '../services/userService.js';

// export const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });

//   const { data, error } = await getUser(token);
//   if (error) return res.status(401).json({ error: error.message });

//   req.user = data.user;
//   next();
// };
