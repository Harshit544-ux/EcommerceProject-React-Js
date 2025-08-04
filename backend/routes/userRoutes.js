import express from 'express';
import {
registerUser,
loginUser
} from '../controller/userController.js';


const useRouter = express.Router();

useRouter.post('/register', registerUser);
useRouter.post('/login', loginUser);
// useRouter.get('/profile', authMiddleware, getUserProfile);

export default useRouter;
