import React from "react";
import { Trash2, Edit, Star } from "lucide-react";

const ProductItem = ({ product, onEdit, onDelete, onSetProductOfDay }) => {
    return (
        <div
            className={`flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 ${product.isProductOfTheDay ? 'border-2 border-yellow-400' : 'border-gray-200'
                }`}
        >
            <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg">{product.name}</p>
                    {product.isProductOfTheDay && (
                        <Star className="text-yellow-500" size={18} fill="currentColor" />
                    )}
                </div>
                <p className="text-gray-600">${product.price}</p>
                {product.description && (
                    <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                )}
                <div className="flex gap-2 mt-2">
                    {product.isFeatured && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                            Featured
                        </span>
                    )}
                    {product.isProductOfTheDay && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                            Product of the Day
                        </span>
                    )}
                </div>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    aria-label="Edit product"
                >
                    <Edit size={20} />
                </button>
                {!product.isProductOfTheDay && (
                    <button
                        onClick={() => onSetProductOfDay(product)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                        aria-label="Set as product of the day"
                        title="Set as Product of the Day"
                    >
                        <Star size={20} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(product)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    aria-label="Delete product"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProductItem;