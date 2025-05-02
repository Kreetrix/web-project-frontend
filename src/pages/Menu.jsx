import React, { useState, useEffect } from "react";
import TabComponent from "../components/Menu/TabComponent";
import MenuItemCard from "../components/Menu/MenuItemCard";
import { useCart } from "../contexts/CartContext";
import Text from "../components/locales/Text";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dailySpecials } = useCart();

  const categories = [
    "burger",
    "starters",
    "desserts",
    "drinks",
    "sets",
    "coupons",
    "vege",
    "salad",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/products");
        if (!response.ok) {
          throw new Error(`Failed to fetch menu data: ${response.status}`);
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const filteredItems = menuData.filter(
    (item) => item.category === selectedCategory
  );

  if (loading)
    return (
      <p className="text-center text-xl font-semibold">
        <Text id="app.loading"></Text>
      </p>
    );
  if (error)
    return (
      <p className="text-center text-xl font-semibold text-red-500">{error}</p>
    );

  return (
    <main className="container mx-auto px-4 min-h-screen">
      <TabComponent
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isSpecial = dailySpecials.some(
              (special) => special.id === item.ID
            );
            const discountedPrice = isSpecial
              ? (item.price * 0.85).toFixed(2)
              : null;

            return (
              <MenuItemCard
                key={item.ID}
                item={{
                  ...item,
                  discountedPrice,
                  isSpecial,
                }}
              />
            );
          })
        ) : (
          <p className="text-center text-lg font-medium col-span-full">
            No items found in this category.
          </p>
        )}
      </div>
    </main>
  );
};

export default Menu;
