import { Scroll } from 'lucide-react';

export default function OrdersTab() {
    const currentOrder = {
        id: "#12345",
        items: ["Burger", "Ranskalaiset", "Cola"],
        status: "Valmistelussa",
        total: 15.90,
    };

    const orderHistory = [
        { id: "#12234", date: "20.04.2025", total: 22.50, status: "Toimitettu" },
        { id: "#12112", date: "15.04.2025", total: 18.00, status: "Toimitettu" },
    ];

    const formatCurrency = (amount) => {
        return amount.toFixed(2).replace('.', ',') + '€';
    };

    return (
        <div className="space-y-8 p-4 bg-white dark:bg-gray-600">
            <section>
                <h2 className="text-2xl font-bold text-center text-yellow-600 dark:text-yellow-400 mb-4">
                    Avoin tilaus 🍔
                </h2>

                {currentOrder ? (
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md space-y-4">
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Tilausnumero:</strong> {currentOrder.id}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Tuotteet:</strong> {currentOrder.items.join(", ")}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Tila:</strong> <span className="capitalize">{currentOrder.status}</span>
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Yhteensä:</strong> {formatCurrency(currentOrder.total)}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Ei avoimia tilauksia.
                    </p>
                )}
            </section>

            <section>
                <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                    Historia <Scroll className="w-5 h-5" />
                </h2>

                {orderHistory.length > 0 ? (
                    <ul className="space-y-4">
                        {orderHistory.map((order) => (
                            <li
                                key={order.id}
                                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{order.id}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {formatCurrency(order.total)}
                                    </p>
                                    <p
                                        className={`text-sm ${order.status === "Toimitettu"
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-yellow-600 dark:text-yellow-400"
                                            }`}
                                    >
                                        {order.status}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Ei aikaisempia tilauksia.
                    </p>
                )}
            </section>
        </div>
    );
}