import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import ProductPage from "./pages/ProductPage";
import Palaute from "./pages/Palaute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import OrdersPage from "./admin/OrdersPage";
import AdminFeedbacks from "./admin/Feedbacks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminRoute from "./components/admin/AdminRoute";
import AdminProductList from "./admin/admin-products/AdminProductList";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<Order />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="palaute" element={<Palaute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="admindashboard" element={<AdminDashboard />} />

        <Route path="products" element={<AdminProductList />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="feedbacks" element={<AdminFeedbacks />} />
      </Route>
    </Routes>
  );
}

export default App;
