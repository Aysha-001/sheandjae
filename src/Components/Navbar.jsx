import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {

  const location = useLocation();

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
          <div className="flex items-center">
            
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
        <div className="mt-4 pt-2">
          <div className="flex justify-center space-x-6">
            {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`relative text-base font-serif ${
            isActive(link.path)
              ? "text-gray-900"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          {link.label}

          {/* Underline */}
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-gray-900 w-full transition-all duration-300 origin-left ${
              isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></span>
        </Link>
      ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
