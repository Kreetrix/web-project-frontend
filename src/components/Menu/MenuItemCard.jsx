import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Text from "../locales/Text";
import { useTranslation } from "../I18nProvider";

export default function MenuItemCard({ item }) {
  const { addToCart, dailySpecials } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = localStorage.getItem("userLanguage");

  console.log(lang === "fi" ? item.name : item.name_fi);

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
          src={item.imageUrl || "/placeholder.png"}
          alt={lang === "fi" ? item.name : item.name_fi}
          className="w-36 h-36 object-cover rounded-full shadow-md mb-4 border-4 border-gray-100 dark:border-gray-700"
        />
        <h3 className="font-bold text-xl text-gray-800 dark:text-white">
          {lang === "fi" ? item.name : item.name_fi}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
          {lang === "fi" ? item.description : item.description_fi}
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
