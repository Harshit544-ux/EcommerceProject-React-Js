import express from 'express';
import {
getProducts,
addProduct,
singleProduct,
removeProduct
} from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminauth.js';

const router = express.Router();

router.get('/',  adminAuth  ,getProducts);
router.post(
  "/add", adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

router.post("/:id",singleProduct);
router.delete("/:id", removeProduct);

export default router;