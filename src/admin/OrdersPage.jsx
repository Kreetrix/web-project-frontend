import { useState } from 'react';
import OrderTable from './OrderTable';
import { orders as initialOrders } from './OrdersExample';

export default function OrdersPage() {

    const [orders, setOrders] = useState(initialOrders);


    const handleStatusChange = (id, newStatus) => {
        const updated = orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updated);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tilaukset</h1>
            <OrderTable orders={orders} onStatusChange={handleStatusChange} />
        </div>
    );
}
