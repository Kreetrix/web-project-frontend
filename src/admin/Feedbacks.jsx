import React, { useState } from 'react';

const feedbacks = [
    {
        id: 1,
        category: 'product',
        rating: 5,
        comment: 'Burger oli uskomattoman hyvää!',
        date: '20.04.2025',
    },
    {
        id: 2,
        category: 'order',
        rating: 3,
        comment: 'Toimitus kesti liian kauan.',
        date: '19.04.2025',
    },
    {
        id: 3,
        category: 'service',
        rating: 4,
        comment: 'Ystävällinen asiakaspalvelu.',
        date: '18.04.2025',
    },
];

const AdminFeedbacks = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredFeedbacks =
        selectedCategory === 'all'
            ? feedbacks
            : feedbacks.filter((f) => f.category === selectedCategory);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Asiakaspalautteet</h2>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                >
                    <option value="all">Kaikki</option>
                    <option value="product">Tuote</option>
                    <option value="order">Tilaus</option>
                    <option value="service">Asiakaspalvelu</option>
                    <option value="general">Yleistä</option>
                </select>
            </div>

            <div className="space-y-4">
                {filteredFeedbacks.map((f) => (
                    <div
                        key={f.id}
                        className="border-b pb-4 last:border-none"
                    >
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Kategoria: {f.category}</span>
                            <span>{f.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span
                                    key={i}
                                    className={`text-lg ${i <= f.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-800">{f.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminFeedbacks;
