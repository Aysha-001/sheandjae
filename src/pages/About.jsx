import { Link } from "react-router-dom";
import logo2 from '../assets/logo.png';

const About = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 pt-6 pb-16 font-serif">

      {/* --------------------- Breadcrumb --------------------- */}
      <div className="text-sm text-gray-500 mb-8">
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

      {/* Enhanced Hero Section with Elegant Logo */}
      <div className="max-w-6xl mx-auto">
        
        {/* Logo Banner Section - Elegant & Sophisticated */}
        <div className="mb-16">
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="relative group mb-8">
              {/* Subtle gradient background */}
              <div className="absolute -inset-6 bg-gradient-to-br from-amber-50/30 to-rose-50/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Elegant border ornamentation */}
              <div className="absolute -inset-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-24 h-1 bg-gradient-to-r from-amber-200 to-transparent rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-24 h-1 bg-gradient-to-r from-transparent to-rose-200 rounded-full"></div>
              </div>
              
              {/* Main Logo Container */}
              <div className="relative bg-white rounded-full p-4 md:p-6 shadow-xl border border-gray-100">
                <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center">
                  <img 
                    src={logo2} 
                    alt="She & Jae"
                    className="w-full h-full object-contain transition-all duration-500 group-hover:brightness-105"
                  />
                </div>
              </div>
              
              {/* Sophisticated corner accents - using geometric shapes instead of emojis */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-amber-200 rounded-full shadow-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white border border-rose-200 rounded-full shadow-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Brand Name & Tagline */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                She <span className="text-amber-600 font-light">&</span> Jae
              </h1>
              <div className="w-48 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-rose-300 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-600 text-lg italic font-light">
                Timeless Elegance, Enduring Friendship
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Founding Story with Split Layout */}
        <div className="mb-16 lg:mb-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Visual Element - More Sophisticated */}
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center border border-amber-100">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800">Best Friends</h3>
                        <p className="text-sm text-gray-500 mt-1">Since School Days</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center border border-rose-100">
                          <div className="w-8 h-8 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center">
                            <div className="w-4 h-0.5 bg-white rounded-full rotate-45"></div>
                            <div className="absolute w-4 h-0.5 bg-white rounded-full -rotate-45"></div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800">Shared Dream</h3>
                        <p className="text-sm text-gray-500 mt-1">Late Night Ideas</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center border border-emerald-100">
                          <div className="relative w-8 h-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full"></div>
                            <div className="absolute inset-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800">Creative Journey</h3>
                        <p className="text-sm text-gray-500 mt-1">From Vision to Reality</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-100">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800">With Love</h3>
                        <p className="text-sm text-gray-500 mt-1">Handcrafted Passion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2">
              <div className="mb-8">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Our Story
                  </h2>
                  <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"></div>
                </div>
                
                <div className="bg-white/90 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <p className="text-gray-700 italic leading-relaxed mb-6 text-base md:text-lg">
                    Hi! We're Jadiya and Shifa – two best friends turned business partners, 
                    driven by passion, creativity, and a dream we refused to let stay a dream.
                  </p>
                  
                  <div className="bg-gradient-to-r from-amber-50/50 to-transparent p-5 rounded-xl border-l-2 border-amber-300">
                    <p className="text-gray-700 italic leading-relaxed text-base md:text-lg">
                      Our journey began in the lively corridors of St. Vincent Colony GHSS, 
                      where five inseparable friends – us, along with Noor, Iffa, and Khubra – 
                      first met during our 11th and 12th grades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Brand Philosophy */}
        <div className="mb-16 lg:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              More Than Jewellery
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-amber-300 to-rose-300 mx-auto rounded-full"></div>
          </div>

          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden border border-gray-100">
            {/* Subtle decorative elements */}
            <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-amber-100 to-transparent rounded-full opacity-30"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-rose-100 to-transparent rounded-full opacity-30"></div>
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center border border-amber-100 flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-white rotate-45"></div>
                          <div className="w-3 h-0.5 bg-white -rotate-45"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">Our Essence</h3>
                        <p className="text-gray-600 italic text-base leading-relaxed">
                          Born out of endless late-night conversations, shared inspiration,
                          and a desire to create something truly special, She & Jae isn't just 
                          a jewellery brand – it's a tribute to friendship, growth, and fearless dreaming.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center border border-rose-100 flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">For You</h3>
                        <p className="text-gray-600 italic text-base leading-relaxed">
                          Our pieces are crafted for the everyday woman – strong, bold, gentle, and 
                          radiant – just like you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 bg-gradient-to-br from-amber-50 to-rose-50 rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                      <div className="w-56 h-56 bg-white rounded-full flex flex-col items-center justify-center p-8 text-center border border-gray-200">
                        {/* Logo in circle */}
                        <div className="w-32 h-32 mb-6">
                          <img 
                            src={logo2} 
                            alt="She & Jae"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full mb-3"></div>
                        <p className="text-gray-600 text-sm italic">Timeless Elegance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Craftsmanship & Promise */}
        <div className="mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full flex items-center justify-center border border-blue-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-white"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800">Anti-Tarnish</h4>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-full flex items-center justify-center border border-emerald-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-300 to-green-400 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800">Waterproof</h4>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full flex items-center justify-center border border-purple-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800">Sweat-Proof</h4>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center border border-amber-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800">Luxury Packaging</h4>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50/50 to-transparent p-6 rounded-xl border-l-2 border-amber-300">
                  <p className="text-gray-700 italic leading-relaxed text-base">
                    At She&Jae, we craft timeless, anti-tarnish sweat-proof, and waterproof
                    jewellery that embodies both elegance and resilience. Designed for everyday
                    sophistication, each piece arrives thoughtfully packaged, offering a touch 
                    of luxury in every detail.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Crafted with <span className="text-rose-600">Care</span>,<br/>
                  Worn with <span className="text-amber-600">Pride</span>
                </h2>
                <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full mb-8 mx-auto lg:mx-0"></div>
                
                <div className="bg-white/90 rounded-2xl p-6 shadow-sm border border-gray-100">
                  <p className="text-gray-700 italic leading-relaxed text-base mb-6">
                    This is just the beginning, and we're so grateful to have you 
                    here with us. Join us on this journey – wear our story,
                    feel our passion, and let's shine together.
                  </p>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-10">
              {/* Logo appears again in signature section */}
              <div className="inline-flex items-center justify-center gap-6 mb-8">
                <div className="w-20 h-20">
                  <img 
                    src={logo2} 
                    alt="She & Jae"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">She & Jae</h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="inline-block bg-white border border-amber-200 px-6 py-3 rounded-full shadow-sm">
                <p className="text-gray-700 font-medium text-sm tracking-wide">FROM OUR HEARTS TO YOURS</p>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-100 to-rose-100 rounded-lg opacity-50"></div>
                <div className="relative bg-white rounded-lg px-8 py-8 border border-gray-100">
                  <p className="text-gray-500 italic text-sm mb-3 tracking-wide">With love,</p>
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    Jadiya & Shifa
                  </p>
                  <p className="text-gray-500 text-sm mt-3 tracking-wider">
                    Founders of She & Jae
                  </p>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-500 text-sm italic tracking-wide">
                  Every piece tells a story. Thank you for being part of ours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;