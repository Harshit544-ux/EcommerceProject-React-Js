import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../component/RelatedProduct';
import { toast } from 'react-toastify';

function Product() {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(''); // Changed from sizes to selectedSize

  useEffect(() => {
    const product = products.find(item => item.id == id); // Use == to handle both string and number
    if (product) {
      setProductData(product);
      setImage(product.images[0]);
      setSelectedSize(''); // Reset size when product changes
    }
  }, [id, products]);

  // Add size to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(id, selectedSize);
  };

  if (!productData) {
    return <div className='opacity-0'>Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 '>
      {/* Product Container */}
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Image Gallery */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          {/* Thumbnail Images */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productData.name}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border'
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          {/* Main Image Display */}
          <div className='flex-1 flex justify-center items-center'>
            {image && (
              <img
                src={image}
                alt={productData.name}
                className='w-full max-w-[400px] h-auto object-contain'
              />
            )}
          </div>
        </div>

        {/* Product Info (Optional: add title, price, etc.) */}
        <div className='flex-1'>
          <h2 className='text-2xl font-medium mt-2'>{productData.name}</h2>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className='w-3' />
            <img src={assets.star_icon} className='w-3' />
            <img src={assets.star_icon} className='w-3' />
            <img src={assets.star_icon} className='w-3' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5  text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5  text-gray-500 md:w-4/5 '>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((size, index) => (
                <button
                  onClick={() => setSelectedSize(size)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${selectedSize === size ? 'border-black' : ''
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

          </div>
          <button
            onClick={handleAddToCart}
            className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700 cursor-pointer w-fit rounded'
          >
            ADD TO CART
          </button>
          <hr className='mt-8  sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy returns within 30 days</p>
          </div>

        </div>

      </div>

      {/* --------Description & Review Section----------- */}
      <div className='mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 mt-5 border px-6 py-3 text-sm text-gray-600'>
          <p>An ecommerce product page typically includes a description, images, pricing, and reviews.Clear product titles, high-quality images, and concise bullet points help shoppers quickly understand the product's features and benefits</p>
          <p>Ecommerce product pages are designed to provide customers with all the information they need to make a purchase decision.

            Many modern ecommerce pages also include related products, promotional offers, and a streamlined "Add to Cart" experience for seamless navigation.</p>

        </div>
      </div>

      {/* ----------Display Related Products------------- */}
      <RelatedProduct category={productData.category} subCategory={productData.subcategory} />

    </div>
  );
}

export default Product;
