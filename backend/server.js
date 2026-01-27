import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js";
import productRoutes from "./routes/productRoutes.js";
import useRouter from "./routes/userRoutes.js";
import { cartRoutes } from "./routes/cartRoute.js";
import { errorHandler } from './middleware/errorHandler.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;


// Initialize Cloudinary
connectCloudinary();

// Middleware
app.use(express.json({ limit: '10mb' })); // Increase limit as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// Routes
app.use('/', useRouter);
app.use('/products', productRoutes);
app.use('/cart',cartRoutes);

// Error handling middleware (add this before app.listen)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
