import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from "./components/Layout";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import ProductPage from "./pages/ProductPage";
import Palaute from "./pages/Palaute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<Order />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="palaute" element={<Palaute />} />

      </Route>
    </Routes>
  );
}

export default App;

