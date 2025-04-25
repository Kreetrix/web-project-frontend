import React from 'react';
import { Link } from 'react-router-dom';

const MenuItemCard = ({ item }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md" />
            <div className="ml-4">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-red-600 font-semibold mt-2">{item.price}€</p>
            </div>
        </div>
    );
};

export default MenuItemCard;
