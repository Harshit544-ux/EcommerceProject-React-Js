import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';

const CartTotal = ({ checkoutLink = "/placeorder", buttonText = "Proceed to Checkout" }) => {
  const { getCartCount, getCartAmount, currency, delivery_fee } = useContext(ShopContext);

  const totalItems = getCartCount();
  const subtotal = getCartAmount();
  const shipping = delivery_fee || 0;
  const totalAmount = subtotal + shipping;

  return (
    <>
      <div className='text-base sm:text-2xl mt-10 ml-96 pl-96 mr-52'>
        <Title text1={"Cart"} text2={'Total'} />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 my-10">
        <div className="mt-6 px-6 py-8 bg-gray-50 rounded-b-lg shadow max-w-md ml-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal ({totalItems} items)</p>
                <p className="font-medium">{currency}{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium">{currency}{shipping.toFixed(2)}</p>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-semibold">{currency}{totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link to={checkoutLink}>
                <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium">
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
