import React, { useState } from 'react';

const Palaute = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [category, setCategory] = useState('product');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
            feedback
        });
        setRating(0);
        setFeedback('');
        setFirstName('');
        setLastName('');
        alert('Palaute lähetetty! Kiitos!');
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-500 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Palaute</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Etunimi *
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
                        <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Sukunimi *
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
                        <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Email *
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
                    <label htmlFor="category" className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Mitä asianne koskee:
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
                    >
                        <option value="product">Tuote</option>
                        <option value="order">Tilaus</option>
                        <option value="general">Yleistä</option>
                        <option value="service">Asiakaspalvelu</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Arvio:
                    </label>
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                type="button"
                                key={value}
                                className={`text-4xl transition-transform duration-200 transform hover:scale-110 ${rating >= value
                                    ? 'text-yellow-500'
                                    : 'text-gray-300 dark:text-gray-400'
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
                    <label htmlFor="feedback" className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Kommentti:
                    </label>
                    <textarea
                        id="feedback"
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
                        placeholder="Teidän kommentti..."
                        value={feedback}
                        onChange={handleFeedbackChange}
                        rows="5"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-gray-900 font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md"
                >
                    Lähetä palaute
                </button>
            </form>
        </div>
    );
};

export default Palaute;