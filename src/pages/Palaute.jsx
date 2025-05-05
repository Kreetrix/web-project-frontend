import React, { useState, useEffect } from "react";
import Text from "../components/locales/Text";
import { useTranslation } from "../components/I18nProvider";
import { useOrders } from "../hooks/apiHooks";
import { useUser } from "../hooks/apiHooks";

const Palaute = () => {
  const { getOrders } = useOrders();
  const { getUser } = useUser();
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user, userOrders, allReviews] = await Promise.all([
          getUser(),
          getOrders(),
          fetch("http://localhost:3000/api/v1/reviews").then(res => res.json())
        ]);
        
        setUserData(user);
        setOrders(userOrders);
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Get orders with products that belong to the current user and don't have reviews
  const userOrders = userData?.user?.id
    ? orders.filter(order => {
        // Filter out orders without products
        if (!order.products || order.products.length === 0) return false;
        
        // Filter out orders that already have reviews
        return !reviews.some(review => review.reservation_id === order.ID);
      })
    : [];

  const handleOrderChange = (e) => {
    setSelectedOrder(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOrder || !feedback || rating === 0) {
      alert("Täytä kaikki kentät ennen palautteen lähettämistä.");
      return;
    }

    const reviewData = {
      reservation_id: parseInt(selectedOrder, 10),
      opinion: feedback,
      stars: rating,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      console.log("Review submitted successfully:", reviewData);
      alert("Palaute lähetetty onnistuneesti!");
      setSelectedOrder("");
      setFeedback("");
      setRating(0);
      
      // Refresh reviews after submission
      const updatedReviews = await fetch("http://localhost:3000/api/v1/reviews").then(res => res.json());
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Palauteen lähettäminen epäonnistui. Yritä uudelleen.");
    }
  };

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-amber-100 dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        <Text id="app.feedback.title" />
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Order Selector */}
        <div className="mb-6">
          <label
            htmlFor="order"
            className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2"
          >
            <Text id="app.feedback.selectOrder" />
          </label>
          <select
            id="order"
            value={selectedOrder}
            onChange={handleOrderChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
          >
            <option value="">{t("app.feedback.selectOrder")}</option>
            {userOrders.map((order) => (
              <option key={order.ID} value={order.ID}>
                {new Date(order.timestamp).toLocaleDateString()} -{" "}
                {order.status} -{" "}
                {order.products
                  .map(
                    (product) =>
                      `${product.price.toFixed(2)}€ (${product.quantity}x) ${
                        product.name
                      }`
                  )
                  .join(", ")}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Input */}
        <div className="mb-6">
          <label
            htmlFor="feedback"
            className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2"
          >
            <Text id="app.feedback.comment" />
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
            rows="5"
            placeholder={t("app.feedback.commentPlaceholder")}
          ></textarea>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2">
            <Text id="app.feedback.rating" />
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                type="button"
                key={value}
                className={`text-4xl transition-transform duration-200 transform hover:scale-110 ${
                  rating >= value
                    ? "text-yellow-500"
                    : "text-gray-300 dark:text-gray-400"
                }`}
                onClick={() => handleRatingChange(value)}
                aria-label={`Anna ${value} tähteä`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-gray-900 font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md"
        >
          <Text id="app.feedback.send" />
        </button>
      </form>
    </div>
  );
};

export default Palaute;