import React from 'react';

const TabComponent = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="flex gap-4 justify-center mb-6">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default TabComponent;