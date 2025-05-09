import { NavLink } from "react-router-dom";
import {
  Home,
  Utensils,
  ShoppingCart,
  LogIn,
  LogOut,
  Languages,
  MessageSquare,
  Info,
  User,
  Moon,
  Coffee,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useI18n } from "./I18nProvider";
import Text from "./locales/Text";

export default function Header() {
  const { setLocale, locale } = useI18n();
  const { cartItems, clearCart } = useCart();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { darkMode, toggleDarkMode } = useTheme();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  return (
    <header className="bg-yellow-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold cursor-pointer hover:scale-110 transition-all duration-300">
          <NavLink to="/">🍔 Burger Palace</NavLink>
        </h1>

        <nav className="ml-auto py-2">
          <div className="navbar-strip inline-flex">
            <ul className="flex items-center flex-wrap gap-4 mt-3 md:mt-0 text-sm font-medium">
              <li>
                <NavLink
                  to="/"
                  className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                >
                  <Home size={14} />
                  <Text id="app.header.home" />
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/menu"
                  className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                >
                  <Utensils size={14} />
                  <Text id="app.header.menu" />
                </NavLink>
              </li>

              <li>
                <div className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105">
                  {locale === "en" ? (
                    <button
                      className="display contents cursor-pointer"
                      onClick={() => setLocale("fi")}
                    >
                      <Languages size={14} /> <Text id="app.header.language" />{" "}
                      EN
                    </button>
                  ) : (
                    <button
                      className="display contents cursor-pointer"
                      onClick={() => setLocale("en")}
                    >
                      <Languages size={14} /> <Text id="app.header.language" />{" "}
                      FI
                    </button>
                  )}
                </div>
              </li>

              <li>
                {isLoggedIn ? (
                  <NavLink
                    to="/palaute"
                    className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageSquare size={14} />
                    <Text id="app.header.feedback" />
                  </NavLink>
                ) : (
                  <button
                    onClick={() =>
                      alert(
                        "Sinun täytyy kirjautua sisään lähettääksesi palautetta."
                      )
                    }
                    className="nav-button flex items-center gap-1 text-gray-400 cursor-not-allowed"
                    disabled
                  >
                    <MessageSquare size={14} />
                    <Text id="app.header.feedback" />
                  </button>
                )}
              </li>

              <li className="relative">
                <NavLink
                  to="/order"
                  className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingCart size={14} />
                  <Text id="app.header.cart" />
                </NavLink>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </li>

              <li>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                  >
                    <LogOut size={14} />
                    <Text id="app.header.logout" />
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                  >
                    <LogIn size={14} />
                    <Text id="app.header.login" />
                  </NavLink>
                )}
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                >
                  <Info size={14} />
                  <Text id="app.header.about" />
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  className="nav-button flex items-center gap-1 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
                >
                  <User size={14} />
                  <Text id="app.header.profile" />
                </NavLink>
              </li>

              <li>
                <button
                  onClick={toggleDarkMode}
                  className="ml-4 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  aria-label={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? (
                    <Coffee className="w-6 h-6 text-amber-600 stroke-[2.5]" />
                  ) : (
                    <Moon className="w-6 h-6 text-indigo-700 stroke-[2.5]" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
