import { useParams } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";



function ProductPage() {
    const { id } = useParams();
    const product = mockProducts.find((item) => item.id === Number(id));

    if (!product) return <div className="text-center text-xl font-semibold text-red-500">Tuotetta ei löytynyt.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Product Image */}
            <div className="flex justify-center">
                <img
                    src={product.imageUrl || 'https://unsplash.com/photos/close-up-photography-of-burger-with-patty-and-slice-cheese-F_xGk7V0Xbc'}
                    alt={product.name}
                    className="w-full rounded-xl shadow-xl object-cover"
                />
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-center text-yellow-700">{product.name}</h1>

            {/* Product Description */}
            <p className="mt-2 text-lg text-gray-700 text-center">{product.description}</p>

            {/* Product Price */}
            <p className="mt-4 text-2xl font-semibold text-yellow-600 text-center">{product.price}</p>

            {/* Ingredients */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Ainesosat:</h2>
                <ul className="list-disc ml-6 text-gray-700 mt-2">
                    {product.ingredients.map((item) => (
                        <li key={item} className="mt-1">{item}</li>
                    ))}
                </ul>
            </div>

            {/* Allergens */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-red-700">Allergeenit:</h2>
                <ul className="list-disc ml-6 text-gray-700 mt-2">
                    {product.allergens.map((a) => (
                        <li key={a} className="mt-1">{a}</li>
                    ))}
                </ul>
            </div>

            {/* Reviews */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Arvostelut:</h2>
                {product.reviews.length ? (
                    <ul className="space-y-4 mt-4">
                        {product.reviews.map((r, i) => (
                            <li key={i} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                                <p className="font-semibold text-lg">{r.userName}</p>
                                <p className="text-yellow-600 text-sm">⭐ {r.rating}/5</p>
                                <p className="text-sm text-gray-600 mt-2">{r.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">Ei arvosteluja vielä.</p>
                )}
            </div>
        </div>
    );
}


export default ProductPage;