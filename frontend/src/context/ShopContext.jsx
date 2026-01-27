import { createContext, useEffect, useState } from "react";
import { products as mockdata} from "../assets/assets";

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "$";
  const delivery_fee = 20;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState(mockdata);

  // const addToCart = async (itemId, size) => {
  //     setCartItems(prev => {
  //         const newCart = { ...prev };
  //         if (!newCart[itemId]) {
  //             newCart[itemId] = {};
  //         }
  //         if (!newCart[itemId][size]) {
  //             newCart[itemId][size] = 0;
  //         }
  //         newCart[itemId][size] += 1;
  //         return newCart;
  //     });
  // }

  const addToCart = async (itemId, size) => {
    console.log(" addToCart function called with:", { itemId, size });

    // Update local state first
    setCartItems(prev => {
      const newCart = { ...prev };
      if (!newCart[itemId]) newCart[itemId] = {};
      if (!newCart[itemId][size]) newCart[itemId][size] = 0;
      newCart[itemId][size] += 1;
      return newCart;
    });

    try {
      console.log(" Getting token from localStorage...");
      const token = localStorage.getItem('token');

      console.log("🎫 Token found:", token ? "Yes" : "No");

      if (!token) {
        console.error("❌ No authentication token found");
        return;
      }

      console.log(" Making API call to cart/add...");

      const response = await fetch("http://localhost:4000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: itemId,
          size,
          quantity: 1
        })
      });

      console.log("📥 Response received:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Successfully added to cart:", result);

    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        totalCount += cartItems[item][size];
      }
    }
    return totalCount;
  }

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  }

  const removeFromCart = (itemId, size) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] && newCart[itemId][size]) {
        delete newCart[itemId][size];
        // Remove the item entirely if no sizes left
        if (Object.keys(newCart[itemId]).length === 0) {
          delete newCart[itemId];
        }
      }
      return newCart;
    });
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        total += product.price * quantity;
      }
    }

    return total;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/products");
        console.log("Fetch products response:", response);
        console.log(response)
        const data = await response.json();
        console.log("Fetched products data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const contextValue = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    removeFromCart,
    getCartAmount
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
