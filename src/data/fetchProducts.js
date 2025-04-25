export const fetchProducts = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/products");
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
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};
 export default fetchProducts;