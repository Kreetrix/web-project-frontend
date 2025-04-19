import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from "./components/Layout";
import Menu from "./pages/Menu";
import Order from "./pages/Order";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;

