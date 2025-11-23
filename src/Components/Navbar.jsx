import { FiSearch, FiShoppingBag } from "react-icons/fi";

const Navbar = ({ totalItems }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row - Logo and Icons */}
        <div className="flex items-center justify-between">
          {/* Left - search icon */}
          <div className="flex items-center">
            
          </div>
          
          {/* Center - Logo */}
          <div className="text-center">
            <h1 className="text-2xl font-serif font-medium text-gray-900">She and Jae</h1>
          </div>
          
          {/* Right - Cart Icon */}
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-700 hover:text-gray-900 relative">
              <FiShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
        
        {/* Bottom Row - Navigation Links */}
        <div className="mt-4 pt-2">
          <div className="flex justify-center space-x-6">
            {/* Active item (Home) */}
            <a href="#" className="relative group text-base font-serif text-gray-900">
              Home
              <span className="absolute left-0 bottom-0 h-0.5 bg-gray-900 w-full"></span>
            </a>
            
            {/* Other items */}
            <a href="#" className="relative group text-base font-serif text-gray-700 hover:text-gray-900">
              Earrings
              <span className="absolute left-0 bottom-0 h-0.5 bg-gray-900 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
            </a>
            
            <a href="#" className="relative group text-base font-serif text-gray-700 hover:text-gray-900">
              Necklaces
              <span className="absolute left-0 bottom-0 h-0.5 bg-gray-900 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
            </a>
            
            <a href="#" className="relative group text-base font-serif text-gray-700 hover:text-gray-900">
              Bracelets
              <span className="absolute left-0 bottom-0 h-0.5 bg-gray-900 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
            </a>
            
            <a href="#" className="relative group text-base font-serif text-gray-700 hover:text-gray-900">
              Rings
              <span className="absolute left-0 bottom-0 h-0.5 bg-gray-900 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
