import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useCart } from '../context/CartContext';


import {
  fetchProductById,
  fetchRelatedProducts,
} from "../queries/productQueries";

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

export default function ProductDetail() {
   const { id } = useParams();
   const { items, addToCart } = useCart();



  /* ---- Fetch product ---- */
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  /* ---- Related products ---- */
  const mainTag = product?.tags?.length ? product.tags[0] : null;

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", mainTag],
    queryFn: () => fetchRelatedProducts(mainTag, id),
    enabled: !!mainTag,
  });

  const isInCart = items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    });
  }
  };
  /* ---- States ---- */
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

        {/* Main Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-6">
          {/* LEFT: Product Image - 13cm width × 11cm height */}
          <div className="w-full lg:w-1/2 lg:self-start">
            <div 
              className="w-full overflow-hidden rounded-2xl bg-blue-100 flex items-center justify-center"
              style={{
                height: '11cm',
                width: '13cm',
                maxWidth: '100%',
                margin: '0 auto'
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

         {/* RIGHT: Details */}
{           /* RIGHT: Details */}
          {/* On Mobile, the details follow the image */}
          <div className="w-full lg:sticky lg:top-24"> {/* Added lg:sticky for large screen scrolling */}
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 leading-snug">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mt-3 max-w-xl">{product.description}</p>

           
              <div className=" mt-6 text-2xl font-medium text-gray-900">₹{product.price}</div>
            
           

           

            {/* Quantity + Add to Cart - Grouped below for mobile space efficiency */}
            <div className="mt-8">
              {/* Quantity Selector */}
              {/* MATERIAL, COLOR & SIZE - Grid layout */}
                  <div className="flex flex-wrap items-start gap-10 mb-4">
                {/* Material */}
                <div className="relative">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Material</div>
                  <div className="text-lg text-gray-900 font-medium">
                    {product.material}
                  </div>
                  <div className="absolute -right-5 top-0 h-full w-px bg-gray-200 hidden md:block"></div>
                </div>
                
                {/* Color - if exists */}
                {product.color && (
                  <div className="relative">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Color</div>
                    <div className="text-lg text-gray-900 font-medium">{product.color}</div>
                    <div className="absolute -right-5 top-0 h-full w-px bg-gray-200 hidden md:block"></div>
                  </div>
                )}
                
                {/* Size - if exists */}
                {product.size && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Size</div>
                    <div className="text-lg text-gray-900 font-medium">{product.size}</div>
                  </div>
                )}
              </div>

              {/* Add to cart button - Full width on mobile */}
              <button
                className={`w-full rounded-full px-6 py-3 text-base font-medium transition-all shadow-md mt-2 ${
                  isInCart
                    ? 'bg-[#BDB19C] text-white cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:opacity-95'
                }`}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? 'Already in Cart' : 'Add to Cart'}
              </button>
            </div>
            
            {/* Accordions: Description / Materials / Shipping */}
            <div className="mt-10 border-t border-gray-200">
              
            
              {/* MATERIAL & CARE ACCORDION */}
              <Accordion title="Material & Care">
                Dont use soap. 
              </Accordion>
        
              {/* SHIPPING ACCORDION */}
              <Accordion title="Shipping & Returns">
                We offer standard and express shipping options. Standard delivery is typically within 3-5 business days. Returns are accepted within 30 days of purchase, provided the item is unworn and in its original packaging.
              </Accordion>
              
            </div>
          </div>



            
        </div>
        {/* Related products */}
        <section className="mt-4">
          <h2 className="text-2xl font-light text-gray-900 mb-8 pt-8 border-gray-200">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="h-48 w-full bg-gray-100 rounded-t-xl overflow-hidden">
                  <img
                    src={item.imageUrl || "/sample-hero.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-gray-900 truncate mb-1">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-600">₹{item.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}