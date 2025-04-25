import React from 'react';

const TabComponent = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="flex gap-6 justify-center mb-5">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out 
                        ${selectedCategory === category
                            ? 'bg-yellow-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-200 text-gray-800 hover:bg-yellow-200 hover:text-yellow-700'
                        } 
                            ${category === 'vege' ? 'bg-green-500 text-white border-4' : ''}
                    `}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default TabComponent;
