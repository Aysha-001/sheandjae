import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronDown, FiX } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { filterAndSortProducts } from "../utils/filterAndSortProducts";

/* ---------------- FILTER OPTIONS ---------------- */
const FILTER_OPTIONS = {
  color: ["white", "black", "pink", "green"],
  material: ["gold", "silver", "pearl", "rose gold"],
};

/* ---------------- FETCH ---------------- */
const fetchCategoryProducts = async (category) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ---------------- COMPONENT ---------------- */
const ListingUpdated = () => {
  const { category } = useParams();

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchCategoryProducts(category),
    enabled: !!category,
  });

  const [activeFilters, setActiveFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [sortValue, setSortValue] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  /* ---------------- FILTER LOGIC ---------------- */
  const toggleFilterValue = (type, value) => {
    setActiveFilters((prev) => {
      const values = prev[type] || [];
      if (values.includes(value)) {
        const updated = values.filter((v) => v !== value);
        if (!updated.length) {
          const copy = { ...prev };
          delete copy[type];
          return copy;
        }
        return { ...prev, [type]: updated };
      }
      return { ...prev, [type]: [...values, value] };
    });
  };

  const filteredProducts = filterAndSortProducts(
    products,
    activeFilters,
    sortValue
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="px-4 md:px-8 lg:px-16 pt-6 pb-16 font-serif">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        <Link to="/" className="hover:text-gray-900">Home</Link> ›
        <span className="capitalize text-gray-900 ml-1">{category}</span>
      </div>

      <h1 className="text-3xl font-light capitalize mb-8">{category}</h1>

      {/* FILTER + SORT */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="sm:hidden w-full px-4 py-2 border rounded-full text-sm flex justify-center gap-2"
        >
          Filter & Sort <FiChevronDown />
        </button>

        {/* DESKTOP FILTERS */}
        <div className="hidden sm:flex gap-4">

          {/* COLOR */}
          <div className="relative">
            <button
              onClick={() => setOpenFilter(openFilter === "color" ? null : "color")}
              className="px-4 py-2 border rounded-full flex gap-1"
            >
              Color <FiChevronDown />
            </button>

            {openFilter === "color" && (
              <div className="absolute bg-white shadow rounded-xl mt-2 p-3 z-30">
                {FILTER_OPTIONS.color.map((c) => (
                  <div
                    key={c}
                    onClick={() => {
                      toggleFilterValue("color", c);
                      setOpenFilter(null);
                    }}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MATERIAL */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenFilter(openFilter === "material" ? null : "material")
              }
              className="px-4 py-2 border rounded-full flex gap-1"
            >
              Material <FiChevronDown />
            </button>

            {openFilter === "material" && (
              <div className="absolute bg-white shadow rounded-xl mt-2 p-3 z-30">
                {FILTER_OPTIONS.material.map((m) => (
                  <div
                    key={m}
                    onClick={() => {
                      toggleFilterValue("material", m);
                      setOpenFilter(null);
                    }}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SORT */}
          <select
            className="border rounded-full px-4 py-2"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="new">New Arrivals</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      {isLoading && <p className="text-center">Loading...</p>}
      {isError && <p className="text-center text-red-500">{error.message}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/listing/${product.category}/${product.id}`}
            className="bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="h-40 sm:h-52 bg-gray-100 overflow-hidden rounded-t-xl">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm truncate">{product.name}</h3>
              <p className="text-xs text-gray-500">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl">Filter & Sort</h2>
            <FiX onClick={() => setIsMobileFilterOpen(false)} />
          </div>

          {Object.entries(FILTER_OPTIONS).map(([type, values]) => (
            <div key={type} className="mb-6">
              <h3 className="mb-3 capitalize">{type}</h3>
              <div className="flex flex-wrap gap-2">
                {values.map((v) => (
                  <span
                    key={v}
                    onClick={() => toggleFilterValue(type, v)}
                    className={`px-3 py-1 rounded-full border cursor-pointer ${
                      activeFilters[type]?.includes(v)
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="mb-6">
            <h3 className="mb-3">Sort</h3>
            {[
              ["priceLow", "Price: Low → High"],
              ["priceHigh", "Price: High → Low"],
              ["new", "New Arrivals"],
            ].map(([v, label]) => (
              <button
                key={v}
                onClick={() => setSortValue(v)}
                className={`block w-full mb-2 px-4 py-2 rounded border ${
                  sortValue === v ? "bg-black text-white" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full bg-black text-white py-3 rounded"
          >
            Show Results
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingUpdated;
