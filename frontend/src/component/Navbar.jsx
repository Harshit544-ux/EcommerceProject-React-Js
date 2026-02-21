import { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets.js'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';


function Navbar() {
    const navigate=useNavigate();
    const {setShowSearch,getCartCount} = useContext(ShopContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("auth-token"));

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem("auth-token"));
        };
        window.addEventListener('storage', handleAuthChange);
        window.addEventListener('authChange', handleAuthChange);
        return () => {
            window.removeEventListener('storage', handleAuthChange);
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
        toast.success("Logged out successfully!", {
            position: "bottom-right"
        });
    };

    return (
        <div className='flex justify-between items-center py-4 font-medium px-6 '>
           <Link to='/'><img src={assets.logo} alt="logo" className='w-36' /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
               <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />

                <div className="relative group">
                    {isLoggedIn ? (
                        <>
                            <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
                            <div className="absolute right-0 pt-4 bg-slate-100 rounded-md shadow-lg z-10 hidden group-hover:block">
                                <div className="flex flex-col gap-2 px-4 py-2 w-36 text-gray-500 rounded">
                                    <p className="hover:text-black cursor-pointer">My Profile</p>
                                    <p className="hover:text-black cursor-pointer">Orders</p>
                                    <p className="hover:text-black cursor-pointer" onClick={handleLogout}>Logout</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Link to={'/login'}><img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" /></Link>
                    )}
                </div>
                <div className="relative">
                    <Link to="/cart">
                        <img src={assets.cart_icon} alt="cart" className="w-5 cursor-pointer" />
                        <span className="absolute -right-1 -bottom-1 text-[10px] text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                            {getCartCount()}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar