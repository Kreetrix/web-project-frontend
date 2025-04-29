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

export default function Header() {
<<<<<<< HEAD

  const { cartItems } = useCart();
=======
  const { cartItems, clearCart } = useCart();
>>>>>>> f9a9171f5a1f4bc5d5537c637f759e4164a53202
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { darkMode, toggleDarkMode } = useTheme();
  const { isLoggedIn, logout } = useAuth();

<<<<<<< HEAD
  const { darkMode, toggleDarkMode } = useTheme();

=======
  const handleLogout = () => {
    clearCart();
    logout();
  };
>>>>>>> f9a9171f5a1f4bc5d5537c637f759e4164a53202

  return (
    <header className="bg-yellow-700 text-white shadow-lg sticky top-0 z-50 ">
      <div className="container mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">🍔 Burger Palace</h1>

        <nav className="ml-auto py-2">
          <div className="navbar-strip inline-flex">
            <ul className="flex flex-wrap gap-4 mt-3 md:mt-0 text-sm font-medium">
              <li>
                <NavLink to="/" className="nav-button flex items-center gap-1">
                  <Home size={14} />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className="nav-button flex items-center gap-1"
                >
                  <Utensils size={14} />
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="nav-button flex items-center gap-1">
                  <Languages size={14} />
                  Kieli
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/palaute"
                  className="nav-button flex items-center gap-1"
                >
                  <MessageSquare size={14} />
                  Palaute
                </NavLink>
              </li>
              <li className="relative">
                <NavLink
                  to="/order"
                  className="nav-button flex items-center gap-1"
                >
                  <ShoppingCart size={14} />
                  Ostoskori
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
                    className="nav-button flex items-center gap-1"
                  >
                    <LogOut size={14} />
                    Kirjaudu ulos
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="nav-button flex items-center gap-1"
                  >
                    <LogIn size={14} />
                    Kirjaudu
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="nav-button flex items-center gap-1"
                >
                  <Info size={14} />
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className="nav-button flex items-center gap-1"
                >
                  <User size={14} />
                  Profile Test
                </NavLink>
              </li>
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="ml-4 p-2 rounded-full 
           bg-white/90 dark:bg-gray-900/90 
           backdrop-blur-sm
           border-2 border-gray-300 dark:border-gray-600
           shadow-lg hover:shadow-xl
           transition-all duration-200"
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
