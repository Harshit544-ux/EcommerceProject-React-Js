import supabase from "../config/supabase.js";

export const getAllProduct = async () => {
  const { data, error } = await supabase.from('products').select('*');
  return { data, error };
};