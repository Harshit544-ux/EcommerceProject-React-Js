import { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {

  const { products } = useContext(ShopContext)
  console.log(products);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter(product => product.bestseller);
    setBestSellers(bestProducts.slice(0, 10));
  }, [products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600'>Discover our best-selling products that customers love.</p>
      </div>
      {/* {Rendering product} */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-4 px-10 py-6'>
        {bestSellers.map((item, index) => (
          <ProductItem key={index} id={item.id} name={item.name} price={item.price} image={item.images} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller