import OrderRow from './OrderRow';

export default function OrderTable({ orders, onStatusChange }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tilausnro</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aika</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asiakas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sisältö</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Summa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tila</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Toiminnot</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <OrderRow key={order.id} order={order} onStatusChange={onStatusChange} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
