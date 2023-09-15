import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './context/CartProvider.tsx'
import { ProductsProvider } from './context/ProductsProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </CartProvider>
    </ProductsProvider>
    
  </React.StrictMode>,
)
