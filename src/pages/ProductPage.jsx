import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchProducts from "../data/fetchProducts";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const products = await fetchProducts();
      console.log(products);
      const foundProduct = products.find((item) => item.id === Number(id));
      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold text-gray-500">
        Ladataan tuotetta...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-xl font-semibold text-red-500">
        Tuotetta ei löytynyt.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Product Name */}
      <h1 className="text-4xl font-bold text-center text-yellow-700">
        {product.name}
      </h1>

      {/* Product Description */}
      <p className="mt-2 text-lg text-gray-700 text-center">
        {product.description}
      </p>

      {/* Product Price */}
      <p className="mt-4 text-2xl font-semibold text-yellow-600 text-center">
        {product.price}€
      </p>
    </div>
  );
}

export default ProductPage;
