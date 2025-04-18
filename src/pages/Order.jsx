function Order() {
    return (
        <>
            <main class="container mx-auto px-4 py-8">
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="md:col-span-2">
                        <h2 class="text-3xl font-bold mb-6 text-yellow-600">Tee tilaus</h2>

                        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 class="text-xl font-bold mb-4">Toimitustiedot</h3>
                            <form>
                                <div class="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label class="block text-gray-700 mb-2">Etunimi</label>
                                        <input type="text"
                                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 mb-2">Sukunimi</label>
                                        <input type="text"
                                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-gray-700 mb-2">Osoite</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                                </div>

                                <div class="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label class="block text-gray-700 mb-2">Puhelin</label>
                                        <input type="tel"
                                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 mb-2">Toimitusaika</label>
                                        <select class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                                            <option>Mahdollisimman pian</option>
                                            <option>30 minuutin päästä</option>
                                            <option>1 tunnin päästä</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="bg-white rounded-xl shadow-md p-6">
                            <h3 class="text-xl font-bold mb-4">Maksutiedot</h3>
                            <div class="space-y-4">
                                <div class="flex items-center">
                                    <input type="radio" id="cash" name="payment" checked class="mr-2">
                                        <label for="cash" class="text-gray-700">Käteisellä toimituksen yhteydessä</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="radio" id="card" name="payment" class="mr-2">
                                        <label for="card" class="text-gray-700">Kortti online</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-md p-6 sticky top-4">
                        <h3 class="text-xl font-bold mb-4">Ostoskori</h3>

                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between border-b pb-2">
                                <div>
                                    <p class="font-medium">Classic Burger</p>
                                    <p class="text-sm text-gray-500">1 kpl</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium">9,90€</p>
                                    <button class="text-red-500 text-sm">Poista</button>
                                </div>
                            </div>

                            <div class="flex justify-between border-b pb-2">
                                <div>
                                    <p class="font-medium">Ranskalaiset</p>
                                    <p class="text-sm text-gray-500">2 kpl</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium">5,80€</p>
                                    <button class="text-red-500 text-sm">Poista</button>
                                </div>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <div class="flex justify-between mb-2">
                                <span>Tuotteet</span>
                                <span>15,70€</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Toimitus</span>
                                <span>5,00€</span>
                            </div>
                            <div class="flex justify-between font-bold text-lg mt-4">
                                <span>Yhteensä</span>
                                <span>20,70€</span>
                            </div>
                        </div>

                        <button class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg mt-6">
                            Maksa tilaus
                        </button>
                    </div>
                </div>
            </main>


        </>
    );
}

export default Order;
