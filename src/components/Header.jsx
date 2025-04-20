import { NavLink } from "react-router-dom";
import { Home, Utensils, ShoppingCart, LogIn, Languages, MessageSquare, Info } from 'lucide-react';

export default function Header() {
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
                                <NavLink to="/menu" className="nav-button flex items-center gap-1">
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
                                <NavLink to="/palaute" className="nav-button flex items-center gap-1">
                                    <MessageSquare size={14} />
                                    Palaute
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order" className="nav-button flex items-center gap-1">
                                    <ShoppingCart size={14} />
                                    Ostoskori
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" className="nav-button flex items-center gap-1">
                                    <LogIn size={14} />
                                    Kirjaudu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="nav-button flex items-center gap-1">
                                    <Info size={14} />
                                    About Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        </header>
    );
}
