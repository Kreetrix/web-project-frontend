export default function MenuItemCard({ item }) {
  return (
    <div className="bg-white dark:bg-gray-500 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={item.imageUrl || "/placeholder.png"}
        alt={item.name}
        className="w-36 h-36 object-cover rounded-full shadow-md mb-4 border-4 border-gray-100 dark:border-gray-700"
      />
      <h3 className="font-bold text-xl text-gray-800 dark:text-white">
        {item.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
        {item.description}
      </p>
      <div className="mt-3">
        {item.discountedPrice ? (
          <>
            <p className="text-gray-400 line-through">
              {item.price.toFixed(2)}€
            </p>
            <p className="text-rose-600 dark:text-rose-400 font-bold text-lg">
              {item.discountedPrice}€
            </p>
          </>
        ) : (
          <p className="text-rose-600 dark:text-rose-400 font-bold text-lg">
            {item.price.toFixed(2)}€
          </p>
        )}
      </div>
    </div>
  );
}
