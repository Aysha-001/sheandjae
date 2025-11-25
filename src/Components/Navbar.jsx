import { useState } from "react";
import { FiSearch, FiShoppingBag, FiMenu, FiX} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";


const Navbar = ({ totalItems }) => {

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

   const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "Earrings", path: "/listing/earrings" },
    { label: "Necklaces", path: "/listing/necklaces" },
    { label: "Bracelets", path: "/listing/bracelets" },
    { label: "Rings", path: "/listing/rings" },
  ];


  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F8F4EC]/80 backdrop-blur-sm border-b border-gray-200/40 py-5 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row - Logo and Icons */}
        <div className="flex items-center justify-between">
          {/* Left - search icon */}
          {/* Left - search icon/menu toggle */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)} // <-- Toggle the state
              className="p-1 text-gray-700 hover:text-gray-900 md:hidden mr-4" // <-- Show only on small screens
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" /> // <-- Show 'X' when open
              ) : (
                <FiMenu className="h-6 w-6" /> // <-- Show 'Menu' when closed
              )}
            </button>
            {/* Original Search Icon (optional, if you want a dedicated one) */}
            <FiSearch className="h-5 w-5 hidden md:block text-gray-700" /> {/* Example: Hide on mobile */}
          </div>
          
          {/* Center - Logo */}
          <div className="text-center">
            <h1 className="text-2xl font-serif font-medium text-gray-900 italic">She and Jae</h1>
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
        {/* Bottom Row - Navigation Links (Desktop) */}
        <div className="hidden md:block mt-4 pt-2"> {/* <-- Hidden on mobile */}
          <div className="flex justify-center space-x-6">
            {links.map((link) => (
              // ... your existing Link component structure ...
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-serif group ${ // Added group for hover effect
                  isActive(link.path)
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {link.label}

                {/* Underline */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-gray-900 w-full transition-all duration-300 origin-left ${
                    isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100" // Use group-hover
                  }`}
                ></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`absolute top-full left-0 w-full bg-[#F8F4EC] shadow-lg transition-all duration-300 overflow-hidden md:hidden ${ // <-- Shown only on mobile
            isMenuOpen ? "max-h-screen border-t border-gray-200" : "max-h-0" // <-- Height transition
          }`}
        >
          <div className="flex flex-col py-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                // *IMPORTANT*: Close the menu when a link is clicked
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 text-lg font-serif transition-colors ${
                  isActive(link.path)
                    ? "text-gray-900 bg-gray-100 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
