import React, { useState } from "react";
import Text from "../components/locales/Text";
import { useTranslation } from "../components/I18nProvider";

const Palaute = () => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("product");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      rating,
      category,
      feedback,
    });
    setRating(0);
    setFeedback("");
    setFirstName("");
    setLastName("");
    alert("Palaute lähetetty! Kiitos!");
  };

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-amber-100 dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
      <div className="absolute -left-3 top-10 h-40 w-1 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full shadow-lg" />

      <div className="absolute -right-3 top-10 h-40 w-1 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full shadow-lg" />

      <div className="hidden md:block absolute -left-16 top-12 text-6xl">
        💬
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        <Text id="app.feedback.title" />
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2"
            >
              <Text id="app.feedback.name" /> *
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2"
            >
              <Text id="app.feedback.surname" /> *
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2"
            >
              <Text id="app.feedback.email" /> *
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2"
          >
            <Text id="app.feedback.topic" />
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
          >
            <option value="product">
              {t("app.feedback.dropdown.product")}
            </option>
            <option value="order">
              {t("app.feedback.dropdown.reservation")}
            </option>
            <option value="general">
              {t("app.feedback.dropdown.general")}
            </option>
            <option value="service">
              {t("app.feedback.dropdown.service")}
            </option>
          </select>
        </div>

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

        <div className="mb-6">
          <label
            htmlFor="feedback"
            className="block text-lg font-medium text-gray-700 dark:text-amber-200 mb-2"
          >
            <Text id="app.feedback.comment" />
          </label>
          <textarea
            id="feedback"
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
            placeholder={Text({
              id: "app.feedback.commentInfo",
              asString: true,
            })}
            value={feedback}
            onChange={handleFeedbackChange}
            rows="5"
          ></textarea>
        </div>

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
