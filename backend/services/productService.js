import supabase from "../config/supabase.js";

// Get all products
export const getAllProduct = async () => {
  const { data, error } = await supabase.from('products').select('*');
  console.log(data);
  return { data, error };
};

//  Create a new product
export const createProduct = async (productData) => {
  const { data, error } = await supabase.from('products').insert([productData]).select().single();
  return { data, error };
};

//  Delete a product by ID
export const deleteProductById = async (id) => {
  const { data, error } = await supabase.from('products').delete().eq('id', id).select().single();
  return { data, error };
};

//  Get a single product by ID
export const getProductById = async (id) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  return { data, error };
};

// Update a product by ID
export const updateProductById = async (id, updateData) => {
  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);
  return { data, error };
};

// Get bestseller products

export const getBestsellerProducts = async () => {

  const { data, error } = await supabase

    .from('products')

    .select('*')

    .eq('bestseller', true);

  return { data, error };

};



// Get latest products

export const getLatestProducts = async () => {

  const { data, error } = await supabase

    .from('products')

    .select('*')

    .order('created_at', { ascending: false })

    .limit(10);

  return { data, error };

};
