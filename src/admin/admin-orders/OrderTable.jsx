import React, { useEffect, useState, useCallback } from "react";
import OrderRow from "./OrderRow";

const API = import.meta.env.VITE_API;

export default function OrderTable({ onStatusChange }) {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchOrdersAndUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("User is not authenticated.");

      const [ordersRes, usersRes] = await Promise.all([
        fetch(`${API}/order/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/account/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!ordersRes.ok) throw new Error("Failed to fetch orders.");
      if (!usersRes.ok) throw new Error("Failed to fetch users.");

      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();

      setOrders(ordersData);
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrdersAndUsers();
  }, [fetchOrdersAndUsers]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${API}/order/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      if (newStatus === "completed") {
        alert("Tilaus merkitty valmiiksi!");
        await fetchOrdersAndUsers();
      } else {
        setOrders((prev) =>
          prev.map((order) =>
            order.ID === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Tilan muuttaminen epäonnistui. Yritä uudelleen.");
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500 dark:text-gray-300">Ladataan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-500 dark:text-red-400">Virhe: {error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tilaukset</h2>
        <button
          onClick={toggleSortOrder}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors text-gray-800 dark:text-gray-200"
        >
          {sortOrder === "newest" ? "Vanhimmat ensin" : "Uusimmat ensin"}
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Tilausnro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Aika
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Asiakas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Sisältö
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Summa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Tila
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Toiminnot
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedOrders.map((order) => (
            <OrderRow
              key={order.ID}
              order={order}
              users={users}
              onStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
