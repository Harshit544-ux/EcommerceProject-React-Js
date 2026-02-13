import supabase from '../config/supabase.js';

/**
 * Get cart for a user
 * @param {string} userId - User ID from JWT token
 * @returns {Object} - { data, error }
 */
export const getUserCartService = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const { data, error } = await supabase
      .from("carts")
      .select("cart_data")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error("getUserCartService error:", err);
    return { data: null, error: err };
  }
};

/**
 * Add item to cart (or increase quantity if already exists)
 * Uses Supabase upsert to handle both new and existing carts
 * @param {string} userId - User ID from JWT token
 * @param {string} itemId - Product ID
 * @param {string} size - Product size (S, M, L, XL, etc.)
 * @returns {Object} - { data, error }
 */
export const addToCartService = async (userId, itemId, size) => {
  try {
    // Validate inputs
    if (!userId || !itemId || !size) {
      throw new Error("userId, itemId, and size are required");
    }

    // Fetch existing cart
    const { data: userData, error: fetchError } = await getUserCartService(userId);
    if (fetchError) throw fetchError;

    // Initialize cart data structure
    let cartData = userData?.cart_data || {};

    // Update quantity logic:
    // - If item doesn't exist, create it
    // - If item exists but not this size, add size
    // - If item and size exist, increment quantity by 1
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    // Upsert cart (insert if new user, update if existing)
    // onConflict: "user_id" ensures one cart per user
    const { error: upsertError } = await supabase
      .from("carts")
      .upsert(
        { user_id: userId, cart_data: cartData },
        { onConflict: "user_id" }
      );

    if (upsertError) throw upsertError;

    return { data: cartData, error: null };
  } catch (err) {
    console.error("addToCartService error:", err);
    return { data: null, error: err };
  }
};

/**
 * Update entire cart data
 * Used for bulk updates (e.g., changing quantities, removing items)
 * @param {string} userId - User ID from JWT token
 * @param {Object} cartData - Complete cart data object
 * @returns {Object} - { data, error }
 */
export const updateCartService = async (userId, cartData) => {
  try {
    // Validate inputs
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!cartData || typeof cartData !== 'object') {
      throw new Error("Invalid cart data");
    }

    // Check if cart exists for this user
    const { data: existingCart } = await getUserCartService(userId);

    if (!existingCart) {
      // If no cart exists, create one using upsert
      const { error: upsertError } = await supabase
        .from("carts")
        .upsert(
          { user_id: userId, cart_data: cartData },
          { onConflict: "user_id" }
        );

      if (upsertError) throw upsertError;
    } else {
      // Update existing cart
      const { error } = await supabase
        .from("carts")
        .update({ cart_data: cartData })
        .eq("user_id", userId);

      if (error) throw error;
    }

    return { data: cartData, error: null };
  } catch (err) {
    console.error("updateCartService error:", err);
    return { data: null, error: err };
  }
};
