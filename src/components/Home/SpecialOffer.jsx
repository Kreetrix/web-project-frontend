import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import fetchProducts from "../../data/fetchProducts";

const SpecialOffer = () => {
  const [specialOffers, setSpecialOffers] = useState([]);
  const { dailySpecials, setDailySpecials } = useCart();

  useEffect(() => {
    const getSpecialOffers = async () => {
      if (dailySpecials.length > 0) {
        // If daily specials are already set, use them
        setSpecialOffers(dailySpecials);
        return;
      }

      const products = await fetchProducts();

      // Use the current day as a seed for consistent randomization
      const today = new Date().toISOString().split("T")[0];
      const seed = today
        .split("-")
        .reduce((acc, val) => acc + parseInt(val), 0);

      const seededRandom = (seed) => {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };

      // Shuffle products using the seeded random function
      const shuffledProducts = [...products].sort(
        () => seededRandom(seed) - 0.5
      );

      // Select the first two products as special offers
      const specials = shuffledProducts.slice(0, 2);
      setSpecialOffers(specials);
      setDailySpecials(specials); // Save specials to context and local storage
    };

    getSpecialOffers();
  }, [dailySpecials, setDailySpecials]);


  return (
    <section className="p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600 dark:text-yellow-500">
        Tämän päivän erikoisuudet
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {specialOffers.map((product) => {
          const discountedPrice = (product.price * 0.85).toFixed(2);
          return (
            <div
              key={product.id}
              className="relative border-2 border-yellow-600 dark:border-yellow-300 rounded-lg p-4 flex custom-card
              hover:border-yellow-700 dark:hover:border-yellow-400 transition-colors duration-300
              shadow-md hover:shadow-lg group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-700"></div>

              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              />

              <div className="ml-4 flex-1">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-amber-900 dark:text-amber-200 mb-2 drop-shadow-sm">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 dark:text-gray-400 line-through">{product.price.toFixed(2)}€</p>
                  <p className="text-green-700 dark:text-green-300 font-bold">{discountedPrice}€</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SpecialOffer;