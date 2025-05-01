import React from "react";
import { useCart } from "../../contexts/CartContext";
import { sendOrder } from "../../data/sendOrder";

const Cart = ({ isFormValid }) => {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrder = async () => {
    const orderData = {
      user_id: 1, // Replace with actual user ID
      items: cartItems.map((item) => ({
        product_id: item.ID,
        quantity: item.quantity,
      })),
      price: parseFloat(calculateTotal()) + 5.9,
      status: "completed",
    };
    console.log("Order data:", orderData);

    try {
      const response = await sendOrder(orderData);
      console.log("Order sent successfully:", response);
      alert("Tilaus lähetetty onnistuneesti!");
    } catch (error) {
      console.error("Error sending order:", error);
      alert("Tilausta ei voitu lähettää. Yritä uudelleen.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-600 rounded-xl shadow-md p-6 sticky top-4 max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Ostoskori
      </h3>

      <div className="space-y-4 mb-6" role="list" aria-label="Ostoskori tuotteet">
        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Ostoskori on tyhjä</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} role="listitem" className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {item.quantity} kpl
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {(item.price * item.quantity).toFixed(2)}€
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 dark:text-red-400 text-sm hover:underline mt-2"
                  aria-label={`Poista ${item.name} ostoskorista`}
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
            <span className="text-gray-600 dark:text-gray-300">Tuotteet</span>
            <span className="text-gray-800 dark:text-gray-200">
              {calculateTotal()}€
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-300">Toimitus</span>
            <span className="text-gray-800 dark:text-gray-200">5.90€</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-800 dark:text-gray-200">Yhteensä</span>
            <span className="text-gray-800 dark:text-gray-200">
              {(parseFloat(calculateTotal()) + 5.9).toFixed(2)}€
            </span>
          </div>

          <button
            onClick={handleOrder}
            className={`w-full bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-500 text-white font-bold py-3 px-4 rounded-lg mt-6 shadow-md transition-all duration-300 ${!isFormValid
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-yellow-500 hover:to-yellow-700"
              }`}
            disabled={!isFormValid}
            aria-label="Lähetä tilaus"
          >
            Maksa tilaus
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
