const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Tervetuloa, Admin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Tuotteita</h2>
                    <p className="text-2xl">14 kpl</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Tilaukset</h2>
                    <p className="text-2xl">23 kpl</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Tänään myyty

                    </h2>
                    <p className="text-2xl">23 kpl</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Keskimääräinen tilaus



                    </h2>
                    <p className="text-2xl">23 kpl</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Tämän viikon myynti



                    </h2>
                    <p className="text-2xl">23 kpl</p>
                </div>



                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Suosituimmat tuotteet</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Classic Burger</span>
                                <span className="text-sm font-medium text-gray-700">42 kpl</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-yellow-600 h-2.5 rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Chicken Burger</span>
                                <span className="text-sm font-medium text-gray-700">28 kpl</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-yellow-600 h-2.5 rounded-full" ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Coca-Cola</span>
                                <span className="text-sm font-medium text-gray-700">35 kpl</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-yellow-600 h-2.5 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
