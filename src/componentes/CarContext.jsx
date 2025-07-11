import { createContext, useContext, useState } from "react";

const CarContext = createContext();

export function useCart() {
  return useContext(CarContext);
}

export function CarProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      const addQty = product.quantity || 1;
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      }
      return [...prev, { ...product, quantity: addQty }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeAllFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CarContext.Provider
      value={{ cart, addToCart, removeFromCart, removeAllFromCart, clearCart }}
    >
      {children}
    </CarContext.Provider>
  );
}