const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => (
    <div className="bg-white  dark:bg-gray-600  rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-white">Maksutapa</h3>

        <div className="space-y-4">
            {/* Cash on delivery */}
            <div
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "cash" ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setPaymentMethod("cash")}
            >
                <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-yellow-600 focus:ring-yellow-500"
                />
                <div className="ml-3">
                    <label htmlFor="cash" className="block text-sm font-medium text-gray-800 dark:text-gray-100">Käteisellä toimituksen yhteydessä</label>
                    <p className="text-xs text-gray-800 dark:text-gray-100 mt-1">Maksa kun tuotteet saapuvat perille</p>
                </div>
            </div>

            {/* Credit card */}
            <div
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "card" ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setPaymentMethod("card")}
            >
                <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-yellow-600 focus:ring-yellow-500"
                />
                <div className="ml-3">
                    <label htmlFor="card" className="block text-sm font-medium text-gray-800 dark:text-gray-100">Korttimaksu</label>
                    <p className="text-xs text-gray-800 dark:text-gray-100 mt-1">Visa, Mastercard, American Express</p>
                </div>
            </div>

            {/* MobilePay */}
            <div
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "mobilepay" ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setPaymentMethod("mobilepay")}
            >
                <input
                    type="radio"
                    id="mobilepay"
                    name="payment"
                    value="mobilepay"
                    checked={paymentMethod === "mobilepay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-yellow-600 focus:ring-yellow-500"
                />
                <div className="ml-3">
                    <label htmlFor="mobilepay" className="block text-sm font-medium text-gray-800 dark:text-gray-100">MobilePay</label>
                    <p className="text-xs  text-gray-800 dark:text-gray-100 mt-1">Maksa helposti puhelimellasi</p>
                </div>
            </div>

            {/* Bank transfer */}
            <div
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "bank" ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setPaymentMethod("bank")}
            >
                <input
                    type="radio"
                    id="bank"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-yellow-600 focus:ring-yellow-500"
                />
                <div className="ml-3">
                    <label htmlFor="bank" className="block text-sm font-medium text-gray-800 dark:text-gray-100">Pankkisiirto</label>
                    <p className="text-xs text-gray-800 dark:text-gray-100 mt-1">Tilisiirto  pankkitilille</p>
                </div>
            </div>
        </div>

        {paymentMethod === "card" && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-3 text-gray-700">Syötä korttitiedot</h4>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Kortin numero"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Voimassa (KK/VV)"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            type="text"
                            placeholder="CVV"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                </div>
            </div>
        )}
    </div>
);

export default PaymentMethod;