import { Scroll } from 'lucide-react';

export default function OrdersTab() {

    const currentOrder = {  // This would typically be fetched from an API          
        id: "#12345",
        items: ["Burger", "Ranskalaiset", "Cola"],
        status: "Valmistelussa", // "Käsittelyssä" / "Toimitettu"
        total: "15,90€",
    };                                                  /* TODO - add context */



    const orderHistory = [
        { id: "#12234", date: "20.04.2025", total: "22,50€", status: "Toimitettu" },
        { id: "#12112", date: "15.04.2025", total: "18,00€", status: "Toimitettu" },
    ];

    return (
        <div className="space-y-8 p-4">
            <div>
                <h2 className="text-2xl font-bold text-center text-yellow-600 mb-4">
                    Avoin tilaus 🍔
                </h2>

                {currentOrder ? (
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <p><strong>Tilausnumero:</strong> {currentOrder.id}</p>
                        <p><strong>Tuotteet:</strong> {currentOrder.items.join(", ")}</p>
                        <p><strong>Tila:</strong> {currentOrder.status}</p>
                        <p><strong>Yhteensä:</strong> {currentOrder.total}</p>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Ei avoimia tilauksia.</div>
                )}
            </div>

            <div>
                <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-600 mb-4">
                    Historia <Scroll />
                </h2>

                {orderHistory.length > 0 ? (
                    <div className="space-y-4">
                        {orderHistory.map((order) => (
                            <div
                                key={order.id}
                                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm hover:bg-gray-200 transition-all"
                            >
                                <div>
                                    <p className="font-semibold">{order.id}</p>
                                    <p className="text-sm text-gray-500">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{order.total}</p>
                                    <p className="text-sm text-green-600">{order.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Ei aikaisempia tilauksia.</div>
                )}
            </div>
        </div>
    );
}
