import { useState } from 'react';
import OrderTable from './admin-orders/OrderTable';
import { orders as initialOrders } from './admin-orders/OrdersExample';

export default function OrdersPage() {

    const [orders, setOrders] = useState(initialOrders);


    const handleStatusChange = (id, newStatus) => {
        const updated = orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updated);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-600  ">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Tilaukset</h1>
            <OrderTable orders={orders} onStatusChange={handleStatusChange} />
        </div>
    );
}
