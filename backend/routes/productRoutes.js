import express from 'express';
import {
  getProducts,
  addProduct,
  singleProduct,
  removeProduct,
  updateProduct,
  searchProducts,
  getCategories,
  getBestsellers,
  getLatest
} from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminauth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/bestsellers', getBestsellers);
router.get('/latest', getLatest);
router.get('/search', searchProducts);
router.get('/categories', getCategories);
router.get('/:id', singleProduct);

// Admin routes (protected)
router.post(
  "/add", 
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

router.put(
  "/:id", 
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  updateProduct
);

router.delete("/:id", adminAuth, removeProduct);

export default router;