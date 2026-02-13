import { addToCartService, updateCartService, getUserCartService } from "../services/cartService.js";

/**
 * Add item to cart
 * Extracts userId from JWT (req.user.id) - NOT from request body
 */
const addToCart = async (req, res) => {
  try {
    // Extract userId from JWT token (set by authUser middleware)
    const userId = req.user.id;
    const { itemId, size } = req.body;

    // Validate required fields
    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "itemId and size are required"
      });
    }

    // Validate size format (e.g., S, M, L, XL, or numeric sizes)
    if (typeof size !== 'string' || size.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Invalid size format"
      });
    }

    const { data, error } = addToCartService(userId, itemId, size.trim());

    if (error) {
      console.error("Add to cart error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to add item to cart"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart: data
    });
  } catch (error) {
    console.error("Add to cart controller error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/**
 * Update cart
 * Extracts userId from JWT (req.user.id) - NOT from request body
 */
const updateCart = async (req, res) => {
  try {
    // Extract userId from JWT token (set by authUser middleware)
    const userId = req.user.id;
    const { cartData } = req.body;

    // Validate cartData
    if (!cartData || typeof cartData !== 'object') {
      return res.status(400).json({
        success: false,
        message: "Invalid cart data format"
      });
    }

    const { data, error } = await updateCartService(userId, cartData);

    if (error) {
      console.error("Update cart error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update cart"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: data
    });
  } catch (error) {
    console.error("Update cart controller error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/**
 * Get user cart
 * Extracts userId from JWT (req.user.id) - NOT from request body
 */
const getUserCart = async (req, res) => {
  try {
    // Extract userId from JWT token (set by authUser middleware)
    const userId = req.user.id;

    const { data, error } = await getUserCartService(userId);

    if (error) {
      console.error("Get cart error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve cart"
      });
    }

    // Return empty cart if user has no cart yet
    res.status(200).json({
      success: true,
      cart: data?.cart_data || {}
    });
  } catch (error) {
    console.error("Get cart controller error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export { addToCart, updateCart, getUserCart };