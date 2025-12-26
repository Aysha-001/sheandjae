import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
//import Listing from './pages/Listing';
import Product from './pages/Product';
import CartCheckout from './pages/CartCheckout';
import Navbar from './Components/Navbar';
import Category from './pages/Category';
import Item from './pages/Item';
import ListingFetch from './pages/ListingFetch';
import ItemFetch from './pages/ItemFecth';
import ProductDetail from './pages/ProductDetail';
import ListingUpdated from './pages/ListingUpdated';
import About from './pages/About';
import ThankYou from './pages/Thankyou';


//import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />

      {/* Push content below navbar height */}
     <div className="min-h-screen bg-stone-50 pt-20 md:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:category" element={<ListingFetch />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartCheckout />} />
        
          <Route path="/listing/:category/:id" element={<ProductDetail/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/thankyou' element={<ThankYou/>} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
