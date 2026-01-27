import express from 'express'
import { addToCart,getUserCart,updateCart } from '../controller/cartController.js'
import { authUser } from '../middleware/auth.js';

export const cartRoutes=express.Router();

//define the cart routes
cartRoutes.post('/get', authUser,getUserCart);
cartRoutes.post('/add',authUser,addToCart);
cartRoutes.post('/update',authUser,updateCart);