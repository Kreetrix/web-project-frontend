const statusOptions = {
  preparing: "Valmistumassa",
  completed: "Valmis/Noudettu",
};

export default function OrderRow({ order, onStatusChange, users }) {
  // Find the username based on the user_id
  const user = users.find((u) => u.ID === order.user_id);
  const username = user ? user.username : "Tuntematon käyttäjä";

  return (
    <tr className="order-row" data-status={order.status}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        #{order.ID}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(order.timestamp).toLocaleString()}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {order.user_id ? (
          <>
            User ID: {order.user_id} <br />
            Username: {username}
          </>
        ) : (
          "Ei tietoja"
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {order.products && order.products.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {order.products.map((product) => (
              <span
                key={product.ID}
                className="bg-gray-100 px-2 py-1 rounded text-xs"
              >
                {product.name} x{product.quantity}
              </span>
            ))}
          </div>
        ) : (
            <div className="flex flex-wrap gap-1">
          <span className="text-gray-500 italic">Deleted products</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {order.price.toFixed(2)}€
      </td>
      <td className="px-6 py-4">
        <select
          className="status-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
          value={order.status}
          onChange={(e) => onStatusChange(order.ID, e.target.value)}
        >
          {Object.entries(statusOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-4 text-right text-sm space-x-2">
        <button
          className="text-yellow-600 hover:text-yellow-900"
          title="Muokkaa"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="text-blue-600 hover:text-blue-900"
          title="Lähetä ilmoitus"
        >
          <i className="fas fa-bell"></i>
        </button>
        <button className="text-red-600 hover:text-red-900" title="Poista">
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
