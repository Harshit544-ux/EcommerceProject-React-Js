import { getAllProduct } from "../services/productService.js";

export const getProducts = async (req, res) => {
  const { data, error } = await getAllProduct();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};