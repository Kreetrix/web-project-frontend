import { useEffect, useState } from "react";
import fetchProducts from "../../data/fetchProducts";

const SpecialOffer = () => {
  const [specialOffers, setSpecialOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    const getSpecialOffers = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();

        const productsWithDiscount = products.map(product => ({
          ...product,
          discountedPrice: product.price * 0.85
        }));

        const today = new Date().toISOString().split("T")[0];
        const seed = today.split("-").reduce((acc, val) => acc + parseInt(val), 0);

        const seededRandom = (seed) => {
          let x = Math.sin(seed) * 10000;
          return x - Math.floor(x);
        };

        const shuffledProducts = [...productsWithDiscount].sort(
          () => seededRandom(seed) - 0.5
        );

        setSpecialOffers(shuffledProducts.slice(0, 2));
      } catch (error) {
        console.error("Error fetching special offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSpecialOffers();
  }, []);

  return (
    <section className="p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600 dark:text-yellow-400">
        Tämän päivän erikoisuudet
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">
          Ladataan erikoistarjouksia...
        </p>
      ) : specialOffers.length === 0 ? (
        <p className="text-center text-gray-500">
          Ei erikoistarjouksia tänään
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {specialOffers.map((product) => (
            <div
              key={product.id}
              className="relative border-2 border-yellow-400 dark:border-yellow-500 rounded-lg p-4 flex custom-card
                        hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors duration-300
                        shadow-md hover:shadow-lg group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-400 dark:text-gray-500 line-through">{product.price.toFixed(2)}€</p>
                  <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                    {product.discountedPrice.toFixed(2)}€
                  </p>
                  <span className="ml-auto bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-semibold px-2 py-1 rounded-full">
                    -{Math.round((1 - product.discountedPrice / product.price) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SpecialOffer;