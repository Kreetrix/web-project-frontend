import React, { useState } from 'react';
import TabComponent from '../components/Menu/TabComponent';
import MenuItemCard from '../components/Menu/MenuItemCard';

const Menu = () => {

    const menuData = [
        { id: 1, name: 'BBQ Burger', category: 'burgers', description: 'Naudanlihapihvi, cheddar, BBQ-kastike', price: '12,90€', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Mozzarella Sticks', category: 'starters', description: 'Friteerattu mozzarella, marinara-kastike', price: '6,90€', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Cheesecake', category: 'desserts', description: 'Classic vanilla cheesecake with berry compote', price: '7,50€', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Lemonade', category: 'drinks', description: 'Freshly squeezed lemonade', price: '3,50€', image: 'https://via.placeholder.com/150' },
    ];

    const categories = ['burgers', 'starters', 'desserts', 'drinks', 'sets', 'coupons', 'vege', 'salad'];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const filteredItems = menuData.filter(item => item.category === selectedCategory);
    return (
        <div className="container mx-auto p-4">
            <TabComponent
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="grid md:grid-cols-2 gap-6">
                {filteredItems.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
