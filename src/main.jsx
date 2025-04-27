import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
