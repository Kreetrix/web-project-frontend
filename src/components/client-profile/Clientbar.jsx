import { Link } from 'react-router-dom';

const Clientbar = () => {
    return (
        <>
            <div className="p-6 text-2xl font-bold text-white">🍔 BurgerAdmin</div>
            <nav className="flex flex-col gap-4 p-4">
                <Link to="/client-profile/admindashboard" className="nav-button">Dashboard</Link>
                <Link to="/client-profile/products" className="nav-button">Tuotteet</Link>
                <Link to="/client-profile/orders" className="nav-button">Tilaukset</Link>
                <Link to="/client-profile/feedbacks" className="nav-button">Feedbacks</Link>
            </nav>
        </>
    );
};

export default Clientbar;
