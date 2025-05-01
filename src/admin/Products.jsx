import React, { useEffect, useState } from "react";
import { Trash2, Edit, Plus, Save, Star, Award, Key } from "lucide-react";
import ModalDelete from "../components/modals/modalDelete";
import { useProducts } from "../hooks/apiHooks";


// TODO     add api calls here to fetch, add, edit, and delete products

// here is just  random exapmle code 
// also i think to split this file 

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
    const {deleteProduct, updateProduct} = useProducts();


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
            console.error("Error updatingz product:", error);
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

    const addNewProduct = () => {
        if (!newProduct.name || !newProduct.price) {
            alert("Please fill all required fields!");
            return;
        }

        const newProductWithId = {
            ...newProduct,
            id: Date.now(),
        };

        // If new product is set as product of the day, update all products
        if (newProductWithId.isProductOfTheDay) {
            setProducts([...products.map(p => ({ ...p, isProductOfTheDay: false })), newProductWithId]);
            setProductOfTheDay(newProductWithId);
        } else {
            setProducts([...products, newProductWithId]);
        }

        setNewProduct({ name: "", price: "", description: "", isProductOfTheDay: false });
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
                <div className="mb-6 p-4 border-2 border-yellow-400 rounded-lg bg-yellow-50 flex items-center">
                    <Award className="text-yellow-600 mr-3" size={24} />
                    <div>
                        <h3 className="font-bold text-lg text-yellow-800">Product of the Day</h3>
                        <p className="text-yellow-700">
                            {productOfTheDay.name} - ${productOfTheDay.price}
                        </p>
                    </div>
                </div>
            )}

            {/* Add New Product Form */}
            <div className="mb-6 p-4 border border-green-300 rounded-lg bg-green-50">
                <h3 className="text-xl font-semibold mb-3">Add New Product</h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleNewProductChange}
                        placeholder="Product name*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="text"
                        name="price"
                        value={newProduct.price}
                        onChange={handleNewProductChange}
                        placeholder="Price*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleNewProductChange}
                        placeholder="Product description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="3"
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isProductOfTheDay"
                            id="newProductOfTheDay"
                            checked={newProduct.isProductOfTheDay}
                            onChange={handleNewProductChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="newProductOfTheDay" className="ml-2 block text-sm text-gray-700">
                            Set as Product of the Day
                        </label>
                    </div>
                    <button
                        onClick={addNewProduct}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        <Plus size={20} /> Add Product
                    </button>
                </div>
            </div>

            {/* Edit Product Form */}
            {editingProduct && (
                <div className="mb-6 p-4 border border-blue-300 rounded-lg bg-blue-50">
                    <h3 className="text-xl font-semibold  mb-3">Edit Product</h3>
                    <div className="space-y-3">
                    {console.log(editingProduct)}
                        <input
                            type="text"
                            name="name"
                            value={editingProduct.name}
                            onChange={handleEditChange}
                            placeholder="Product name*"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            name="price"
                            value={editingProduct.price}
                            onChange={handleEditChange}
                            placeholder="Price*"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            name="allergies"
                            value={editingProduct.allergies || ''}
                            onChange={handleEditChange}
                            placeholder="allergies"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            name="description"
                            value={editingProduct.description || ''}
                            onChange={handleEditChange}
                            placeholder="Product description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isProductOfTheDay"
                                id="editProductOfTheDay"
                                checked={editingProduct.isProductOfTheDay || false}
                                onChange={handleEditChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="editProductOfTheDay" className="ml-2 block text-sm text-gray-700">
                                Set as Product of the Day
                            </label>
                        </div>
                        <button
                            onClick={saveEditedProduct}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            <Save size={20} /> Save Changes
                        </button>
                    </div>
                </div>
            )}

            {/* Products List */}
            <div className="space-y-4 grid [grid-template-areas:'header_header_header'_'footer_footer_footer']">
                {products.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No products found</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.ID}
                            className={`flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 ${product.isProductOfTheDay ? 'border-2 border-yellow-400' : 'border-gray-200'
                                }`}
                        >
                            <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-lg">{product.name}</p>
                                    {product.isProductOfTheDay && (
                                        <Star className="text-yellow-500" size={18} fill="currentColor" />
                                    )}
                                </div>
                                <p className="text-gray-600">${product.price}</p>
                                {product.description && (
                                    <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                                )}
                                <div className="flex gap-2 mt-2">
                                    {product.isFeatured && (
                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                            Featured
                                        </span>
                                    )}
                                    {product.isProductOfTheDay && (
                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                                            Product of the Day
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => startEditProduct(product)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                    aria-label="Edit product"
                                >
                                    <Edit size={20} />
                                </button>
                                {!product.isProductOfTheDay && (
                                    <button
                                        onClick={() => setAsProductOfTheDay(product)}
                                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                                        aria-label="Set as product of the day"
                                        title="Set as Product of the Day"
                                    >
                                        <Star size={20} />
                                    </button>
                                )}
                                <button
                                    // onClick={() => deleteProduct(product.ID)}
                                    onClick={() => {
                                        setOneProduct(product);
                                        setDeleteModal(true);
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                    aria-label="Delete product"
                                >
                                    <Trash2 size={20} />
                                </button>


                                
                            </div>
                        </div>
                    ))
                )}
                {deleteModal && <ModalDelete item={oneProduct} setSelectedItem={setDeleteModal} onConfirm={handleDeleteProduct}/>}
            </div>
        </div>
    );
}