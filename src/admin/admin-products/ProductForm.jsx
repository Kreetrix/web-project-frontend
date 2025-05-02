import React from "react";
import { Plus, Save } from "lucide-react";

const ProductForm = ({ product, onChange, onSubmit, isNew }) => {
    const categories = ["burger", "starters", "desserts", "drinks", "sets", "vege", "salad"];

    return (
        <div className={`mb-6 p-4 border rounded-lg ${isNew ? 'border-green-300 bg-green-50' : 'border-blue-300 bg-blue-50'}`}>
            <h3 className="text-xl font-semibold mb-3">
                {isNew ? "Add New Product" : "Edit Product"}
            </h3>
            <div className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={onChange}
                    placeholder="Product name*"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
                    required
                />
                <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={onChange}
                    placeholder="Price*"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
                    required
                />

                {isNew && (
                    <select
                        name="category"
                        value={product.category || ""}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                )}

                {!isNew && (
                    <textarea
                        name="allergies"
                        value={product.allergies || ''}
                        onChange={onChange}
                        placeholder="Allergies"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <textarea
                    name="description"
                    value={product.description || ''}
                    onChange={onChange}
                    placeholder="Product description"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
                    rows="3"
                />

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isProductOfTheDay"
                        id={isNew ? "newProductOfTheDay" : "editProductOfTheDay"}
                        checked={product.isProductOfTheDay || false}
                        onChange={onChange}
                        className={`h-4 w-4 focus:ring-${isNew ? 'green' : 'blue'}-500 border-gray-300 rounded ${isNew ? 'text-green-600' : 'text-blue-600'}`}
                    />
                    <label htmlFor={isNew ? "newProductOfTheDay" : "editProductOfTheDay"} className="ml-2 block text-sm text-gray-700">
                        Set as Product of the Day
                    </label>
                </div>

                <button
                    onClick={onSubmit}
                    className={`flex items-center gap-2 ${isNew ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md transition-colors`}
                >
                    {isNew ? (
                        <>
                            <Plus size={20} /> Add Product
                        </>
                    ) : (
                        <>
                            <Save size={20} /> Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductForm;