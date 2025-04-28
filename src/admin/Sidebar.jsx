import { Link } from 'react-router-dom';
import { useTheme } from "../contexts/ThemeContext";

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
                    className="theme-toggle ml-4 p-2 rounded-full bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500"
                    aria-label="chenge theme"
                >
                    {darkMode ? '🌞' : '🌑'}
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
