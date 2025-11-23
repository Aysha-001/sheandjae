import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Listing from './pages/Listing';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Navbar from './Components/Navbar';

//import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar totalItems={0} />

      {/* Push content below navbar height */}
     <div className="min-h-screen bg-stone-50 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:category" element={<Listing />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
