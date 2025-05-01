import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.css";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UserProvider>
        </AuthProvider>
      </ ThemeProvider>
    </BrowserRouter>
  </StrictMode >
);
