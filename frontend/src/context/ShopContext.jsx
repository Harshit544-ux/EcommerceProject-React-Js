import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "$";
  const delivery_fee = 20;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  /* ================= ADD TO CART ================= */
  const addToCart = async (itemId, size) => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      alert("Please login first");
      return;
    }

    // ✅ Optimistic UI update
    setCartItems(prev => {
      const cart = { ...prev };
      if (!cart[itemId]) cart[itemId] = {};
      cart[itemId][size] = (cart[itemId][size] || 0) + 1;
      return cart;
    });

    try {
      const res = await fetch("http://localhost:4000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, size }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      const data = await res.json();
      console.log("Cart synced:", data);

    } catch (err) {
      console.error(err);

      // ❌ rollback if API fails
      setCartItems(prev => {
        const cart = structuredClone(prev);
        cart[itemId][size] -= 1;
        if (cart[itemId][size] === 0) delete cart[itemId][size];
        if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];
        return cart;
      });
    }
  };

  /* ================= LOAD USER CART ================= */
  const loadUserCart = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/cart/get", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success && data.cart?.cart_data) {
        setCartItems(data.cart.cart_data);
      }
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  /* ================= CART HELPERS ================= */
  const getCartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        total += cartItems[item][size];
      }
    }
    return total;
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems(prev => {
      const cart = structuredClone(prev);
      if (quantity <= 0) {
        delete cart[itemId][size];
        if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];
      } else {
        cart[itemId][size] = quantity;
      }
      return cart;
    });
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(prev => {
      const cart = { ...prev };
      delete cart[itemId][size];
      if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];
      return cart;
    });
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p.id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  /* ================= PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/products", {
        cache: "no-store",
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    loadUserCart(); // ✅ page refresh par cart restore
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
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
