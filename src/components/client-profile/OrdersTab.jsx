import { Scroll } from "lucide-react";
import { useUser } from "../../hooks/apiHooks.js";
import { useEffect, useState } from "react";
import { useTranslation } from "../../components/I18nProvider";

export default function OrdersTab() {
  const { getUser } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user data
        const userData = await getUser();
        const userId = userData.user.id;

        // Fetch orders, products, and reservation products in parallel
        const [ordersResponse, productsResponse, reservationProductsResponse] =
          await Promise.all([
            fetch("http://localhost:3000/api/v1/order/orders"),
            fetch("http://localhost:3000/api/v1/products"),
            fetch("http://localhost:3000/api/v1/order/reservation-products"),
          ]);

        if (!ordersResponse.ok) throw new Error(t("app.order.failedFetch"));
        if (!productsResponse.ok) throw new Error(t("app.products.failedFetch"));
        if (!reservationProductsResponse.ok)
          throw new Error(t("app.order.failedReservationFetch"));

        const [ordersData, productsData, allReservationProducts] =
          await Promise.all([
            ordersResponse.json(),
            productsResponse.json(),
            reservationProductsResponse.json(),
          ]);

        // Filter orders for the current user
        const userOrders = ordersData.filter(
          (order) => order.user_id === userId
        );

        // Create a map of products for quick lookup
        const productsMap = productsData.reduce((map, product) => {
          map[product.ID] = product;
          return map;
        }, {});

        // Process orders with their products
        const ordersWithProducts = userOrders.map((order) => {
          // Filter reservation products for this specific order
          const reservationProducts = allReservationProducts.filter(
            (rp) => rp.reservation_id === order.ID
          );

          // Map products to the order with quantity
          const orderProducts = reservationProducts.map((rp) => {
            const product = productsMap[rp.product_id];

            if (!product) {
              return {
                id: rp.product_id,
                name: t("app.order.removedProduct"),
                quantity: rp.quantity,
                price: 0,
              };
            }

            return {
              ...product,
              quantity: rp.quantity,
            };
          });

          // Fallback: if for some reason products were skipped, still inject a stub
          const safeOrderProducts =
            orderProducts.length > 0
              ? orderProducts
              : [
                  {
                    id: -1,
                    name: t("app.order.removedProduct"),
                    quantity: 1,
                    price: 0,
                  },
                ];

          return {
            ...order,
            id: order.ID,
            products: safeOrderProducts,
            total: order.price,
          };
        });

        setOrders(ordersWithProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [getUser, t]);

  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace(".", ",") + "€";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fi-FI");
  };

  if (loading) {
    return <div className="text-center p-4">{t("app.loading")}</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{t("app.error")}: {error}</div>;
  }

  // Separate orders into completed and others
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  const otherOrders = orders.filter((order) => order.status !== "completed");

  return (
    <div className="space-y-8 p-4 bg-white dark:bg-gray-600">
      <section>
        <h2 className="text-2xl font-bold text-center text-yellow-600 dark:text-yellow-400 mb-4">
          {t("app.order.open")}
        </h2>

        {otherOrders.length > 0 ? (
          otherOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md space-y-4 mb-4"
            >
              <p className="text-gray-800 dark:text-gray-200">
                <strong>{t("app.order.id")}:</strong> #{order.id}
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                <strong>{t("app.cart.products")}:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.name} x{product.quantity} (
                      {product.price > 0
                        ? formatCurrency(product.price * product.quantity)
                        : t("app.order.noPrice")}
                      )
                    </li>
                  ))}
                </ul>
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                <strong>{t("app.order.status")}:</strong>{" "}
                <span className="capitalize">{order.status}</span>
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                <strong>{t("app.cart.total")}:</strong> {formatCurrency(order.total)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("app.order.none")}
          </p>
        )}
      </section>

      <section>
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
          {t("app.order.history")} <Scroll className="w-5 h-5" />
        </h2>

        {completedOrders.length > 0 ? (
          <ul className="space-y-4">
            {completedOrders.map((order) => (
              <li
                key={order.id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    #{order.id}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(order.timestamp)}
                  </p>
                  <div className="mt-1 text-sm">
                    {order.products.slice(0, 2).map((product, index) => (
                      <span key={index}>
                        {product.name} x{product.quantity}
                        {index < Math.min(2, order.products.length - 1) && ", "}
                      </span>
                    ))}
                    {order.products.length > 2 &&
                      ` ${t("app.order.moreItems", { count: order.products.length - 2 })}`}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {t("app.order.delivered")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("app.order.noHistory")}
          </p>
        )}
      </section>
    </div>
  );
}