import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-yellow-700 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-2xl font-bold">🍔 Burger Palace</h1>

                <nav className="flex justify-center mt-4">

                    <div className="navbar-strip">

                        <ul className="flex flex-wrap gap-4 mt-3 md:mt-0 text-sm font-medium">
                            <li>
                                <NavLink to="/" className="nav-button">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/menu" className="nav-button">
                                    Menu
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/" className="nav-button">
                                    Kieli
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/palaute" className="nav-button">
                                    Palaute
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order" className="nav-button">
                                    Ostoskori
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/kirjaudu" className="nav-button">
                                    Kirjaudu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className="nav-button">
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
