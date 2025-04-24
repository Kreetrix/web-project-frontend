export default function ProfileTab() {
    return (
        <div className="space-y-6">
            <div className="profile-info mb-4">
                <p><strong>Käyttäjätunnus:</strong> <span>Poika123</span></p>
                <p><strong>Sähköposti:</strong> <span>poika@example.com</span></p>
            </div>

            <form className="flex flex-col gap-6">
                <input
                    type="text"
                    placeholder="Uusi käyttäjätunnus"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="email"
                    placeholder="Uusi sähköposti"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="password"
                    placeholder="Uusi salasana"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                <label className="text-sm text-gray-700">Suosikkiravintola</label>
                <input
                    type="text"
                    value="Ei suosikkia"
                    readOnly
                    className="bg-gray-200 text-gray-500 cursor-not-allowed px-3 py-2 rounded-md"
                />

                <button
                    type="submit"
                    className="w-full mt-4 py-2 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
                >
                    Päivitä tiedot
                </button>
            </form>
        </div>
    );
}