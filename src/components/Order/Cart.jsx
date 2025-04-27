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
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">Ostoskori</h3>
      <div className="space-y-4 mb-6">
        {cartItems.length === 0 ? (
          <p>Ostoskori on tyhjä</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity} kpl</p>
              </div>
              <div className="text-right">
                {item.originalPrice && item.originalPrice !== item.price ? (
                  <>
                    <p className="text-gray-400 line-through">
                      {(item.originalPrice * item.quantity).toFixed(2)}€
                    </p>
                    <p className="font-medium text-red-600">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </>
                ) : (
                  <p className="font-medium">
                    {(item.price * item.quantity).toFixed(2)}€
                  </p>
                )}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Poista
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Tuotteet</span>
          <span>{calculateTotal()}€</span>
        </div>
        <button className="w-full bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded-lg mt-6 shadow-md transition-all duration-300">
          Maksa tilaus
        </button>
      </div>
    </div>
  );
};

export default Cart;
