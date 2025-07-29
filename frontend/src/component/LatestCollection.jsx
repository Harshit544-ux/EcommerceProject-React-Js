import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

function LatestCollection() {
    const { products } = useContext(ShopContext)
    const [latestProducts,setLatestProducts]=useState([]);


    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[])

  return (  
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600'>Unlock the latest collections, featuring the best products to enhance your everyday experience.</p>
        </div>
    </div>
  )
}

export default LatestCollection