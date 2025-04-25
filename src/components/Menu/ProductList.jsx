import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Virhe haettaessa tuotteita:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Ladataan tuotteita...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
                <MenuItemCard key={item.id} item={item} />
            ))}
        </div>
    );
}
