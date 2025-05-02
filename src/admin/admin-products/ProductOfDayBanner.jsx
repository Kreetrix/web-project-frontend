import React from "react";
import { Award } from "lucide-react";

const ProductOfDayBanner = ({ product }) => {
    return (
        <div className="mb-6 p-4 border-2 border-yellow-400 rounded-lg bg-yellow-50 flex items-center">
            <Award className="text-yellow-600 mr-3" size={24} />
            <div>
                <h3 className="font-bold text-lg text-yellow-800">Product of the Day</h3>
                <p className="text-yellow-700">
                    {product.name} - ${product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductOfDayBanner;