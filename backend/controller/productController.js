import { v2 as cloudinary } from 'cloudinary';
import connectCloudinary, { uploadToCloudinary } from '../config/cloudinary.js'; // adjust the path as needed

import { getAllProduct, createProduct, deleteProductById, getProductById } from "../services/productService.js"

export const getProducts = async (req, res) => {
    const { data, error } = await getAllProduct();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Helper function to upload image to Cloudinary
    const uploadImage = (file) => {
      return new Promise((resolve, reject) => {
        if (!file) {
          resolve(null);
          return;
        }

        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            public_id: `products/${Date.now()}_${file.originalname}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        
        stream.end(file.buffer);
      });
    };

    // Get files from multer
    const files = req.files;
    const imageFields = ['image1', 'image2', 'image3', 'image4'];

    // Upload all images in parallel
    const uploadedImages = await Promise.all(
      imageFields.map(async (field) => {
        const file = files?.[field]?.[0];
        return file ? await uploadImage(file) : null;
      })
    );

    // Parse sizes safely
    let parsedSizes = [];
    if (sizes) {
      try {
        // Handle different formats of sizes
        if (typeof sizes === 'string') {
          // Remove single quotes and parse as JSON
          const cleanSizes = sizes.replace(/'/g, '"');
          parsedSizes = JSON.parse(cleanSizes);
        } else if (Array.isArray(sizes)) {
          parsedSizes = sizes;
        }
      } catch (error) {
        console.log('Error parsing sizes, using empty array:', error.message);
        parsedSizes = [];
      }
    }

    const productData = {
      name,
      description,
      price: parseFloat(price) || 0, // Ensure price is a number
      category,
      subcategory: subCategory,
      sizes: parsedSizes, // Use the safely parsed sizes
      bestseller: bestseller === 'true' || bestseller === true, // Convert to boolean
      images: uploadedImages.filter(Boolean), // Remove nulls
    };

    console.log('Product data to save:', productData);

    const { data, error } = await createProduct(productData);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE /products/:id - Remove product by ID
export const removeProduct = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await deleteProductById(id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, message: "Product removed", data });
};

// ✅ GET /products/:id - Get single product by ID
export const singleProduct = async (req, res) => {
  const { id } = req.body; // 👈 Get id from body
  if (!id) return res.status(400).json({ error: 'ID is required' });

  const { data, error } = await getProductById(id);
  if (error) return res.status(404).json({ error: "Product not found" });
  res.json(data);
};

