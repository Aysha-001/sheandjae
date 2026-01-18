import { Link , useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {placeOrderToDB} from '../queries/orders'

const CartCheckout = () => {
  const { items, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async(e) => {
    e.preventDefault();
    if (items.length === 0) return;

    // In a real app, you'd collect form data here
    const formData = new FormData(e.target.form || e.target.closest('form'));
    const contactInfo = Object.fromEntries(formData);

    const orderData = {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image // Add image to order data
      })),
      total: getCartTotal(),
      contact: contactInfo,
      order_id: `ORD-${Date.now()}`
    };

    try {
      const orderDocId = await placeOrderToDB(orderData);
      clearCart();
      navigate("/thankyou", { state: { orderDocId } });
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 pt-6 pb-16 font-serif">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <ol className="flex items-center space-x-1">
          <li>
            <Link 
              to="/" 
              className="hover:text-gray-900 transition-colors duration-200 hover:underline"
            >
              Home
            </Link>
          </li>
          <span>›</span>
          <li className="text-gray-900 font-medium">
            Cart & Checkout
          </li>
        </ol>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
        Your Shopping Cart
      </h1>
      <p className="text-gray-500 mb-8">Review your items and complete your purchase</p>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-gray-200 rounded-xl bg-white shadow-sm">
          <div className="text-gray-300 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-6">Your cart is feeling empty</p>
          <Link 
            to="/products"
            className="inline-block px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 rounded-lg font-medium shadow-sm hover:shadow"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cart Items Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-light text-gray-900 tracking-tight">
                    Your Items <span className="text-gray-400 font-normal">({items.length})</span>
                  </h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 px-3 py-1 hover:bg-red-50 rounded-lg"
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0 mr-4">
                        <img 
                          src={item.image || '/api/placeholder/80/80'} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm mt-1">SKU: {item.sku || 'N/A'}</p>
                      </div>
                      
                      {/* Price and Actions */}
                      <div className="flex items-center gap-6">
                        <p className="text-gray-900 font-medium text-lg">${item.price.toFixed(2)}</p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 text-lg transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information Form - Enhanced */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="John"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Special Instructions
                    </label>
                    <textarea
                      name="instructions"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Any special delivery instructions or notes..."
                    />
                    <p className="text-xs text-gray-500">Max 500 characters</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                  Order Summary
                </h2>

                {/* Order Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                    <span className="text-gray-900 text-lg font-medium">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${(getCartTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery Info Card */}
                <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-gray-700 font-medium text-sm">Free Shipping</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Your order will arrive within 3-5 business days. Free standard delivery on all orders.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 font-medium tracking-wide rounded-lg shadow hover:shadow-lg"
                  >
                    Place Order
                  </button>
                  
                  <Link 
                    to="/products"
                    className="block text-center py-3.5 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium border border-gray-200 hover:border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
              
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CartCheckout;