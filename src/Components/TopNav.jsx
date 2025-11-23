import { FiSearch, FiShoppingBag } from "react-icons/fi";

const TopNav = ({ totalItems }) => {
  return (
     <div className="flex items-center justify-between">
      {/* Left - Search Icon */}
      <div className="flex items-center">
        <button className="p-1 text-gray-700 hover:text-gray-900">
          <FiSearch className="h-5 w-5" />
        </button>
      </div>

      {/* Center - Logo */}
      <div className="text-center">
        <h1 className="text-2xl font-serif font-medium text-gray-900">She and Jae</h1>
      </div>

      {/* Right - Cart Icon */}
      <div className="flex items-center space-x-4">
        <button className="p-1 text-gray-700 hover:text-gray-900 relative">
          <FiShoppingBag className="h-5 w-5" />
          {/* Optional cart count badge */}
          <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopNav;
