const statusOptions = {
    new: 'Uusi tilaus',
    preparing: 'Valmistumassa',
    ready: 'Valmis',
    delivering: 'Toimitettavana',
    completed: 'Valmis/Noudettu',
    cancelled: 'Peruutettu'
};

export default function OrderRow({ order, onStatusChange }) {
    return (
        <tr className="order-row" data-status={order.status}>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                #{order.id}
                <span className="block text-xs text-gray-500">{order.type}</span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{order.time}</td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <img src={order.customer.avatar} alt="" className="h-10 w-10 rounded-full" />
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.phone}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
                <div className="flex flex-wrap gap-1">
                    {order.items.map((item, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">{item}</span>
                    ))}
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
                {order.total}
                {order.deliveryFee && (
                    <span className="block text-xs text-yellow-600">+{order.deliveryFee} toimitus</span>
                )}
            </td>
            <td className="px-6 py-4">
                <select
                    className="status-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                >
                    {Object.entries(statusOptions).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </td>
            <td className="px-6 py-4 text-right text-sm space-x-2">
                <button className="text-yellow-600 hover:text-yellow-900" title="Muokkaa">
                    <i className="fas fa-edit"></i>
                </button>
                <button className="text-blue-600 hover:text-blue-900" title="Lähetä ilmoitus">
                    <i className="fas fa-bell"></i>
                </button>
                <button className="text-red-600 hover:text-red-900" title="Poista">
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    );
}
