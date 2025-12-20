import { useQuery } from "@tanstack/react-query";

// src/pages/Product.jsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMinus, FiPlus, FiChevronDown } from "react-icons/fi"; // Added FiChevronDown

import { fetchProductById, fetchRelatedProducts } from "../queries/productQueries";


// --- START: Accordion Component for Mobile Optimization ---
function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left text-base font-serif text-gray-900"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <FiChevronDown
          className={`h-5 w-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm text-gray-700 leading-relaxed pr-8">{children}</div>
      </div>
    </div>
  );
}
// --- END: Accordion Component ---

export default function ItemFetch() {
  const { id } = useParams();

  console.log("id from id ", id);
  //const product = sampleProduct;

  

  /*const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));*/

  const {
    data: product,
    isLoading,
    isError,
    } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
});


  const addToCart = () => {
    console.log("Add to cart:", {
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };

  const mainTag = product?.tags?.[0];

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", mainTag],
    queryFn: () => fetchRelatedProducts(mainTag, id),
    enabled: !!mainTag,
    });

    if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading product...</p>;
    }

    if (isError || !product) {
    return <p className="text-center py-20 text-red-500">Product not found.</p>;
    }


  return (
    <div className="px-4 md:px-8 lg:px-16 pt-6 pb-16 font-serif">
      <div>
        {/* Breadcrumb - Remains Responsive */}
        <nav className="text-sm text-gray-500 mb-4">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-gray-900 transition">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to={`/listing/${product.category}`} className="hover:text-gray-900 transition capitalize">
                {product.category}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        {/* Main Product Grid - Mobile: Stacks vertically | LG: 2 Columns */}
        {/* Main Product Grid */}
<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-6">

  
  {/* LEFT: Product Image - SQUARE */}
 <div className="w-full lg:self-start">
  <div className="w-full aspect-square overflow-hidden rounded-2xl bg-pink-200">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>
</div>


  {/* RIGHT: Details - COMPACT */}
  <div className="w-full">
    {/* PRODUCT NAME - Single line on mobile */}
    <h1 className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-900 truncate">
      {product.name}
    </h1>

    {/* PRICE - Immediately below name */}
    <div className="mt-2 text-2xl font-bold text-gray-900">₹{product.price}</div>

    {/* SHORT DESCRIPTION - Limited to 2 lines */}
    <p className="text-xs md:text-sm text-gray-600 mt-3 line-clamp-2">
      {product.description}
    </p>

    {/* MATERIAL - Minimal */}
    <div className="mt-4">
      <div className="text-xs text-gray-700">Material</div>
      <div className="text-sm text-gray-900 font-medium truncate">
        {product.material.join(", ")}
      </div>
    </div>

    {/* ADD TO CART - Prominent */}
    <button
      onClick={addToCart}
      className="w-full mt-6 rounded-lg px-4 py-3 bg-gray-900 text-white font-medium hover:bg-black transition-colors"
    >
      Add to Cart
    </button>
    
    {/* ACCORDIONS - Much more compact */}
    <div className="mt-6">
      {/* DESCRIPTION - Only shows when opened */}
      <Accordion title="Description" defaultOpen={false}>
        <div className="text-sm text-gray-600">
          {product.description}
        </div>
      </Accordion>
  
      {/* MATERIAL & CARE */}
      <Accordion title="Material & Care">
        <div className="text-sm text-gray-600">
          {Array.isArray(product.material) ? product.material.join(", ") : product.material}
        </div>
      </Accordion>
  
      {/* SHIPPING - Shorter text */}
      <Accordion title="Shipping & Returns">
        <div className="text-sm text-gray-600">
          Standard shipping: 3-5 business days. Returns accepted within 30 days.
        </div>
      </Accordion>
    </div>
  </div>
</div>


        {/* Related products */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-gray-900 mb-6 border-t pt-8 border-gray-200">You may also like</h2>
          {/* Grid layout changes from 2 cols on small screens to 4 on medium/large screens */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"> 
            {relatedProducts.map((item) => (
                <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition"
                >
                    <img
                    src="/sample-hero.jpg"
                    alt={item.name}
                    className="h-40 w-full object-cover rounded-t-xl"
                    />
                    <div className="p-4">
                    <div className="text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">₹{item.price}</div>
                    </div>
                </Link>
                ))}

          </div>
        </section>
      </div>
    </div>
  );
}



