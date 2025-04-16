const SpecialOffer = ({ title, lines }) => {
    return (
        <>
            <section class="bg-white p-8 rounded-xl shadow-lg">
                <h2 class="text-2xl font-bold mb-6 text-center text-yellow-600">Tämän päivän erikoisuudet</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="border-2 border-yellow-200 rounded-lg p-4 flex custom-card">
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
                            alt="Special Burger" class="w-32 h-32 object-cover rounded-lg">
                            <div class="ml-4">
                                <h3 class="font-bold text-lg">BBQ Special</h3>
                                <p class="text-gray-600 mb-2">200g naudanliha, cheddar, BBQ-kastike</p>
                                <p class="text-red-600 font-bold">12,90€</p>
                            </div>
                    </div>
                    <div class="border-2 border-yellow-200 rounded-lg p-4 flex custom-card">
                        <img src="https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=920&q=80"
                            alt="Veggie Burger" class="w-32 h-32 object-cover rounded-lg">
                            <div class="ml-4">
                                <h3 class="font-bold text-lg">Veggie Delight</h3>
                                <p class="text-gray-600 mb-2">Kasvispihvi, avokado, fetajuusto</p>
                                <p class="text-red-600 font-bold">10,90€</p>
                            </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SpecialOffer;