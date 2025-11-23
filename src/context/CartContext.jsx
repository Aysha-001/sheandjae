import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Get cart from localStorage if it exists
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  }

  function updateQty(id, delta) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter(item => item.qty > 0)
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
