import { NavLink } from "react-router-dom";
import {
  Home,
  Utensils,
  ShoppingCart,
  LogIn,
  Languages,
  MessageSquare,
  Info,
  User,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
                <NavLink
                  to="/login"
                  className="nav-button flex items-center gap-1"
                >
                  <LogIn size={14} />
                  Kirjaudu
                </NavLink>
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
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
