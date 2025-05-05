import React, { useEffect, useState } from "react";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("User is not authenticated.");
        }

        // Fetch users
        const usersResponse = await fetch(
          "http://localhost:3000/api/v1/account/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users.");
        }

        const users = await usersResponse.json();

        // Fetch reviews
        const reviewsResponse = await fetch(
          "http://localhost:3000/api/v1/reviews",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch reviews.");
        }

        const reviews = await reviewsResponse.json();

        // Fetch orders
        const ordersResponse = await fetch(
          "http://localhost:3000/api/v1/order/orders",
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

        // Map reviews to orders and users by reservation_id and user_id
        const feedbacksWithDetails = reviews.map((review) => {
          const order = orders.find((o) => o.ID === review.reservation_id);
          const user = order ? users.find((u) => u.ID === order.user_id) : null;

          return {
            ...review,
            date: order
              ? new Date(order.timestamp).toLocaleDateString()
              : "Unknown Date",
            time: order
              ? new Date(order.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Unknown Time",
            username: user
              ? `${user.username} (User ID: ${order.user_id})`
              : `User ID: ${order?.user_id || "Unknown"}`,
          };
        });

        setFeedbacks(feedbacksWithDetails);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
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
    <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Asiakaspalautteet
      </h2>

      <div className="space-y-6">
        {feedbacks.map((f, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-500 dark:text-gray-300">
                <span>{f.date}</span> at <span>{f.time}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {f.username}
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i <= f.stars ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-800 dark:text-white">{f.opinion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedbacks;
