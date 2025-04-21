import React, { useState } from 'react';

const Palaute = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [category, setCategory] = useState('product');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRating(0);
        setFeedback('');
        alert('Palaute lähetetty!');
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Palaute</h2>

            <div className="mb-6">
                <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
                    Mitä asianne koskee :
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-200 ease-in-out"
                >
                    <option value="product">Tuote</option>
                    <option value="order">Tilaus</option>
                    <option value="general">Yleistä</option>
                    <option value="service">Asiakaspalvelu</option>
                </select>
            </div>

            <div className="mb-6 flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                        key={value}
                        className={`text-4xl transition-transform duration-200 transform hover:scale-110 ${rating >= value
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                            }`}
                        onClick={() => handleRatingChange(value)}
                    >
                        ★
                    </button>
                ))}
            </div>

            <textarea
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none mb-6 transition duration-200 ease-in-out"
                placeholder="Teidän kommentti..."
                value={feedback}
                onChange={handleFeedbackChange}
                rows="5"
            ></textarea>

            <button
                className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={handleSubmit}
            >
                Lähetä palaute
            </button>
        </div>
    );
};

export default Palaute;
