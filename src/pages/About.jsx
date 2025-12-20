import { Link, useParams } from "react-router-dom";
import logo2 from '../assets/logo.png';

const About =() =>{
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
          About
        </li>
      </ol>
      </div>

      <div>

      <div className="max-w-3xl mx-auto max-w-3xl mx-auto bg-[#FAF7F2] rounded-2xl p-8 md:p-12 shadow-sm">

  {/* Logo Placeholder */}
  <div className="mb-10 ">
    <div className="w-24 h-24  flex items-center justify-center text-gray-400 italic">
       <img 
                src={logo2} 
                alt="she&Jae"
                
              />
    </div>
  </div>

  {/* Letter Body */}
  <div className="text-gray-800 italic leading-relaxed space-y-6 text-base md:text-lg">
                    <p>
                   Hi! We’re Jadiya and Shifa – two best friends turned business partners, driven by passion, creativity, and a dream we refused to let stay a dream.<br/> Our journey began in the lively corridors of St. Vincent Colony GHSS, where five inseparable friends – us, along with Noor, Iffa, and khubra– first met during our 11th and 12th grades. 
                    </p>

                    <p>
                   Born out of endless late-night conversations, shared Pinterest boards,
                    and a desire to create something truly special, She & Jae isn’t just 
                    a jewellery brand – it’s a tribute to friendship, growth, and fearless dreaming.
                     Our pieces are crafted for the everyday woman – strong, bold, gentle, and 
                     radiant – just like you.
                    </p>

                    <p>
                    At She&Jae, we craft timeless, anti-tarnish sweat-proof, and waterproof
                     jewellery that embodies both elegance and resilience. Designed for everyday
                      sophistication, each piece arrives 
                    thoughtfully packaged, offering a touch of luxury in every detail.
                    </p>

                    <p>
                        This is just the beginning, and we’re so grateful to have you 
                        here with us. Join us on this journey – wear our story,
                         feel our passion, and let’s shine together. 💫
                    </p>
                </div>

                {/* Signature / Divider */}
                {/* Signature */}
            <div className="mt-12 text-gray-600 italic">
            <p className="text-sm">With love,</p>

            <p className="mt-3 leading-relaxed">
                Jadiya & Shifa<br />
                <span className="text-sm tracking-wide">
                Founders of She & Jae
                </span>
            </p>
            </div>


                </div>


      </div>
      </div>
    )
}

export default About;