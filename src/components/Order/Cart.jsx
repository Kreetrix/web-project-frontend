import { useCart } from "../../contexts/CartContext";
import { sendOrder } from "../../data/sendOrder";
import { useUser } from "../../hooks/apiHooks.js";
import Text from "../locales/Text.jsx";

const Cart = ({ isFormValid }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { getUser } = useUser();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrder = async () => {
    const userData = await getUser();

    const orderData = {
      user_id: userData.user.id,
      items: cartItems.map((item) => ({
        product_id: item.ID,
        quantity: item.quantity,
      })),
      price: parseFloat(calculateTotal()) + 5.9,
      status: "preparing",
    };
    console.log("Order data:", orderData);

    try {
      const response = await sendOrder(orderData);
      console.log("Order sent successfully:", response);
      alert("Tilaus lähetetty onnistuneesti!");
      clearCart();
    } catch (error) {
      console.error("Error sending order:", error);
      alert("Tilausta ei voitu lähettää. Yritä uudelleen.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-600 rounded-xl shadow-md p-6 sticky top-4 max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        <Text id="app.cart.cart" />
      </h3>

      <div
        className="space-y-4 mb-6"
        role="list"
        aria-label="Ostoskori tuotteet"
      >
        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            <Text id="app.cart.empty" />
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              role="listitem"
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {item.quantity} <Text id="app.cart.piece" />
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
                  <Text id="app.cart.delete" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300">
              <Text id="app.cart.products" />
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {calculateTotal()}€
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-300">
              <Text id="app.cart.delivery" />
            </span>
            <span className="text-gray-800 dark:text-gray-200">5.90€</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-800 dark:text-gray-200">
              <Text id="app.cart.total" />
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {(parseFloat(calculateTotal()) + 5.9).toFixed(2)}€
            </span>
          </div>

          <button
            onClick={handleOrder}
            className={`w-full bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-500 text-white font-bold py-3 px-4 rounded-lg mt-6 shadow-md transition-all duration-300 ${
              !isFormValid
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-yellow-500 hover:to-yellow-700"
            }`}
            disabled={!isFormValid}
            aria-label="Lähetä tilaus"
          >
            <Text id="app.cart.pay" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
