import { useState } from "react";
import { Trash2, Edit, Plus } from "lucide-react";

const AdminMenu = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Burgers", price: "5€", isFeatured: false },
        { id: 2, name: "Fries", price: "2€", isFeatured: false },
        { id: 3, name: "Salad", price: "3€", isFeatured: true },
    ]);

    const [newProduct, setNewProduct] = useState({ name: "", price: "", isFeatured: false });

    const addProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setNewProduct({ name: "", price: "", isFeatured: false });
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const editProduct = (id) => {
        const product = products.find(p => p.id === id);
        setNewProduct(product);
        deleteProduct(id);
    };

    const toggleFeatured = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, isFeatured: !product.isFeatured } : product
        ));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu sisällön muokkaaminen</h2>

            <div className="mb-6">
                <div className="flex gap-4">
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded"
                        placeholder="Tuotteen nimi"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded"
                        placeholder="Hinta"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <button
                        onClick={addProduct}
                        className="bg-yellow-600 text-white p-2 rounded"
                    >
                        <Plus size={20} /> Lisää tuote
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tuotteet</h3>
                <div className="space-y-4">
                    {products.map((product) => (
                        <div key={product.id} className="flex justify-between items-center p-4 border border-gray-300 rounded">
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p>{product.price}</p>
                                {product.isFeatured && <span className="text-green-500 font-semibold">Tuote päivän valinta</span>}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => editProduct(product.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    <Edit size={20} />
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button
                                    onClick={() => toggleFeatured(product.id)}
                                    className="text-yellow-500 hover:underline"
                                >
                                    {product.isFeatured ? "Poista päivän valinta" : "Aseta päivän valinta"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
