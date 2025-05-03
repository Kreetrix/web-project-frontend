import React, { useEffect, useState } from "react";
import { Award } from "lucide-react";
import ProductOfDayBanner from "./ProductOfDayBanner";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import ModalDelete from "../../components/modals/ModalDelete";
import { useProducts } from "../../hooks/apiHooks";

export default function AdminProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        isProductOfTheDay: false
    });
    const [productOfTheDay, setProductOfTheDay] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [oneProduct, setOneProduct] = useState(null);
    const { deleteProduct, updateProduct, addProduct } = useProducts();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // pagination

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                // Find and set current product of the day
                const currentProductOfTheDay = data.find(product => product.isProductOfTheDay);
                setProductOfTheDay(currentProductOfTheDay);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleDeleteProduct = async (product) => {
        try {
            await deleteProduct(product);

            const updatedProducts = products.filter(p => p.ID !== product.ID);
            setProducts(updatedProducts);

            if (productOfTheDay && productOfTheDay.ID === product.ID) {
                setProductOfTheDay(null);
            }

            setDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const startEditProduct = (product) => {
        setEditingProduct({ ...product });
    };

    const saveEditedProduct = async () => {
        try {
            await updateProduct(editingProduct);

            const updatedProducts = products.map(p =>
                p.ID === editingProduct.ID ? editingProduct : p
            );
            setProducts(updatedProducts);

            if (editingProduct.isProductOfTheDay) {
                setProductOfTheDay(editingProduct);
                setProducts(updatedProducts.map(p => ({
                    ...p,
                    isProductOfTheDay: p.ID === editingProduct.ID || p._id === editingProduct._id
                })));
            } else if (productOfTheDay &&
                (productOfTheDay.ID === editingProduct.ID || productOfTheDay._id === editingProduct._id)) {
                setProductOfTheDay(null);
            }

        } catch (error) {
            console.error("Error updating product:", error);
        }

        setEditingProduct(null);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleNewProductChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const addNewProduct = async () => {
        if (!newProduct.name || !newProduct.price) {
            alert("Please fill all required fields!");
            return;
        }

        try {
            await addProduct(newProduct);

            const newProductWithId = {
                ...newProduct,
                id: Date.now(),
            };

            if (newProduct.isProductOfTheDay) {
                const updatedProducts = products.map(p => ({ ...p, isProductOfTheDay: false }));
                setProducts([...updatedProducts, newProductWithId]);
                setProductOfTheDay(newProductWithId);
            } else {
                setProducts([...products, newProductWithId]);
            }

            setNewProduct({ name: "", price: "", description: "", description_en: "", name_en: "", isProductOfTheDay: false });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const setAsProductOfTheDay = (product) => {
        const updatedProducts = products.map(p => ({
            ...p,
            isProductOfTheDay: false
        }));

        const productToUpdate = updatedProducts.find(p =>
            p.ID === product.ID || p._id === product._id
        );

        if (productToUpdate) {
            productToUpdate.isProductOfTheDay = true;
            setProductOfTheDay(productToUpdate);
            setProducts(updatedProducts);

            if (editingProduct &&
                (editingProduct.ID === product.ID || editingProduct._id === product._id)) {
                setEditingProduct({ ...productToUpdate });
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) return <div className="text-center py-8">Loading products...</div>;

    return (
        <div className="container mx-auto p-4 max-w-6xl dark:bg-gray-800 dark:text-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Product Management</h2>

            {/* Product of the Day Banner */}
            {productOfTheDay && (
                <ProductOfDayBanner product={productOfTheDay} />
            )}

            {/* Add New Product Form */}
            <ProductForm
                product={newProduct}
                onChange={handleNewProductChange}
                onSubmit={addNewProduct}
                isNew={true}
            />

            {/* Edit Product Form */}
            {editingProduct && (
                <ProductForm
                    product={editingProduct}
                    onChange={handleEditChange}
                    onSubmit={saveEditedProduct}
                    isNew={false}
                />
            )}

            <div className="flex justify-center items-center mt-6 mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 text-sm font-semibold ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'} rounded-md hover:bg-blue-100`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Products List */}
            <ProductList
                products={currentProducts}
                onEdit={startEditProduct}
                onDelete={(product) => {
                    setOneProduct(product);
                    setDeleteModal(true);
                }}
                onSetProductOfDay={setAsProductOfTheDay}
            />

            {deleteModal && (
                <ModalDelete
                    item={oneProduct}
                    setSelectedItem={setDeleteModal}
                    onConfirm={handleDeleteProduct}
                />
            )}
        </div>
    );
}
