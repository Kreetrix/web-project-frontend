import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchProducts from "../data/fetchProducts";
import { useCart } from "../contexts/CartContext";
import Text from "../components/locales/Text";
import { useTranslation } from "../components/I18nProvider";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, dailySpecials } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const products = await fetchProducts();
      const foundProduct = products.find((item) => item.id === Number(id));
      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  //TODO: Make this a component
  if (loading) {
    return (
      <div className="text-center text-xl font-semibold text-gray-500">
        <Text id="app.loading"></Text>
      </div>
    );
  }

  //TODO: Make this a component
  if (!product) {
    return (
      <div className="text-center text-xl font-semibold text-red-500">
        <Text id="app.product.empty" />
      </div>
    );
  }

  const isSpecial = dailySpecials.products?.some(
    (special) => special.id === product.id
  );
  const discountedPrice = isSpecial ? (product.price * 0.85).toFixed(2) : null;

  const handleAddToCart = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // If no access token, prompt the user to log in
      const confirmLogin = window.confirm(t("app.menu.card.noToken"));
      if (confirmLogin) {
        navigate("/login"); // Redirect to the login page
      }
      return;
    }

    // Add the product to the cart if the user is logged in
    addToCart(product);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 space-y-6">
        <h1 className="text-5xl font-extrabold text-center text-yellow-700">
          {product.name}
        </h1>
        <div className="flex justify-center">
          <img
            src={product.image || '/placeholder-product.png'}
            alt={product.name}
            className="w-full max-w-xl h-auto max-h-96 object-contain rounded-xl shadow-lg mb-6"
            onError={(e) => {
              e.target.src = '/placeholder-product.png';
            }}
          />
        </div>

        <div className="border-t border-gray-300 pt-4">
          <p className="text-lg text-gray-700 text-center">
            {product.description}
          </p>
          {product.allergies && product.allergies.length > 0 && (
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-xl font-bold text-gray-800 text-center">
                <Text id="app.product.allergy" />
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-center">
                {product.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="border-t border-gray-300 pt-4">
          {isSpecial ? (
            <>
              <p className="text-gray-400 line-through text-center">
                {product.price.toFixed(2)}€
              </p>
              <p className="text-3xl font-bold text-red-600 text-center">
                {discountedPrice}€
              </p>
            </>
          ) : (
            <p className="text-3xl font-bold text-yellow-600 text-center">
              {product.price.toFixed(2)}€
            </p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            <Text id="app.menu.card.add" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
