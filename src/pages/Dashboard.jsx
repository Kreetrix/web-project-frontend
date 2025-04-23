export default function Dashboard() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-green-600 mb-8">Tervetuloa takaisin! Poika! 🍟</h1>

            <section className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">Profiili</h2>

                <div className="profile-pic text-center mb-4">
                    <img
                        src="/images/icon.png"
                        alt="Profiilikuva"
                        className="w-[150px] h-[150px] rounded-full object-cover mx-auto"
                    />
                </div>

                <form id="avatar-form" encType="multipart/form-data" className="mb-4">
                    <label htmlFor="avatar" className="block mb-1">Vaihda profiilikuva:</label>
                    <input type="file" id="avatar" name="avatar" accept="image/*" required className="block w-full mb-2" />
                    <button type="submit" className="button">Lähetä kuva</button>
                </form>

                <div className="profile-info mb-4">
                    <p><strong>Käyttäjätunnus:</strong> <span id="profile-username">Poika123</span></p>
                    <p><strong>Sähköposti:</strong> <span id="profile-email">poika@example.com</span></p>
                </div>

                <form id="update-profile-form" className="flex flex-col gap-3">
                    <input type="text" id="new-username" placeholder="Uusi käyttäjätunnus" className="input" />
                    <input type="email" id="new-email" placeholder="Uusi sähköposti" className="input" />
                    <input type="password" id="new-password" placeholder="Uusi salasana" className="input" />

                    <label htmlFor="Suosikkiravintola" className="text-sm">Suosikkiravintola</label>
                    <input
                        type="text"
                        id="Suosikkiravintola"
                        value="Ei suosikkia"
                        readOnly
                        className="bg-gray-200 text-gray-500 cursor-not-allowed px-3 py-2 rounded"
                    />

                    <button type="submit" className="button mt-4">Päivitä tiedot</button>
                </form>
            </section>
        </main>
    );
}
