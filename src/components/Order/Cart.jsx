import React from "react";
import { useCart } from "../../contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="bg-white dark:bg-gray-600 rounded-xl shadow-md p-6 sticky top-4 max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Ostoskori
      </h3>

      <div className="space-y-4 mb-6">
        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Ostoskori on tyhjä</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">{item.quantity} kpl</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {(item.price * item.quantity).toFixed(2)}€
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 dark:text-red-400 text-sm hover:underline mt-2"
                >
                  Poista
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-white">Tuotteet</span>
            <span className="text-gray-800 dark:text-gray-200">
              {calculateTotal()}€
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600 dark:text-white">Toimitus</span>
            <span className="text-gray-800 dark:text-gray-200">5.90€</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-800 dark:text-gray-200">Yhteensä</span>
            <span className="text-gray-800 dark:text-gray-200">
              {(parseFloat(calculateTotal()) + 5.9).toFixed(2)}€
            </span>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded-lg mt-6 shadow-md transition-all duration-300">
            Maksa tilaus
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
