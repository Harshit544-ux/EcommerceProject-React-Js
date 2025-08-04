import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js";
import productRoutes from "./routes/productRoutes.js";
import useRouter from "./routes/userRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Initialize Cloudinary
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', useRouter);
app.use('/products', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
