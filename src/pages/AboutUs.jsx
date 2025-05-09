import React from "react";
import Text from "../components/locales/Text";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-600 dark:text-gray-100">
      <main className="px-6 py-12 max-w-5xl mx-auto space-y-12 relative">
        {/* Historia */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">
            <Text id="app.about.title" />
          </h2>
          <p className="text-lg leading-relaxed">
            <Text id="app.about.info1" />
          </p>
        </section>

        {/* Yhteystiedot */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">
            <Text id="app.about.contacts" />
          </h2>
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
                  <strong>
                    <Text id="app.about.email" />
                  </strong>{" "}
                  <a
                    className="text-yellow-700 dark:text-yellow-400 underline"
                    href={`mailto:${loc.email}`}
                  >
                    {loc.email}
                  </a>
                  <br />
                  <strong>
                    <Text id="app.about.phone" />
                  </strong>{" "}
                  {loc.phone}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Henkilöt */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">
            <Text id="app.about.key" />
          </h2>
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
                <p className="text-gray-600 dark:text-gray-300">
                  {person.title}
                </p>
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
