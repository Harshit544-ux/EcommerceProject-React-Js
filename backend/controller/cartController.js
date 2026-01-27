import { addToCartService ,updateCartService,getUserCartService} from "../services/cartService.js";

// add the cart
 const addToCart = async (req, res) => {
  const { userId, itemId, size } = req.body;
  const { data, error } = await addToCartService(userId, itemId, size);
  if (error) return res.status(500).json({ success: false, message: error.message });
  res.json({ success: true, cart: data });
};


// update the cart
const updateCart=async(req,res)=>{
  const { userId, cartData } = req.body;
  const { data, error } = await updateCartService(userId, cartData);
  if (error) return res.status(500).json({ success: false, message: error.message });
  res.json({ success: true, cart: data });

}

//get user from cart
const getUserCart = async (req, res) => {
  const { userId } = req.body;
  const { data, error } = await getUserCartService(userId);
  if (error) return res.status(500).json({ success: false, message: error.message });
  res.json({ success: true, cart: data });
};


export {addToCart,updateCart,getUserCart}