import React from "react";
import ProductItem from "./ProductItem.jsx";

const ProductList = ({ products, onEdit, onDelete, onSetProductOfDay }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No products found</p>
            ) : (
                products.map((product) => (
                    <ProductItem
                        key={product.ID || product._id}
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onSetProductOfDay={onSetProductOfDay}
                    />
                ))
            )}
        </div>
    );
};

export default ProductList;
