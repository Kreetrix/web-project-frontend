import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [dailySpecials, setDailySpecials] = useState(() => {
    // Load daily specials from local storage on initialization
    const savedSpecials = localStorage.getItem("dailySpecials");
    return savedSpecials ? JSON.parse(savedSpecials) : [];
  });

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const isSpecial = dailySpecials.some(
        (special) => special.id === product.id
      );

      const price = isSpecial ? product.price * 0.85 : product.price; // Apply discount if special

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, price, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]); // Clear all items from the cart
  };

  // Save daily specials to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("dailySpecials", JSON.stringify(dailySpecials));
  }, [dailySpecials]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        dailySpecials,
        setDailySpecials,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
