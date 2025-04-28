export default function MenuItemCard({ item }) {
    return (
        <div className="bg-white  dark:bg-gray-600  rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <img
                src="/placeholder.png"
                alt={item.name}
                className="w-36 h-36 object-cover rounded-full shadow-md mb-4 border-4 border-gray-100 dark:border-gray-700"
            />
            <h3 className="font-bold text-xl text-gray-800 dark:text-white">{item.name}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{item.description}</p>
            <p className="text-rose-600 dark:text-rose-400 font-bold text-lg mt-3">{item.price}€</p>
            <button className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                Lisää koriin
            </button>
        </div>
    );
}
