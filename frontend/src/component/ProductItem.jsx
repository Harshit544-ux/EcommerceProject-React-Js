import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

function ProductItem({ id, name, price, image }) {
  const { currency } = useContext(ShopContext)

  const displayImage = Array.isArray(image) ? image[0] : image || '/fallback.jpg';

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='w-full aspect-square overflow-hidden flex justify-center items-center'>
        <img
          className='w-full h-full object-cover hover:scale-110 transition duration-300 ease-in-out'
          src={displayImage}
          alt={name}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
