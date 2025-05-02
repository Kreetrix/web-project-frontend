import Text from "../locales/Text";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => (
  <div className="bg-white dark:bg-gray-600 rounded-xl shadow-md p-6">
    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
      <Text id="app.order.payment.method" />
    </h3>

    <div className="space-y-4">
      {/* Cash on delivery */}
      <div
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
          paymentMethod === "cash"
            ? "border-yellow-500 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-600"
            : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
        onClick={() => setPaymentMethod("cash")}
      >
        <input
          type="radio"
          id="cash"
          name="payment"
          value="cash"
          checked={paymentMethod === "cash"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 dark:ring-yellow-400"
        />
        <div className="ml-3">
          <label
            htmlFor="cash"
            className="block text-sm font-medium text-gray-800 dark:text-gray-100"
          >
            <Text id="app.order.payment.cash" />
          </label>
          <p className="text-xs text-gray-800 dark:text-gray-100 mt-1">
            <Text id="app.order.payment.cashInfo" />
          </p>
        </div>
      </div>

      {/* Credit card */}
      <div
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
          paymentMethod === "card"
            ? "border-yellow-500 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-600"
            : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
        onClick={() => setPaymentMethod("card")}
      >
        <input
          type="radio"
          id="card"
          name="payment"
          value="card"
          checked={paymentMethod === "card"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 dark:ring-yellow-400"
        />
        <div className="ml-3">
          <label
            htmlFor="card"
            className="block text-sm font-medium text-gray-800 dark:text-gray-100"
          >
            <Text id="app.order.payment.card" />
          </label>
          <p className="text-xs text-gray-800 dark:text-gray-100 mt-1">
            <Text id="app.order.payment.cardInfo" />
          </p>
        </div>
      </div>

      {/* MobilePay */}
      <div
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
          paymentMethod === "mobilepay"
            ? "border-yellow-500 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-600"
            : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
        onClick={() => setPaymentMethod("mobilepay")}
      >
        <input
          type="radio"
          id="mobilepay"
          name="payment"
          value="mobilepay"
          checked={paymentMethod === "mobilepay"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 dark:ring-yellow-400"
        />
        <div className="ml-3">
          <label
            htmlFor="mobilepay"
            className="block text-sm font-medium text-gray-800 dark:text-gray-100"
          >
            MobilePay
          </label>
          <p className="text-xs text-gray-800 dark:text-gray-100 mt-1">
            <Text id="app.order.payment.mobilepayInfo" />
          </p>
        </div>
      </div>

      {/* Bank transfer */}
      <div
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
          paymentMethod === "bank"
            ? "border-yellow-500 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-600"
            : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
        onClick={() => setPaymentMethod("bank")}
      >
        <input
          type="radio"
          id="bank"
          name="payment"
          value="bank"
          checked={paymentMethod === "bank"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 dark:ring-yellow-400"
        />
        <div className="ml-3">
          <label
            htmlFor="bank"
            className="block text-sm font-medium text-gray-800 dark:text-gray-100"
          >
            <Text id="app.order.payment.bank" />
          </label>
          <p className="text-xs text-gray-800 dark:text-gray-100 mt-1">
            <Text id="app.order.payment.bankInfo" />
          </p>
        </div>
      </div>
    </div>

    {paymentMethod === "card" && (
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-200">
          <Text id="app.order.payment.cardInput" />
        </h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="(KK/VV)"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              placeholder="CVV"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>
    )}
  </div>
);

export default PaymentMethod;
