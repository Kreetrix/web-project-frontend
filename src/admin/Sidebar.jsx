import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg">
            <div className="p-6 text-2xl font-bold text-yellow-600">🍔 BurgerAdmin</div>
            <nav className="flex flex-col gap-4 p-4">
                <Link to="/admin/admindashboard" className="hover:text-yellow-600">Dashboard</Link>
                <Link to="/admin/products" className="hover:text-yellow-600">Tuotteet</Link>
                <Link to="/admin/orders" className="hover:text-yellow-600">Tilaukset</Link>
                <Link to="/admin/feedbacks" className="hover:text-yellow-600">Feedbacks</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
