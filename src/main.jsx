// import { StrictMode } from 'react'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import './index.css';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <CartProvider>
      <App />
  </CartProvider>,
)
