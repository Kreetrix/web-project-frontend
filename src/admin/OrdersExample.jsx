export const orders = [
    {
        id: '12345',
        type: 'Nouto',
        time: '15.11.2023 18:30',
        customer: {
            name: 'Matti Meikäläinen',
            phone: '+358 40 123 4567',
            avatar: 'https://i.pravatar.cc/150?img=5'
        },
        items: ['Classic Burger x2', 'Coca-Cola x1', 'Ranskalaiset x1'],
        total: '24,90€',
        deliveryFee: null,
        status: 'new'
    },
    {
        id: '12344',
        type: 'Kotiinkuljetus',
        time: '15.11.2023 18:15',
        customer: {
            name: 'Liisa Järvinen',
            phone: '+358 40 765 4321',
            avatar: 'https://i.pravatar.cc/150?img=6'
        },
        items: ['Chicken Burger x1', 'Veggie Burger x1', 'Fanta x2'],
        total: '32,50€',
        deliveryFee: '3,50€',
        status: 'preparing'
    }
];
