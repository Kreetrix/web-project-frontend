import { Link } from 'react-router-dom';
import { useTheme } from "../contexts/ThemeContext";
import { Coffee, Moon } from "lucide-react";

const Sidebar = () => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <aside className="w-64 bg-[#2c3e50] shadow-lg">

            <div className="p-6 text-2xl font-bold text-white">🍔 BurgerAdmin</div>
            <nav className="flex flex-col gap-4 p-4">
                <Link to="/admin/admindashboard" className="nav-button">Dashboard</Link>
                <Link to="/admin/products" className="nav-button">Tuotteet</Link>
                <Link to="/admin/orders" className="nav-button">Tilaukset</Link>
                <Link to="/admin/feedbacks" className="nav-button">Feedbacks</Link>
                <Link to="/" className="bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700"
                >Logout</Link>
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
                        <Coffee className="w-6 h-6 text-amber-600 " />
                    ) : (
                        <Moon className="w-6 h-6 text-yellow-700 " />
                    )}
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
