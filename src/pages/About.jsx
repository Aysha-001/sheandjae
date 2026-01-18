import { Link } from "react-router-dom";
import logo2 from '../assets/logo.png';
import about_image from '../assets/about_image.jpg'
import { useEffect } from "react";

const About = () => {

  
useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth' // Optional: adds smooth scrolling
  });
}, []);


  return (
  <div className="px-4 md:px-8 lg:px-16 pt-6 pb-24 font-serif">

  {/* --------------------- Breadcrumb --------------------- */}
  <div className="text-sm text-gray-500 mb-10">
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
      <li>About</li>
    </ol>
  </div>

  {/* --------------------- Main Container --------------------- */}
  <div className="max-w-6xl mx-auto">
    
    {/* Header Section with Logo and Title */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 lg:mb-24 gap-10 lg:gap-20">
      
      {/* Logo Space */}
      <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
        <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
          {/* Replace this div with your logo image */}
          <img 
            src={logo2} 
            alt="She & Jae" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Title Section */}
      <div className="w-full lg:w-2/3">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-gray-900 mb-6">
            Our Story
          </h1>
          <div className="w-24 h-0.5 bg-gray-300"></div>
        </div>
        
        <div className="text-xl md:text-2xl font-light text-gray-700">
          <p className="text-lg text-gray-600 max-w-2xl">
            A tribute to friendship, growth, and fearless dreaming
          </p>
        </div>
      </div>
    </div>

    {/* --------------------- Optional Image & Content Layout --------------------- */}
    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
      
    
      
      {/* Content Column */}
      <div className="w-full">
        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p className="text-xl leading-relaxed">
            Hi! We're Jadiya and Shifa – two best friends turned business partners, driven by passion, creativity, and a dream we refused to let stay a dream. Our journey began in the lively corridors of St. Vincent Colony GHSS, where five inseparable friends – us, along with Noor, Iffa, and Khubra – first met during our 11th and 12th grades.
          </p>

          <p>
            Born out of endless late-night conversations, shared Pinterest boards, and a desire to create something truly special, She & Jae isn't just a jewellery brand – it's a tribute to friendship, growth, and fearless dreaming. Our pieces are crafted for the everyday woman – strong, bold, gentle, and radiant – just like you.
          </p>

          {/* Optional Inline Image (Remove if not needed) */}
         <div className="my-12 py-8 border-y border-gray-200">
            <img 
              src={about_image} 
              alt="She & Jae Collection" 
              className="w-full h-72 object-cover"
            />
          </div>

          <p>
            At She & Jae, we craft timeless, anti-tarnish sweat-proof, and waterproof jewellery that embodies both elegance and resilience. Designed for everyday sophistication, each piece arrives thoughtfully packaged, offering a touch of luxury in every detail.
          </p>

          <p className="text-xl italic text-gray-800 py-6 border-y border-gray-200">
            This is just the beginning, and we're so grateful to have you here with us. Join us on this journey – wear our story, feel our passion, and let's shine together.
          </p>
        </div>

        {/* --------------------- Signature Section --------------------- */}
        <div className="mt-20 pt-10 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-gray-800 mb-4 text-lg">With love,</p>
              <div className="space-y-2">
                <p className="text-2xl font-light">Jadiya & Shifa</p>
                <p className="text-gray-600">Founders of She & Jae</p>
              </div>
            </div>
            
          
          </div>
        </div>
      </div>
    </div>

    {/* --------------------- Brand Values Section (Optional) --------------------- */}
    
  </div>
</div>
  );
};

export default About;