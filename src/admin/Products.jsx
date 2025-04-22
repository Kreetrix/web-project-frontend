const dummyProducts = [
    { id: 1, name: 'BBQ Burger', price: '12,90€' },
    { id: 2, name: 'Veggie Burger', price: '11,90€' },
];

const Products = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tuotteet</h1>
            <button className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                ➕ Lisää tuote
            </button>
            <ul className="space-y-4">
                {dummyProducts.map((p) => (
                    <li key={p.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-gray-600">{p.price}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Muokkaa</button>
                            <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">Poista</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
