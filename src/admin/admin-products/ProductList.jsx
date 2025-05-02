import React from "react";
import ProductItem from "./ProductItem.jsx";

const ProductList = ({ products, onEdit, onDelete, onSetProductOfDay }) => {
    return (
        <div className="space-y-4 grid [grid-template-areas:'header_header_header'_'footer_footer_footer']">
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