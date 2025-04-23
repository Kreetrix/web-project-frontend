import { useState } from "react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("profile");

    const renderTab = () => {
        switch (activeTab) {
            case "orders":
                return <div>Sinulla ei ole vielä tilauksia 🍔</div>;
            case "favorites":
                return <div>Ei suosikkeja vielä ❤️</div>;
            case "settings":
                return <div>⚙️ Asetukset tulevat pian...</div>;
            case "profile":
            default:
                return (
                    <>
                        <div className="profile-info mb-4">
                            <p><strong>Käyttäjätunnus:</strong> <span>Poika123</span></p>
                            <p><strong>Sähköposti:</strong> <span>poika@example.com</span></p>
                        </div>

                        <form className="flex flex-col gap-6">
                            <input type="text" placeholder="Uusi käyttäjätunnus" className="input" />
                            <input type="email" placeholder="Uusi sähköposti" className="input" />
                            <input type="password" placeholder="Uusi salasana" className="input" />

                            <label className="text-sm">Suosikkiravintola</label>
                            <input
                                type="text"
                                value="Ei suosikkia"
                                readOnly
                                className="bg-gray-200 text-gray-500 cursor-not-allowed px-3 py-2 rounded"
                            />

                            <button type="submit" className="button mt-4">Päivitä tiedot</button>
                        </form>
                    </>
                );
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-green-600 mb-6">Tervetuloa takaisin! 🍟</h1>

            <div className="flex gap-4 mb-6">
                <button onClick={() => setActiveTab("profile")} className="button">Omat tiedot</button>
                <button onClick={() => setActiveTab("orders")} className="button">Tilaukseni</button>
                <button onClick={() => setActiveTab("favorites")} className="button">Suosikit</button>
                <button onClick={() => setActiveTab("settings")} className="button">Asetukset</button>
            </div>

            <section className="w-full max-w-md bg-white p-6 rounded shadow">{renderTab()}</section>
        </main>
    );
}
