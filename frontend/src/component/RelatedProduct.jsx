import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

function RelatedProduct({ category, subCategory }) {
    const { products } = useContext(ShopContext)
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter((product) => 
                product.category === category && product.subCategory === subCategory
            )
            setRelatedProducts(filteredProducts.slice(0, 5)) // Limit to 8 related products
        }
    }, [products, category, subCategory]) // Add dependency array

    return (
        <div className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className='text-center text-3xl py-2'>
                   <Title text1={'Related'} text2={'Products'}/>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {relatedProducts.map((item) => (
                    <ProductItem 
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default RelatedProduct