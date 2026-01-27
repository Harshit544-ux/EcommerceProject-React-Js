import supabase from '../config/supabase.js';



/**
 * Get cart for a user
 */
export const getUserCartService = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("carts")
      .select("cart_data")
      .eq("user_id", userId)
      .maybeSingle();
      

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};



// add the cart 
export const addToCartService = async (userId, itemId, size) => {
  try {
    // Fetch existing cart
    const { data: userData, error: fetchError } = await getUserCartService(userId);
    if (fetchError) throw fetchError;

    let cartData = userData?.cart_data || {};

    // Update quantity
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    // Upsert cart
    const { error: upsertError } = await supabase
      .from("carts")
      .upsert({ user_id: userId, cart_data: cartData }, { onConflict: "user_id" });

    if (upsertError) throw upsertError;

    return { data: cartData, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};


/**
 * Update item in cart
 */
export const updateCartService = async (userId, cartData) => {
  try {
    const { error } = await supabase
      .from("carts")
      .update({ cart_data: cartData })
      .eq("user_id", userId);

    if (error) throw error;
    return { data: cartData, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
