import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartCheckout = () => {
  const { items, removeFromCart, clearCart, getCartTotal } = useCart();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    // In a real app, you'd collect form data here
    const formData = new FormData(e.target.form || e.target.closest('form'));
    const contactInfo = Object.fromEntries(formData);

    const orderData = {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      total: getCartTotal(),
      contact: contactInfo,
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString()
    };

    console.log('Placing order:', orderData);
    alert(`Order placed successfully!\nTotal: $${getCartTotal().toFixed(2)}`);
    clearCart();
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 pt-6 pb-16 font-serif">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <ol className="flex items-center space-x-1">
          <li>
            <Link 
              to="/" 
              className="hover:text-gray-900 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <span>›</span>
          <li className="text-gray-900">
            Cart & Checkout
          </li>
        </ol>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-8">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16 border border-gray-100 rounded-lg">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-500 mb-6">Your cart is empty</p>
          <Link 
            to="/products"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border border-gray-100 rounded-lg p-6">
                <h2 className="text-xl font-light text-gray-900 mb-6 tracking-wide">
                  Items in Cart <span className="text-gray-500">({items.length})</span>
                </h2>
                
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div 
                      key={`${item.id}-${index}`}
                      className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex-1">
                        <h3 className="font-light text-gray-900 text-lg mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">ID: {item.id}</p>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <span className="text-gray-900 font-light">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-sm"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information Form */}
              <div className="border border-gray-100 rounded-lg p-6">
                <h2 className="text-xl font-light text-gray-900 mb-6 tracking-wide">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors duration-200"
                        placeholder="John"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors duration-200"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      name="instructions"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors duration-200"
                      placeholder="Any special delivery instructions or notes..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="border border-gray-100 rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-light text-gray-900 mb-6 tracking-wide">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-light">${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-light text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 mt-2 border-t">
                    <span className="text-gray-900 text-lg">Total</span>
                    <span className="text-2xl font-light text-gray-900">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mb-8">
                  <h3 className="text-gray-700 mb-3 text-sm font-medium">Delivery Information</h3>
                  <p className="text-sm text-gray-500">
                    Free standard delivery. Your order will arrive within 3-5 business days.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 font-light tracking-wide rounded"
                  >
                    Place Order
                  </button>
                  
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
                  >
                    Clear Cart
                  </button>

                  <Link 
                    to="/products"
                    className="block text-center py-3 text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm border-t border-gray-50 pt-4"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <p className="text-xs text-gray-400 mt-6 text-center">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CartCheckout;