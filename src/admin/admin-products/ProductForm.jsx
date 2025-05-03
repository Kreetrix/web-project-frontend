import React from "react";
import { Plus, Save } from "lucide-react";

const ProductForm = ({ product, onChange, onSubmit, isNew }) => {
    const categories = ["burger", "starters", "desserts", "drinks", "sets", "vege", "salad"];

    return (
        <div className={`mb-6 p-4 border rounded-lg 
            ${isNew
                ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-950'
                : 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-950'}
        `}>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {isNew ? "Add New Product" : "Edit Product"}
            </h3>

            <div className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={onChange}
                    placeholder="Product name fi*"
                    className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                        border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 
                        ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}
                    `}
                    required
                />

                <input
                    type="text"
                    name="name_en"
                    value={product.name_en}
                    onChange={onChange}
                    placeholder="Product name en*"
                    className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                        border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 
                        ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}
                    `}
                    required
                />

                <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={onChange}
                    placeholder="Price*"
                    className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                        border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 
                        ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}
                    `}
                    required
                />

                {isNew && (
                    <>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={product.category || ""}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {!isNew && (
                    <textarea
                        name="allergies"
                        value={product.allergies || ''}
                        onChange={onChange}
                        placeholder="Allergies"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                            rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                            placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
                            focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <textarea
                    name="description"
                    value={product.description || ''}
                    onChange={onChange}
                    placeholder="Product description fi"
                    className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                        border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 
                        ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}
                    `}
                    rows="3"
                />

                <textarea
                    name="description_en"
                    value={product.description_en || ''}
                    onChange={onChange}
                    placeholder="Product description en"
                    className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                        border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 
                        ${isNew ? 'focus:ring-green-500' : 'focus:ring-blue-500'}
                    `}
                    rows="3"
                />

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isProductOfTheDay"
                        id={isNew ? "newProductOfTheDay" : "editProductOfTheDay"}
                        checked={product.isProductOfTheDay || false}
                        onChange={onChange}
                        className={`h-4 w-4 focus:ring-${isNew ? 'green' : 'blue'}-500 
                            border-gray-300 dark:border-gray-600 text-${isNew ? 'green' : 'blue'}-600 
                            dark:bg-gray-800 dark:text-${isNew ? 'green' : 'blue'}-400 rounded`}
                    />
                    <label
                        htmlFor={isNew ? "newProductOfTheDay" : "editProductOfTheDay"}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                        Set as Product of the Day
                    </label>
                </div>

                <button
                    onClick={onSubmit}
                    className={`flex items-center gap-2 
                        ${isNew
                            ? 'bg-green-700 hover:bg-green-800'
                            : 'bg-blue-600 hover:bg-blue-700'} 
                        text-white px-4 py-2 rounded-md transition-colors`}
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
