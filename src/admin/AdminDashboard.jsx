const AdminDashboard = () => {
  //   const [loading, setLoading] = useState(true);

  return (
    <div className="p-6 dark:bg-gray-600" >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tervetuloa, Admin! 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Tuotteita", value: "14 kpl" },
          { title: "Tilaukset", value: "23 kpl" },
          { title: "Tänään myyty", value: "17 kpl" },
          { title: "Keskimääräinen tilaus", value: "21,30 €" },
          { title: "Tämän viikon myynti", value: "450,00 €" },
        ].map((card, i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-400 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              {card.title}
            </h2>
            <p className="text-2xl text-yellow-800 mt-2">{card.value}</p>
          </div>
        ))}

        {/* Tuote päivälle */}
        <div className="p-6 bg-yellow-200 border border-yellow-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            🔥 Päivän tuote
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src="https://source.unsplash.com/80x80/?burger"
              alt="Burger"
              className="w-16 h-16 rounded-full object-cover shadow"
            />
            <div>
              <p className="text-lg font-bold text-yellow-900">
                BBQ Bacon Burger
              </p>
              <p className="text-sm text-yellow-800">-20% tänään</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suosituimmat tuotteet */}
      <div className="bg-white  dark:bg-gray-400 p-6 rounded-lg shadow">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          📈 Suosituimmat tuotteet
        </h4>
        <div className="space-y-4">
          {[
            { name: "Classic Burger", count: 42 },
            { name: "Chicken Burger", count: 28 },
            { name: "Coca-Cola", count: 35 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {item.count} kpl
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-600 h-2.5 rounded-full"
                  style={{ width: `${item.count}px`, maxWidth: "100%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
