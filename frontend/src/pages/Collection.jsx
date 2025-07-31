import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../component/Title';
import ProductItem from '../component/ProductItem';

function Collection() {
  const { products ,search} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);
  const [sortType, setSortType] = useState('relevant');

  // Handle category checkbox change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(prev =>
      e.target.checked
        ? [...prev, value]
        : prev.filter(cat => cat !== value)
    );
  };

  // Handle subcategory checkbox change
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategories(prev =>
      e.target.checked
        ? [...prev, value]
        : prev.filter(sub => sub !== value)
    );
  };

  // Filter products whenever selection or search changes
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category and subcategory filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => selectedCategories.includes(item.category));
    }
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter(item => selectedSubCategories.includes(item.subCategory));
    }

    // Apply sorting
    if (sortType === 'low-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [products, selectedCategories, selectedSubCategories, sortType, search]); // Added search to dependencies

  return (
    <div className='flex flex-col sm:flex-row gap-1  sm:gap-10 pt-10 border-t mx-6 sm:mx-10 lg:mx-12'>
      
      {/* Filter Section */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="dropdown icon" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        {/* {Category filter} */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : ' hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                className='w-3'
                value="Men"
                checked={selectedCategories.includes("Men")}
                onChange={handleCategoryChange}
              />Men
            </label>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                className='w-3'
                value="Women"
                checked={selectedCategories.includes("Women")}
                onChange={handleCategoryChange}
              />Women
            </label>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                className='w-3'
                value="Kids"
                checked={selectedCategories.includes("Kids")}
                onChange={handleCategoryChange}
              />Kids
            </label>
          </div>
        </div>


        {/* {Subcategory filter} */}
        <div className={`border border-gray-300 my-5 pl-5 py-3 mt-6 ${showFilter ? '' : ' hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUBCATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                className='w-3'
                value="Topwear"
                checked={selectedSubCategories.includes("Topwear")}
                onChange={handleSubCategoryChange}
              />Topwear
            </label>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                className='w-3'
                value="Bottomwear"
                checked={selectedSubCategories.includes("Bottomwear")}
                onChange={handleSubCategoryChange}
              />Bottomwear
            </label>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                className='w-3'
                value="Winterwear"  
                checked={selectedSubCategories.includes("Winterwear")}
                onChange={handleSubCategoryChange}
              />Winter Wear
            </label>
          </div>
        </div>

  
        </div>
            {/* {Right side} */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            {/* {Product Sort} */}
            <select 
              className='border-2 border-gray-300 text-sm px-2'
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>

          </div>


        {/* Map Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default Collection