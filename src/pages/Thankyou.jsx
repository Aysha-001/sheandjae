
import { Link, useLocation } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const orderId = location?.state?.orderDocId || "N/A";
  return (
    <div className="px-4 md:px-8 lg:px-16 pt-6 pb-16 font-serif max-w-lg mx-auto">
      {/* Breadcrumb */}
      

      {/* Content */}
      <div className="text-center pt-8">
        {/* Simple Checkmark */}
        <div className="text-[#BDB19C] mb-6">
          <svg 
            className="w-16 h-16 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        <h1 className="text-2xl font-light text-gray-900 mb-3">
          Order Confirmed
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase
        </p>

        {/* Simple Summary */}
        <div className="border border-gray-100 rounded p-6 mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Order Number</span>
            <span className="text-gray-900">#{Date.now().toString().slice(-8)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery</span>
            <span className="text-gray-900">3-5 days</span>
          </div>
        </div>

        {/* Continue Button */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            Back to Store
          </Link>
          
          <p className="text-sm text-gray-400 pt-4">
            A confirmation email has been sent to your inbox
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;