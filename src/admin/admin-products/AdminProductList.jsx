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

            // Update product of the day if needed
            if (editingProduct.isProductOfTheDay) {
                setProductOfTheDay(editingProduct);
                // Ensure only one product of the day exists
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

            // If new product is set as product of the day, update all products
            if (newProduct.isProductOfTheDay) {
                const updatedProducts = products.map(p => ({ ...p, isProductOfTheDay: false }));
                setProducts([...updatedProducts, newProductWithId]);
                setProductOfTheDay(newProductWithId);
            } else {
                setProducts([...products, newProductWithId]);
            }

            setNewProduct({ name: "", price: "", description: "", isProductOfTheDay: false });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const setAsProductOfTheDay = (product) => {
        // Update all products to remove product of the day flag
        const updatedProducts = products.map(p => ({
            ...p,
            isProductOfTheDay: false
        }));

        // Set the selected product as product of the day
        const productToUpdate = updatedProducts.find(p =>
            p.ID === product.ID || p._id === product._id
        );

        if (productToUpdate) {
            productToUpdate.isProductOfTheDay = true;
            setProductOfTheDay(productToUpdate);
            setProducts(updatedProducts);

            // If editing this product, update the editing form
            if (editingProduct &&
                (editingProduct.ID === product.ID || editingProduct._id === product._id)) {
                setEditingProduct({ ...productToUpdate });
            }
        }
    };

    if (loading) return <div className="text-center py-8">Loading products...</div>;

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Management</h2>

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

            {/* Products List */}
            <ProductList
                products={products}
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