import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronDown, FiX } from "react-icons/fi";

import { useQuery } from "@tanstack/react-query";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; // adjust path if needed



const FILTER_OPTIONS = {
  Material: ["Gold", "Silver", "Pearl", "Rose Gold"],
  Color: ["White", "Black", "Pink", "Green"],
  Occasion: ["Daily Wear", "Wedding", "Party", "Festive"],
  Price: ["Under 999", "1000-1999", "2000-2999", "3000+"],
};
//------------------------------------------
const fetchCategoryProducts = async (category) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  console.log(snapshot)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
//------------------------------------------------


const ListingFetch = () => {
  const { category } = useParams();

  //---------------------

  const {
  data: products = [],
  isLoading,
  isError,
  error
} = useQuery({
  queryKey: ["products", category],
  queryFn: () => fetchCategoryProducts(category),
  enabled: !!category, // prevents running before param exists
});

//-------------------------------

  const [activeFilters, setActiveFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [sortValue, setSortValue] = useState("");
  // NEW STATE for Mobile Modal
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); 

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
            className="text-gray-900 capitalize"
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

      {/* DESKTOP FILTER + SORT (Now includes Mobile Toggle) */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6">
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          
          {/* MOBILE: Single Filter/Sort Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="sm:hidden w-full px-4 py-2 border rounded-full text-sm text-gray-700 flex items-center justify-center gap-2 bg-white shadow-sm"
          >
            Filter & Sort
            <FiChevronDown className="w-4 h-4" />
          </button>
          
          {/* DESKTOP: Filter Dropdown Buttons (Original Logic - hidden on mobile) */}
          <div className="hidden sm:flex flex-wrap gap-4 w-full sm:w-auto">
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
                  <div className="absolute w-40 bg-white shadow-md rounded-xl mt-2 p-3 z-30 right-0 sm:left-0">
                    {FILTER_OPTIONS[filterType].map((value) => {
                      const isActive = activeFilters[filterType]?.includes(value);

                      return (
                        <div
                          key={value}
                          className={`px-2 py-1 rounded cursor-pointer text-sm mb-1
                            ${
                              isActive
                                ? "bg-[#C8B7A6] text-gray-900"
                                : "hover:bg-gray-100"
                            }
                          `}
                          onClick={() => {
                            toggleFilterValue(filterType, value);
                            setOpenFilter(null); // Close filter dropdown on selection
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
            
            {/* SORT DROPDOWN (Desktop) */}
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
    
{isLoading && (
  <p className="text-center text-gray-500">Loading products...</p>
)}

{isError && (
  <p className="text-center text-red-500">
    Error: {error.message}
  </p>
)}

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {/* Replace this with Firestore data */}
  {products.map((product) => {
    // Assuming 'p' acts as the unique product ID here for demonstration
   

    return (
            <Link
        key={product.id}
        to={`/product/${product.id}`}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition transform duration-300 hover:scale-[1.02] block"
        >
        <div className="relative w-full h-40 sm:h-52 bg-gray-100 rounded-t-xl overflow-hidden">
            <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            />
        </div>

        <div className="p-3 sm:p-4">
            <h3 className="text-sm text-gray-900 truncate">
            {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
            ₹{product.price}
            </p>
        </div>
        </Link>

        );
    })}
    </div>
      
      {/* --------------------- Mobile Filter Modal --------------------- */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-light text-gray-900">Filter & Sort</h2>
            <button onClick={() => setIsMobileFilterOpen(false)}>
              <FiX className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="p-4">
            {Object.keys(FILTER_OPTIONS).map((filterType) => (
              <div key={filterType} className="mb-6 border-b pb-4">
                <h3 className="text-lg font-medium mb-3">{filterType}</h3>
                <div className="flex flex-wrap gap-2">
                  {FILTER_OPTIONS[filterType].map((value) => {
                    const isActive = activeFilters[filterType]?.includes(value);
                    return (
                      <span
                        key={value}
                        onClick={() => toggleFilterValue(filterType, value)}
                        className={`px-3 py-1 text-sm rounded-full cursor-pointer transition
                          ${
                            isActive
                              ? "bg-[#C8B7A6] text-gray-900 border border-[#C8B7A6]"
                              : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                          }`}
                      >
                        {value}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* Sort Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Sort By</h3>
              <select
                className="border rounded-lg px-4 py-2 text-base text-gray-700 bg-white w-full"
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
              >
                <option value="">Default</option>
                <option value="priceLow">Price: Low → High</option>
                <option value="priceHigh">Price: High → Low</option>
                <option value="popular">Popularity</option>
                <option value="new">New Arrivals</option>
              </select>
            </div>
          </div>
          
          {/* Sticky Footer Button to Close */}
          <div className="sticky bottom-0 bg-white p-4 border-t shadow-lg">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-gray-900 text-white py-3 rounded-lg text-lg font-semibold"
            >
              Show Results
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ListingFetch;