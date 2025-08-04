import express from 'express';
import {
getProducts,
addProduct,
singleProduct,
removeProduct
} from '../controller/productController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/', getProducts);
router.post(
  "/add",
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

router.get("/:id", singleProduct);
router.delete("/:id", removeProduct);

export default router;