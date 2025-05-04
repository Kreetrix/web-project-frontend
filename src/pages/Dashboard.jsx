import { useState } from "react";
import ProfileTab from "../components/client-profile/ProfileTab";
import OrdersTab from "../components/client-profile/OrdersTab";
import FavoritesTab from "../components/client-profile/FavoritesTab";
import Text from "../components/locales/Text";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;
      case "favorites":
        return <FavoritesTab />;
      case "profile":
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        <Text id="app.dashboard.welcome" /> 🍟
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
        >
          <Text id="app.dashboard.info" />
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
        >
          <Text id="app.dashboard.orders" />
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
        >
          <Text id="app.dashboard.favorite" />
        </button>
      </div>

      <section className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {renderTab()}
      </section>
    </div>
  );
}
