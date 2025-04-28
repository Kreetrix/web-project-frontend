import React, { useEffect, useState } from "react";


export default function AboutUs() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initialMode = savedTheme ? savedTheme === "dark" : prefersDark;
        setDarkMode(initialMode);

        if (initialMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.removeAttribute("data-theme");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");

        document.documentElement.classList.toggle("dark", newMode);
        if (newMode) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <main className="px-6 py-12 max-w-5xl mx-auto space-y-12 relative">
                <button
                    onClick={toggleDarkMode}
                    className="absolute top-5 right-5 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {darkMode ? "🌞" : "🌑"}
                </button>

                {/* Historia */}
                <section>
                    <h2 className="text-3xl font-semibold mb-4">Meidän tarina</h2>
                    <p className="text-lg leading-relaxed">
                        Burger Palace perustettiin vuonna 2020 intohimosta laadukkaisiin burgereihin. Alussa olimme pieni katukeittiö, mutta rakkautemme ruokaan ja asiakaspalveluun kasvatti meistä yhden Suomen rakastetuimmista burgeribrändeistä.
                        Tänään meillä on ravintoloita ympäri Suomea, ja jokainen niistä tarjoaa käsintehtyjä, mehukkaita burgereita parhaista raaka-aineista.
                    </p>
                </section>

                {/* Yhteystiedot */}
                <section>
                    <h2 className="text-3xl font-semibold mb-6">Yhteystiedot</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                city: "Helsinki – Keskusta",
                                address: "Keskuskatu 5, 00100 Helsinki",
                                email: "helsinki@burgerpalace.fi",
                                phone: "040 111 2222",
                            },
                            {
                                city: "Tampere",
                                address: "Hämeenkatu 20, 33100 Tampere",
                                email: "tampere@burgerpalace.fi",
                                phone: "040 333 4444",
                            },
                            {
                                city: "Turku",
                                address: "Yliopistonkatu 10, 20100 Turku",
                                email: "turku@burgerpalace.fi",
                                phone: "040 555 6666",
                            },
                            {
                                city: "Oulu",
                                address: "Rotuaari 1, 90100 Oulu",
                                email: "oulu@burgerpalace.fi",
                                phone: "040 777 8888",
                            },
                        ].map((loc, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                            >
                                <h3 className="text-xl font-bold mb-1">{loc.city}</h3>
                                <p>{loc.address}</p>
                                <p className="mt-2">
                                    <strong>Sähköposti:</strong>{" "}
                                    <a
                                        className="text-yellow-700 dark:text-yellow-400 underline"
                                        href={`mailto:${loc.email}`}
                                    >
                                        {loc.email}
                                    </a>
                                    <br />
                                    <strong>Puhelin:</strong> {loc.phone}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Henkilöt */}
                <section>
                    <h2 className="text-3xl font-semibold mb-6">Avainhenkilöt</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Arto Mäkelä",
                                title: "Toimitusjohtaja (CEO)",
                                email: "arto@burgerpalace.fi",
                            },
                            {
                                name: "Sanna Laine",
                                title: "Ravintolapäällikkö",
                                email: "sanna@burgerpalace.fi",
                            },
                            {
                                name: "Jari Niemi",
                                title: "Markkinointijohtaja",
                                email: "jari@burgerpalace.fi",
                            },
                        ].map((person, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center"
                            >
                                <h4 className="text-xl font-bold">{person.name}</h4>
                                <p className="text-gray-600 dark:text-gray-300">{person.title}</p>
                                <p className="text-yellow-700 dark:text-yellow-400 mt-2">
                                    <a href={`mailto:${person.email}`} className="underline">
                                        {person.email}
                                    </a>
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
