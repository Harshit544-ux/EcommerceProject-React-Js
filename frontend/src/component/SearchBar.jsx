import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  // Close search bar on route change
  useEffect(() => {
    setShowSearch(false);
    setSearch('');
  }, [location.pathname]);

  const handleClear = () => {
    setSearch('');
  };

  return showSearch ? (
    <div className="border-t border-b bg-gray-100 py-4 px-4 sm:px-8 flex bg-black items-center">
      <div className="flex flex-1 max-w-3xl mx-auto items-center border border-gray-300 bg-white px-4 py-2 rounded-full shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 text-sm text-gray-700 bg-transparent outline-none"
        />
        {search && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-gray-100 rounded-full transition mr-2"
          >
            <img src={assets.cross_icon} alt="Clear" className="w-3 h-3" />
          </button>
        )}
        <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
        
      </div>
     <div>
            <button
        onClick={() => setShowSearch(false)}
        className="ml-4 p-2 hover:bg-gray-200 rounded-full transition"
      >
        <img src={assets.cross_icon} alt="Close" className="w-3 h-3" />
      </button>
     </div>
    </div>
  ) : null;
}

export default SearchBar;
