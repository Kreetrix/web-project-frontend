import { useEffect, useState } from "react";
import fetchProducts from "../../data/fetchProducts";

const SpecialOffer = () => {
  const [specialOffers, setSpecialOffers] = useState([]);

  useEffect(() => {
    const getSpecialOffers = async () => {
      const products = await fetchProducts();

      const productsWithDiscount = products.map(product => ({
        ...product,
        discountedPrice: product.price * 0.85
      }));

      // Use the current day as a seed for consistent randomization
      const today = new Date().toISOString().split("T")[0];
      const seed = today
        .split("-")
        .reduce((acc, val) => acc + parseInt(val), 0); // Sum of year, month, day

      // Seeded random function
      const seededRandom = (seed) => {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };

      // Shuffle products using the seeded random function
      const shuffledProducts = [...productsWithDiscount].sort(
        () => seededRandom(seed) - 0.5
      );

      // Select the first two products as special offers
      setSpecialOffers(shuffledProducts.slice(0, 2));
    };

    getSpecialOffers();
  }, []);

  if (specialOffers.length === 0) {
    return (
      <section className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
          Tämän päivän erikoisuudet
        </h2>
        <p className="text-center text-gray-500">
          Ladataan erikoistarjouksia...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
        Tämän päivän erikoisuudet
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {specialOffers.map((product) => (
          <div
            key={product.id}
            className="border-2 border-yellow-200 rounded-lg p-4 flex custom-card"
          >
            <img
              src={product.imageUrl || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="ml-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-400 line-through">{product.price.toFixed(2)}€</p>
              <p className="text-red-600 font-bold">{product.discountedPrice.toFixed(2)}€</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffer;
