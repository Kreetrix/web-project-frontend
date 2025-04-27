import { NavLink } from 'react-router-dom';

const Clientbar = () => {
    return (
        <>
            <div className="p-6 text-2xl font-bold text-white">🍔 BurgerAdmin</div>
            <nav className="flex flex-col gap-4 p-4">
                <NavLink to="/client-profile/admindashboard" className={({ isActive }) => isActive ? "nav-button-active" : "nav-button"}>Dashboard</NavLink>
                <NavLink to="/client-profile/products" className={({ isActive }) => isActive ? "nav-button-active" : "nav-button"}>Tuotteet</NavLink>
                <NavLink to="/client-profile/orders" className={({ isActive }) => isActive ? "nav-button-active" : "nav-button"}>Tilaukset</NavLink>
                <NavLink to="/client-profile/feedbacks" className={({ isActive }) => isActive ? "nav-button-active" : "nav-button"}>Feedbacks</NavLink>
            </nav>
        </>
    );
};

export default Clientbar;
