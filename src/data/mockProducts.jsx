// src/data/mockProducts.js

export const mockProducts = [
    {
        id: 1,
        name: "BBQ Burger",
        description: "Mehevä naudanlihapihvi, cheddar-juustoa ja savuinen BBQ-kastike.",
        price: "12,90€",
        imageUrl: "https://images.unsplash.com/photo-1601924638867-3ec3c3c3e2b8?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Naudanlihapihvi", "Cheddar", "BBQ-kastike", "Salaatti", "Tomaatti", "Sämpylä"],
        allergens: ["Gluteeni", "Maito", "Soija"],
        reviews: [
            { userName: "Matti", rating: 5, comment: "Paras burgeri ikinä!" },
            { userName: "Laura", rating: 4, comment: "Hyvä maku, mutta olisi voinut olla kuumempi." },
        ],
        combo: ["Ranskalaiset", "Cola"],
    },
    {
        id: 2,
        name: "Mozzarella Sticks",
        description: "Friteerattuja mozzarella-tikkuja, tarjoillaan marinara-kastikkeen kanssa.",
        price: "6,90€",
        imageUrl: "https://cdn.pixabay.com/photo/2017/01/20/16/23/burger-1996574_960_720.jpg",
        ingredients: ["Mozzarella", "Leivitys", "Marinara-kastike"],
        allergens: ["Maito", "Gluteeni", "Kananmuna"],
        reviews: [
            { userName: "Antti", rating: 5, comment: "Rapea ja täydellinen naposteltava!" },
        ],
        combo: [],
    },
    {
        id: 3,
        name: "Cheesecake",
        description: "Kermainen vanilja-juustokakku ja marjakompotti.",
        price: "7,50€",
        imageUrl: "https://images.pexels.com/photos/1064445/pexels-photo-1064445.jpeg",
        ingredients: ["Juusto", "Sokeri", "Marjat", "Keksipohja"],
        allergens: ["Maito", "Gluteeni"],
        reviews: [
            { userName: "Sini", rating: 5, comment: "Nam! Täydellinen jälkkäri." },
        ],
        combo: [],
    },
    {
        id: 4,
        name: "Lemonade",
        description: "Raikas sitruunalimonadi, käsin puristettu.",
        price: "3,50€",
        imageUrl: "https://images.unsplash.com/photo-1558640479-8247f2f7f1df?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Sitruunamehu", "Sokeri", "Vesi"],
        allergens: [],
        reviews: [],
        combo: [],
    },
];
