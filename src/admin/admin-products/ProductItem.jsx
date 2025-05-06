import React from "react";
import { Trash2, Edit, Star } from "lucide-react";

const ProductItem = ({ product, onEdit, onDelete, onSetProductOfDay }) => {
    const getImageUrl = () => {
        if (!product.image) return "https://placehold.co/150x150?text=No+Image";
        return product.image.startsWith('http')
            ? product.image
            : `${window.location.origin}${product.image}`;
    };

    return (
        <div
            className={`flex flex-col justify-between h-full
                p-4 border rounded-lg
                hover:bg-gray-50 dark:hover:bg-gray-800
                ${product.isProductOfTheDay
                    ? 'border-2 border-yellow-500'
                    : 'border-gray-300 dark:border-gray-600'}
                bg-white dark:bg-gray-800
                min-h-[200px]
            `}
        >
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16">
                    <img
                        src={getImageUrl()}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                        onError={(e) => {
                            e.target.src = "/placeholder-product.png";
                        }}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-lg truncate">{product.name}</p>
                        {product.isProductOfTheDay && (
                            <Star className="text-yellow-500 shrink-0" size={18} fill="currentColor" />
                        )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 truncate">${product.price}</p>
                    {product.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 truncate">
                            {product.description}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {product.isFeatured && (
                            <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 dark:bg-green-800 dark:text-green-100 text-green-800 rounded truncate">
                                Featured
                            </span>
                        )}
                        {product.isProductOfTheDay && (
                            <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-100 text-yellow-800 rounded truncate">
                                Product of the Day
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Edit product"
                >
                    <Edit size={20} />
                </button>
                {!product.isProductOfTheDay && (
                    <button
                        onClick={() => onSetProductOfDay(product)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-700 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        aria-label="Set as product of the day"
                        title="Set as Product of the Day"
                    >
                        <Star size={20} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(product)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Delete product"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProductItem
