

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => (

    <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Maksutiedot</h3>

        <div className="space-y-4">
            <div className="flex items-center">

                <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="..."
                />
                <label htmlFor="cash" className="text-gray-700">Käteisellä toimituksen yhteydessä</label>

            </div>
            <div className="flex items-center">

                <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="..."
                />
                <label htmlFor="card" className="text-gray-700">Kortti online</label>

            </div>
        </div>
    </div >
)

export default PaymentMethod;