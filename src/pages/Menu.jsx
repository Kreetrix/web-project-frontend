import React, { useState } from 'react';
import TabComponent from '../components/Menu/TabComponent';
import MenuItemCard from '../components/Menu/MenuItemCard';
import { Link } from 'react-router-dom';

const Menu = () => {

    const menuData = [
        { id: 1, name: 'BBQ Burger', category: 'burgers', description: 'Naudanlihapihvi, cheddar, BBQ-kastike', price: '12,90€', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1899&q=80' },
        { id: 2, name: 'Mozzarella Sticks', category: 'starters', description: 'Friteerattu mozzarella, marinara-kastike', price: '6,90€', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Cheesecake', category: 'desserts', description: 'Classic vanilla cheesecake with berry compote', price: '7,50€', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Lemonade', category: 'drinks', description: 'Freshly squeezed lemonade', price: '3,50€', image: 'https://via.placeholder.com/150' },
    ];

    const categories = ['burgers', 'starters', 'desserts', 'drinks', 'sets', 'coupons', 'vege', 'salad'];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const filteredItems = menuData.filter(item => item.category === selectedCategory);

    return (
        <main className="container mx-auto px-4  min-h-screen ">
            <TabComponent
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <div className="grid md:grid-cols-2 gap-6">
                {filteredItems.map(item => (
                    <Link to={`/product/${item.id}`} key={item.id}>
                        <MenuItemCard key={item.id} item={item} />
                    </Link>
                ))}
            </div>
        </main>

    );
};

export default Menu;
