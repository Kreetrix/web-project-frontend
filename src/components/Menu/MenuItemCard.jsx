import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Text from "../locales/Text";
import { useI18n } from "../I18nProvider";
import { useState } from "react";

export default function MenuItemCard({ item }) {
  const { addToCart, dailySpecials } = useCart();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const { t, locale } = useI18n();

  const isSpecial =
    dailySpecials.products?.some((special) => special.id === item.ID) || false;

  const discountedPrice = isSpecial ? (item.price * 0.85).toFixed(2) : null;

  const handleAddToCart = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      const confirmLogin = window.confirm(t("app.menu.card.noToken"));
      if (confirmLogin) {
        navigate("/login");
      }
      return;
    }

    addToCart({
      ...item,
      price: isSpecial ? Number(discountedPrice) : item.price,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-500 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/product/${item.ID}`} className="block w-full">
        <img
          src={
            !imgError ? item.image || "/placeholder.png" : "/placeholder.png"
          }
          alt={locale === "en" ? item.name : item.name_fi}
          className="w-36 h-36 object-cover rounded-full shadow-md mb-4 border-4 border-gray-100 dark:border-gray-700"
          onError={(e) => {
            setImgError(true);
            e.target.onerror = null;
          }}
        />
        <h3 className="font-bold text-xl text-gray-800 dark:text-white">
          {locale === "en" ? item.name : item.name_fi}{" "}
          {/* Use locale from context */}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
          {locale === "en" ? item.description : item.description_fi}{" "}
          {/* Use locale from context */}
        </p>
        <div className="mt-3">
          {isSpecial ? (
            <>
              <p className="text-gray-400 line-through">
                {item.price?.toFixed(2)}€
              </p>
              <p className="text-rose-600 dark:text-rose-400 font-bold text-lg">
                {discountedPrice}€
              </p>
            </>
          ) : (
            <p className="text-rose-600 dark:text-rose-400 font-bold text-lg">
              {item.price?.toFixed(2)}€
            </p>
          )}
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
      >
        <Text id="app.menu.card.add" />
      </button>
    </div>
  );
}
