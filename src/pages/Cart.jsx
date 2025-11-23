import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQty, totalPrice } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between bg-white p-4 shadow rounded">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}
