
import { useCart } from '../context/CartContext';

const CartCheckout = () => {
  const { items, removeFromCart, clearCart, getCartTotal } = useCart();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    // Prepare order data
    const orderData = {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      total: getCartTotal(),
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString()
    };

    console.log('Placing order:', orderData);
    
    // Here you would send to your backend
    // Example:
    // fetch('/api/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(orderData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   clearCart();
    //   alert('Order placed successfully!');
    // });

    // For demo:
    alert(`Order placed! Total: $${getCartTotal().toFixed(2)}`);
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart & Checkout</h2>
      
      {/* Cart Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Cart Items ({items.length})</h3>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <a href="/products" className="text-blue-600 hover:underline">
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600 text-sm">ID: {item.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout/Place Order Section - Only show if cart has items */}
      {items.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Ready to Order?</h3>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Review your items above. Your order total is <strong>${getCartTotal().toFixed(2)}</strong>
            </p>
            
            {/* Simple checkout form (optional) */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Contact Info</h4>
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border rounded-md mb-3"
              />
              <textarea
                placeholder="Delivery notes (optional)"
                className="w-full p-3 border rounded-md"
                rows="3"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={clearCart}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear Cart
              </button>
              
              <button
                onClick={handlePlaceOrder}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                Place Order for ${getCartTotal().toFixed(2)}
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              By placing your order, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCheckout;