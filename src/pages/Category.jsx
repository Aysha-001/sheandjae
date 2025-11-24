import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronDown, FiX } from "react-icons/fi";


const FILTER_OPTIONS = {
  Material: ["Gold", "Silver", "Pearl", "Rose Gold"],
  Color: ["White", "Black", "Pink", "Green"],
  Occasion: ["Daily Wear", "Wedding", "Party", "Festive"],
  Price: ["Under 999", "1000-1999", "2000-2999", "3000+"],
};

const Category = () => {
  const { category } = useParams();

  const [activeFilters, setActiveFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [sortValue, setSortValue] = useState("");

  // ------------ HANDLE FILTER SELECTION ------------
  const toggleFilterValue = (filterType, value) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterType] || [];

      // If already selected → remove it
      if (currentValues.includes(value)) {
        const updated = currentValues.filter((v) => v !== value);
        if (updated.length === 0) {
          const newFilters = { ...prev };
          delete newFilters[filterType];
          return newFilters;
        }
        return { ...prev, [filterType]: updated };
      }

      // Add value
      return { ...prev, [filterType]: [...currentValues, value] };
    });
  };

  // ------------ REMOVE A TAG ------------
  const removeTag = (filterType, value) => {
    toggleFilterValue(filterType, value);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 pt-6 pb-16 font-serif">

      {/* --------------------- Breadcrumb --------------------- */}
      <div className="text-sm text-gray-500 mb-3">
        <ol className="flex items-center space-x-1">
        
        <li>
          <Link 
            to="/" 
            className="hover:text-gray-900 transition"
          >
            Home
          </Link>
        </li>

        <span>›</span>

        <li>
          <Link 
            to={`/listing/${category}`} 
            className="hover:text-gray-900 transition capitalize"
          >
            {category}
          </Link>
        </li>
      </ol>
      </div>

      {/* --------------------- Title --------------------- */}
      <h1 className="text-3xl font-light tracking-wide capitalize text-gray-900 mb-8">
        {category}
      </h1>

     {/* DESKTOP FILTER + SORT */}
<div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6">
  {/* LEFT — FILTER BUTTONS & SORT BUTTON (Grouped together) */}
  <div className="flex flex-wrap gap-4 w-full sm:w-auto">
    {/* FILTER BUTTONS */}
    {Object.keys(FILTER_OPTIONS).map((filterType) => (
      <div key={filterType} className="relative">
        <button
          onClick={() =>
            setOpenFilter(openFilter === filterType ? null : filterType)
          }
          className="px-4 py-2 border rounded-full text-sm text-gray-700 flex items-center gap-1"
        >
          {filterType} <FiChevronDown />
        </button>

        {/* DROPDOWN */}
        {openFilter === filterType && (
          <div className="absolute w-40 bg-white shadow-md rounded-xl mt-2 p-3 z-30">
            {FILTER_OPTIONS[filterType].map((value) => {
              const isActive = activeFilters[filterType]?.includes(value);

              return (
                <div
                  key={value}
                  className={`px-2 py-1 rounded cursor-pointer text-sm mb-1
                    ${
                      isActive
                        ? "bg-[#C8B7A6] text-gray-900" // <-- FIX: Using arbitrary value for Gold background. Changed text to dark gray for contrast.
                        : "hover:bg-gray-100"
                    }
                  `}
                  // FIX 3: Close the filter dropdown after an option is selected
                  onClick={() => {
                    toggleFilterValue(filterType, value);
                    // Close the dropdown after selection
                    if (filterType !== 'priceRange') { // Optional: Keep range filters open, close others
                         setOpenFilter(null);
                    }
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        )}
      </div>
    ))}
    
    {/* SORT DROPDOWN (Moved closer to filters for better grouping) */}
    <select
      className="border rounded-full px-4 py-2 text-sm text-gray-700 bg-white"
      value={sortValue}
      onChange={(e) => setSortValue(e.target.value)}
    >
      <option value="">Sort</option>
      <option value="priceLow">Price: Low → High</option>
      <option value="priceHigh">Price: High → Low</option>
      <option value="popular">Popularity</option>
      <option value="new">New Arrivals</option>
    </select>
  </div>
</div>

      {/* --------------------- Filter Tags --------------------- */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(activeFilters).map(([filterType, values]) =>
            values.map((value) => (
              <span
                key={value}
                className="px-4 py-1 text-sm bg-gray-200 rounded-full flex items-center gap-2"
              >
                {filterType}: {value}
                <FiX
                  className="cursor-pointer"
                  onClick={() => removeTag(filterType, value)}
                />
              </span>
            ))
          )}
        </div>
      )}

      {/* --------------------- Product Grid --------------------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Replace this with Firestore data */}
        {[1, 2, 3, 4, 5, 6].map((p) => (
          <div
            key={p}
            className="
              bg-white 
              rounded-2xl 
              shadow-sm 
              hover:shadow-md 
              transition 
              duration-300 
              hover:scale-[1.02] 
              cursor-pointer
            "
          >
            <div className="w-full h-56 bg-gray-200 rounded-t-2xl" />
            <div className="p-4">
              <h3 className="text-base text-gray-900">Product Name</h3>
              <p className="text-sm text-gray-500 mt-1">₹1999</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
