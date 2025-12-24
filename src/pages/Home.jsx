
import logo2 from '../assets/logo.png';

import bg6 from '../assets/bg6.jpg';

import rings from '../assets/rings.jpg';
import earrings from '../assets/earrings.jpg';
import bangles from '../assets/bangles4.jpg';
import necklace from '../assets/necklace2.jpg';
import bracelets from '../assets/bracelets3.jpg';
import { Link } from "react-router-dom";

 //import { useSearch } from '../context/SearchContext';// Update path
import  { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiShoppingBag, FiMail, FiInstagram} from 'react-icons/fi';// Update the path accordingly
import { fetchNewArrivals } from '../queries/productQueries';

import { FiSearch, FiUser, FiShoppingBag, FiMail, FiInstagram} from 'react-icons/fi';

// Update the path accordingly



function Home() {

   //const { searchTerm, searchResults, handleSearch } = useSearch();
 // const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadNewArrivals = async () => {
    try {
      const data = await fetchNewArrivals();
      console.log("Fetched new arrivals:", data); 
      setNewArrivals(data);
    } finally {
      setLoading(false);
    }
  };

  loadNewArrivals();
}, []);


  /*useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSearch && !e.target.closest('.relative')) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);*/

  // ... rest of your component code


  
  return (
    <>
      <div> 
        {/* Primary Navigation 
        <nav className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopNav totalItems={totalItems} />
        <BottomNav />
      </div>
    </nav>
    */}
      

  {/* Hero Image */}
        
<div className="font-serif w-full bg-[#F6F4EF]">
  {/* Hero Image - Full bleed with overlay text */}
  <div className="relative h-[70vh] md:h-[90vh] overflow-hidden">
    <img
      src={bg6}
      alt="Hero"
      className="w-full h-full object-cover object-center transition-transform duration-700"
    />
    
    {/* Overlay title (mobile & desktop) */}
    <div className="absolute inset-0 flex items-end pb-12 md:items-center md:pb-0 px-6 md:px-12 bg-gradient-to-t from-black/30 via-black/10 to-transparent">
      <div>
        <span className="text-xs tracking-widest text-white/80 mb-2"></span>
        <h1 className="text-5xl md:text-7xl font-light text-white leading-tight">
          <span className="font-bold block">Refined</span>
          <span className="italic">Aesthetics</span>
        </h1>
      </div>
    </div>
  </div>

  {/* Text Panel - Appears as scroll continuation */}
 <div className="p-8 md:p-12 md:py-16 bg-[#F6F4EF] relative -mt-12 md:-mt-20 z-10">
  <div className="max-w-xl mx-auto px-4 md:px-0"> {/* Added px-4 for mobile */}
    <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 border-l-2 border-black pl-4 md:pl-6 leading-relaxed">
      "We craft not just jewelry, but wearable poetry. Each piece is a comma in your life's story, 
      a pause that draws attention to what matters."
    </p>
    
  
      <button className="text-sm tracking-widest border-b border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all w-fit">
        Know more about us 
      </button>
    
    
  </div>
</div>
</div>
<section className="py-12 pb-20  bg-[#f6f7f7] relative">
  {/* Curvy wave decoration (hidden on mobile) */}
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-12 p-8">
      <h2 className="text-2xl md:text-3xl font-light tracking-wider text-stone-700">SHOP BY CATEGORY</h2>
      <div className="w-20 h-px bg-stone-300 mx-auto mt-4"></div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      <a href="/listing/rings" className="group relative">
  <div className="aspect-square w-full bg-stone-50 mb-2 rounded-t-full rounded-b-sm border border-stone-200/50 shadow-sm group-hover:shadow-md transition-all overflow-hidden">
    <div className="relative w-full h-full">
      <img
        src={rings}
        alt="Rings"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        
      </div>
    </div>
  </div>
   <p className="text-center text-stone-800 text-sm font-normal uppercase tracking-[0.15em] mt-1">RINGS</p>
 </a>


      <a href="/listing/necklaces" className="group relative">
        <div className="aspect-square w-full bg-stone-50 mb-2 rounded-t-full rounded-b-sm border border-stone-200/50 shadow-sm group-hover:shadow-md transition-all overflow-hidden">
    <div className="relative w-full h-full">
      <img
        src={earrings}
        alt="Rings"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        
      </div>
    </div>
  </div>
   <p className="text-center text-stone-800 text-sm font-normal uppercase tracking-[0.15em] mt-1">EARRINGS</p>
     </a>


      
      <a href="/listing/earrings" className="group relative">
        <div className="aspect-square w-full bg-stone-50 mb-2 rounded-t-full rounded-b-sm border border-stone-200/50 shadow-sm group-hover:shadow-md transition-all overflow-hidden">
    <div className="relative w-full h-full">
      <img
        src={necklace}
        alt="Rings"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        
      </div>
    </div>
  </div>
   <p className="text-center text-stone-800 text-sm font-normal uppercase tracking-[0.15em] mt-1">NECKLACE</p>
     </a>
      


      <a href="/listing/bracelets" className="group relative">
       <div className="aspect-square w-full bg-stone-50 mb-2 rounded-t-full rounded-b-sm border border-stone-200/50 shadow-sm group-hover:shadow-md transition-all overflow-hidden">
    <div className="relative w-full h-full">
      <img
        src={bangles}
        alt="Rings"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        
      </div>
    </div>
  </div>
   <p className="text-center text-stone-800 text-sm font-normal uppercase tracking-[0.15em] mt-1">KADA</p>
     </a>


      
      {/* Anklets category with mobile centering */}
      {/* Last category - centered on mobile, normal on desktop */}
<div className="col-span-2 md:col-span-1 flex md:block justify-center">
  <a href="/listing/anklets" className="group relative w-full max-w-[220px] md:max-w-none">
    <div className="aspect-square w-full bg-stone-50 mb-2 rounded-t-full rounded-b-sm border border-stone-200/50 shadow-sm group-hover:shadow-md transition-all overflow-hidden">
      <div className="relative w-full h-full">
        <img
          src={bracelets}
          alt="Bracelets"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </div>
    <p className="text-center text-stone-800 text-sm font-normal uppercase tracking-[0.15em] mt-1">BRACELETS</p>
  </a>
</div>
    </div>
  </div>
</section>

  {/* NEW ARRIVAL SECTION */}
  {!loading && newArrivals.length > 0 && (
<section className="py-20 bg-[#F6F4EF]">
  <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">

    {/* Section heading */}
    <div className="text-center mb-12">
      <h2 className="text-2xl md:text-3xl font-light tracking-wider text-stone-700">
        NEW ARRIVALS
      </h2>
      <div className="w-16 h-px bg-stone-300 mx-auto mt-4 font-light">trending now</div>
    </div>

    {/* Products */}
    {loading ? (
      <p className="text-center text-sm text-stone-500">Loading...</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {newArrivals.map((product) => (
            <Link
        key={product.id}
        to={`/listing/${product.category}/${product.id}`}
        className="bg-[#FAF8F4] rounded-xl border border-stone-200/60
             hover:shadow-md transition transform duration-300 hover:scale-[1.02]
             block font-serif"
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


        ))}
      </div>
    )}

    {/* Subtle CTA */}
    <div className="mt-12 text-center">
      <Link
        to="/listing/new"
        className="inline-block text-xs tracking-widest text-stone-700 hover:text-amber-600 transition-all"
      >
        View all new pieces →
      </Link>
    </div>

  </div>
</section>
)}



       <section className="relative overflow-hidden bg-stone-100 py-20">
  {/* Decorative elements */}
   <div className="absolute top-12 left-12 w-24 h-px bg-amber-500 hidden md:block"></div>
  

  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
    {/* Left Column - French Typography */}
    <div className="md:w-1/2 mb-16 md:mb-0 md:pr-16 font-serif">
      <span className="text-xs tracking-[0.2em] text-amber-500 block mb-8">
        UNE HISTOIRE D'AMOUR
      </span>
      <h1 className="text-5xl md:text-6xl font-light text-stone-800 leading-tight mb-6">
        <span className="font-bold block">Our Story</span>
        <span className="italic">......</span>
      </h1>
      <div className="border-t border-amber-200 pt-6 max-w-md">
        <p className="text-stone-600 mb-6 italic">
        


          <span className="font-semibold not-italic">..........</span>"
        </p>
       
       <Link
          to="/about"
          className="inline-block text-sm tracking-widest text-stone-800 hover:text-amber-600 transition-all"
        >
          Read our Story →
        </Link>

        
     
      </div>
    </div>
    
    {/* Right Column - Logo & Visual */}
    <div className="md:w-1/2 flex flex-col items-center justify-center relative">
      <div className="relative group">
        <img 
          src={logo2} 
          alt="ÉLÉ" 
          className="h-[180px] md:h-[240px] object-contain transition-opacity group-hover:opacity-90"
        />
        <div className="absolute inset-0 border border-stone-300 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
      </div>
      <p className="mt-12 text-stone-500 text-center max-w-sm italic">
        Just slay</p>
    </div>
  </div>
</section>       
        {/* Categories Grid */}
     {/* Enhanced Categories Grid */}
{/* Categories Grid */}
        
        {/* Footer */}
       <footer className="bg-[#F6F4EF] text-stone-500 py-12 border-t border-stone-100">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center">
      {/* Logo 
      <img 
        src={logo2}
        alt="ÉLÉ Logo" 
        className="h-20 mb-6"
      />
      */ }
      
      {/* Social Links */}
      <div className="flex space-x-6 mb-8">
  {/* Email - using Feather icon for consistency */}
  <a 
    href="mailto:hello@elejewelry.com" 
    className="hover:text-stone-800 transition-colors"
    aria-label="Email"
  >
    <FiMail className="w-5 h-5" />
  </a>
  
  {/* Instagram */}
  <a 
    href="https://instagram.com/ele.jewelry" 
    aria-label="Instagram" 
    className="hover:text-stone-800 transition-colors"
  >
    <FiInstagram className="w-5 h-5" />
  </a>
</div>
      
      {/* Closing Message */}
      <p className="text-sm font-light text-center max-w-md mb-8">
        Thank you for visiting us. We look forward to crafting beautiful moments with you  <span className="text-stone-400 text-lg">♥.</span>
          </p>
      
      {/* Copyright */}
      <p className="text-xs text-stone-400">
         She&Jae Jewelry.
      </p>
    </div>
  </div>
</footer>
      </div>
    </>
  )
}

export default Home