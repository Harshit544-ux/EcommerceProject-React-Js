import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './component/Navbar'
import Collection from './pages/Collection'
import Footer from './component/Footer'
import SearchBar from './component/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Order from './pages/Order'
import ProtectedRoute from './component/Auth/ProtectedRoute'

// set up the routes for the application
function App() {
  return (
    <>
      <div>  
        <ToastContainer />
        {/* Navbar */}
        <Navbar />
        <SearchBar />

        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collection" element={<ProtectedRoute><Collection /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/placeorder' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          <Route path='/orders' element={<ProtectedRoute><Order /></ProtectedRoute>} />
        </Routes>
       
      </div>
      <Footer />
    </>
  )
}

export default App
