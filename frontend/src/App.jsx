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

// set up the routes for the application
function App() {
  return (
    <>
      <div>                 
        {/* Navbar */}
        <Navbar />
        <SearchBar />

        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Routes>
       
      </div>
      <Footer />
    </>
  )
}

export default App
