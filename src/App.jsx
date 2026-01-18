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
    <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<div className="md:pt-28"><Home /></div>} />
          <Route path="/listing/:category" element={<div className="pt-20 md:pt-28 bg-stone-50"><ListingFetch /></div>} />
          <Route path="/product/:id" element={<div className="pt-20 md:pt-28 bg-stone-50"><Product /></div>} />
          <Route path="/cart" element={<div className="pt-20 md:pt-28"><CartCheckout /></div>} />
          <Route path="/listing/:category/:id" element={<div className="pt-20 md:pt-28 bg-stone-50"><ProductDetail /></div>} />
          <Route path='/about' element={<div className="pt-20 md:pt-28"><About /></div>} />
          <Route path='/thankyou' element={<div className="pt-20 md:pt-28"><ThankYou /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
