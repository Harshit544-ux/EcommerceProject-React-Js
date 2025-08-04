import supabase from "../config/supabase.js";

export const getAllProduct = async () => {
  const { data, error } = await supabase.from('products').select('*');
  return { data, error };
};


// ✅ Create a new product
export const createProduct = async (productData) => {
  const { data, error } = await supabase.from('products').insert([productData]).select().single();
  return { data, error };
};

// ✅ Delete a product by ID
export const deleteProductById = async (id) => {
  const { data, error } = await supabase.from('products').delete().eq('id', id).select().single();
  return { data, error };
};

// ✅ Get a single product by ID
export const getProductById = async (id) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  return { data, error };
};