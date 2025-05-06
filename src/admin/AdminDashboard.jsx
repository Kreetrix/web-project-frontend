import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    todaySold: 0,
    avgOrderValue: 0,
    weeklySales: 0,
  });
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("User is not authenticated.");
        }

        // Fetch products
        const productsResponse = await fetch(
          `${API}/products`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products.");
        }
        const products = await productsResponse.json();

        // Fetch orders
        const ordersResponse = await fetch(
          `${API}/order/orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const orders = await ordersResponse.json();

        // Fetch reservation products
        const reservationProductsResponse = await fetch(
          `${API}/order/reservation-products`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!reservationProductsResponse.ok) {
          throw new Error("Failed to fetch reservation products.");
        }
        const reservationProducts = await reservationProductsResponse.json();

        // Get current date and start of week
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday as start of week

        // Helper function to check if a date string is today
        const isToday = (dateString) => {
          const date = new Date(dateString);
          return date >= today;
        };

        // Helper function to check if a date string is in this week
        const isThisWeek = (dateString) => {
          const date = new Date(dateString);
          return date >= startOfWeek;
        };

        // Calculate today's sold items count (from both orders and reservations)
        const todaySoldCount =
          orders
            .filter((order) => isToday(order.timestamp))
            .reduce((sum, order) => {
              // Sum product quantities if order.products exists
              if (order.products && order.products.length > 0) {
                return (
                  sum + order.products.reduce((pSum, p) => pSum + p.quantity, 0)
                );
              }
              // If no products array, assume at least 1 product per order
              return sum + 1;
            }, 0) +
          reservationProducts
            .filter((rp) => isToday(rp.timestamp))
            .reduce((sum, rp) => sum + rp.quantity, 0);

        // Calculate weekly sales (from both orders and reservations)
        const weeklySalesValue =
          orders
            .filter((order) => isThisWeek(order.timestamp))
            .reduce((sum, order) => sum + order.price, 0) +
          reservationProducts
            .filter((rp) => isThisWeek(rp.timestamp))
            .reduce(
              (sum, rp) =>
                sum +
                rp.quantity *
                  (products.find((p) => p.ID === rp.product_id)?.price || 0),
              0
            );

        // Calculate average order value
        const avgOrderValue =
          orders.length > 0
            ? orders.reduce((sum, order) => sum + order.price, 0) /
              orders.length
            : 0;

        setStats({
          productsCount: products.length,
          ordersCount: orders.length,
          todaySold: todaySoldCount, // Number of products sold today
          avgOrderValue,
          weeklySales: weeklySalesValue, // Monetary value of weekly sales
        });

        // Aggregate product quantities
        const productQuantities = {};
        reservationProducts.forEach((item) => {
          if (productQuantities[item.product_id]) {
            productQuantities[item.product_id] += item.quantity;
          } else {
            productQuantities[item.product_id] = item.quantity;
          }
        });

        // Include products from orders (if they exist)
        orders.forEach((order) => {
          if (order.products && order.products.length > 0) {
            order.products.forEach((product) => {
              if (productQuantities[product.id]) {
                productQuantities[product.id] += product.quantity;
              } else {
                productQuantities[product.id] = product.quantity;
              }
            });
          }
        });

        // Map product IDs to names and counts
        const topProductsData = Object.entries(productQuantities)
          .map(([productId, count]) => {
            const product = products.find(
              (p) => p.ID === parseInt(productId, 10)
            );
            return product ? { name: product.name, count } : null;
          })
          .filter((item) => item !== null)
          .sort((a, b) => b.count - a.count);

        setTopProducts(topProductsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
    <div className="p-6 dark:bg-gray-600">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tervetuloa, Admin! 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Tuotteita", value: `${stats.productsCount} kpl` },
          { title: "Tilaukset", value: `${stats.ordersCount} kpl` },
          { title: "Tänään myyty", value: `${stats.todaySold} kpl` },
          {
            title: "Keskimääräinen tilaus",
            value: `${stats.avgOrderValue.toFixed(2)} €`,
          },
          {
            title: "Tämän viikon myynti",
            value: `${stats.weeklySales.toFixed(2)} €`,
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-gray-400 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {card.title}
            </h2>
            <p className="text-2xl text-yellow-800 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Suosituimmat tuotteet */}
      <div className="bg-white dark:bg-gray-400 p-6 rounded-lg shadow">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          📈 Suosituimmat tuotteet
        </h4>
        <div className="space-y-4">
          {topProducts.length > 0 ? (
            <>
              {(() => {
                const totalOrdered = topProducts.reduce(
                  (sum, item) => sum + item.count,
                  0
                );
                return topProducts.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {item.count} kpl (
                        {((item.count / totalOrdered) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-600 h-2.5 rounded-full"
                        style={{
                          width: `${(item.count / totalOrdered) * 100}%`,
                          maxWidth: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                ));
              })()}
            </>
          ) : (
            <p className="text-gray-500">Ei tilastoja saatavilla</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
