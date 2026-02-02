import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import { assets } from '../assets/assets';
import CartTotal from './CartTotal';

function Cart() {
  const { products, cartItems, currency, updateQuantity, removeFromCart, getCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tempData = [];

    if (!products || !cartItems) {
      setIsLoading(false);
      return;
    }

    // Loop through cart items
    for (const itemId in cartItems) {
      // Find product details from products array
      const product = products.find(p => p.id === itemId);
      if (product) {
        // Loop through sizes for this item
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            tempData.push({
              id: itemId,
              name: product.name,
              price: product.price,
              image: Array.isArray(product.images) ? product.images[0] : product.image,
              size: size,
              quantity: quantity,
            });
          }
        }
      }
    }

    setCartData(tempData);
    setIsLoading(false);
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, size, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity < 1) return;

    if (updateQuantity) {
      updateQuantity(itemId, size, quantity);
    }
  };

  const handleRemoveItem = (itemId, size) => {
    if (removeFromCart) {
      removeFromCart(itemId, size);
    }
  };


  const totalAmount = getCartAmount();
  const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-base sm:text-2xl mb-6">
          <Title text1={'YOUR'} text2={'CART'} />
          <p className="text-gray-500 mt-1 text-sm ml-2">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartData.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some products to get started</p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            {/* Cart Header - Desktop Only */}
            <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-6 py-4 bg-gray-50 rounded-t-lg">
              <p className="text-gray-600 font-medium">Product</p>
              <p className="text-gray-600 font-medium text-center">Size</p>
              <p className="text-gray-600 font-medium text-center">Quantity</p>
              <p className="text-gray-600 font-medium text-end">Remove</p>
            </div>

            {/* Cart Items */}
            {cartData.map((item, index) => (
              <div
                key={`${item.id}-${item.size}`}
                className={`grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-6 py-6 ${index < cartData.length - 1 ? 'border-b' : ''
                  }`}
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg'; // Fallback image
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{currency}{item.price.toFixed(2)}</p>
                    {/* Mobile size display */}
                    <div className="sm:hidden mt-2">
                      <span className="text-sm text-gray-600">Size: </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Size - Desktop Only */}
                <div className="hidden sm:flex items-center justify-center">
                  <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                    {item.size}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-center sm:justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total and Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="sm:hidden">
                    <span className="text-sm text-gray-600">Total: </span>
                  </div>
                  <div className="flex items-center gap-4">

                    <button
                      onClick={() => handleRemoveItem(item.id, item.size)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition group"
                      title="Remove item"
                    >
                      {assets.bin_icon ? (
                        <img src={assets.bin_icon} alt="Remove" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Cart Summary */}
            <CartTotal checkoutLink='/placeorder' buttonText='Proceed to checkout' />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;