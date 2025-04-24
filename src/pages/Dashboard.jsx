import { useState } from "react";
import ProfileTab from "../components/client-profile/ProfileTab";
import OrdersTab from "../components/client-profile/OrdersTab";
import FavoritesTab from "../components/client-profile/FavoritesTab";
import SettingsTab from "../components/client-profile/SettingsTab";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("profile");

    const renderTab = () => {
        switch (activeTab) {
            case "orders":
                return <OrdersTab />;
            case "favorites":
                return <FavoritesTab />;
            case "settings":
                return <SettingsTab />;
            case "profile":
            default:
                return <ProfileTab />;
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-8 px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-6">Tervetuloa takaisin! 🍟</h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("profile")}
                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
                >
                    Omat tiedot
                </button>
                <button
                    onClick={() => setActiveTab("orders")}
                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
                >
                    Tilaukseni
                </button>
                <button
                    onClick={() => setActiveTab("favorites")}
                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
                >
                    Suosikit
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
                >
                    Asetukset
                </button>
            </div>

            <section className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">{renderTab()}</section>
        </main>
    );
}