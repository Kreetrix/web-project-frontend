const API = import.meta.env.VITE_API;
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();

        return products.map(product => ({
            id: product.ID,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image || null,
            allergies: product.allergies?.map(allergy => allergy.name) || [],
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export default fetchProducts;