import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
     <div className="mt-4 pt-2">
      <div className="flex justify-center space-x-6">
        {/* Active item (Home) - permanent underline */}
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
  );
};

export default BottomNav;
