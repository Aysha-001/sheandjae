// src/pages/Product.jsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMinus, FiPlus, FiChevronDown } from "react-icons/fi"; // Added FiChevronDown

const sampleProduct = {
  //details of product
};

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

export default function Item() {
  const { id } = useParams();
  const product = sampleProduct;

  const [selectedMaterial, setSelectedMaterial] = useState(
    product.materialOptions[0]
  );
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const addToCart = () => {
    console.log("Add to cart:", {
      id: product.id,
      name: product.name,
      material: selectedMaterial,
      quantity,
      price: product.price,
    });
  };

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
              <Link to="/listing/rings" className="hover:text-gray-900 transition capitalize">
                Rings
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        {/* Main Product Grid - Mobile: Stacks vertically | LG: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-6">
          
          {/* LEFT: Product Image */}
          {/* On Mobile, the image comes first (default), on LG, it occupies the first column */}
          <div className="w-full">
            <div
              className="rounded-xl lg:rounded-3xl bg-white shadow-lg lg:shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden"
              // Removed fixed height, using aspect ratio for fluid sizing
            >
              <img
                src="/sample-hero.jpg" // replace with real image url (product.image)
                alt={product.name}
                // Aspect ratio class: makes the image responsive and keeps its shape
                className="w-full h-auto aspect-[4/5] object-cover object-center transform transition duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* RIGHT: Details */}
          {/* On Mobile, the details follow the image */}
          <div className="w-full lg:sticky lg:top-24"> {/* Added lg:sticky for large screen scrolling */}
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 leading-snug">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mt-3 max-w-xl">{product.short}</p>

            <div className="mt-6 flex items-baseline gap-4">
              <div className="text-2xl font-medium text-gray-900">₹{product.price}</div>
              <div className="text-xs text-gray-500">SKU: {product.sku}</div>
            </div>

            {/* Variant selectors */}
            <div className="mt-8">
              <div className="text-sm text-gray-700 mb-3">Material</div>
              <div className="flex flex-wrap gap-2"> {/* Reduced gap for mobile */}
                {product.materialOptions.map((mat) => {
                  const active = selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition focus:outline-none ${
                        active
                          ? "bg-[#E8E2D9] border-gray-900 text-gray-900"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                      aria-pressed={active}
                    >
                      {mat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + Add to Cart - Grouped below for mobile space efficiency */}
            <div className="mt-8">
              {/* Quantity Selector */}
              <div className="mb-4">
                 <div className="text-sm text-gray-700 mb-2">Quantity</div>
                 <div className="flex items-center gap-3 w-32 border border-gray-300 rounded-full p-1 bg-white">
                    <button
                      onClick={decrement}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <div className="text-base font-medium flex-grow text-center">{quantity}</div>
                    <button
                      onClick={increment}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              {/* Add to cart button - Full width on mobile */}
              <button
                onClick={addToCart}
                // Added w-full for mobile
                className="w-full rounded-full px-6 py-3 bg-gray-900 text-white text-base font-medium hover:opacity-95 transition-shadow shadow-md mt-4"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Accordions: Description / Materials / Shipping */}
            <div className="mt-10 border-t border-gray-200">
              
              {/* DESCRIPTION ACCORDION */}
              <Accordion title="Description" defaultOpen={true}>
                {product.description}
              </Accordion>
        
              {/* MATERIAL & CARE ACCORDION */}
              <Accordion title="Material & Care">
                {product.materials}
              </Accordion>
        
              {/* SHIPPING ACCORDION */}
              <Accordion title="Shipping & Returns">
                We offer standard and express shipping options. Standard delivery is typically within 3-5 business days. Returns are accepted within 30 days of purchase, provided the item is unworn and in its original packaging.
              </Accordion>
              
            </div>
          </div>
        </div>

        {/* Related products */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-gray-900 mb-6 border-t pt-8 border-gray-200">You may also like</h2>
          {/* Grid layout changes from 2 cols on small screens to 4 on medium/large screens */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"> 
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition transform hover:scale-[1.02] cursor-pointer"
              >
                <div className="h-40 sm:h-52 bg-gray-100 rounded-t-xl" /> {/* Adjusted height for smaller screens */}
                <div className="p-3 sm:p-4"> {/* Reduced padding for mobile */}
                  <div className="text-sm text-gray-900 truncate">Minimal Ring {n}</div>
                  <div className="text-xs text-gray-500 mt-1">₹{1499 + n * 100}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}