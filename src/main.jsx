import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <ThemeProvider>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </CartProvider>
      </ ThemeProvider>
    </BrowserRouter>
  </StrictMode >,
)
