import Header from "../src/componenents/Header"
import Footer from "../src/componenents/Footer"
import Cart from "../src/componenents/Cart"
import ProductList from "../src/componenents/ProductList"
import { useState } from "react"
import { Route, Routes } from 'react-router-dom';
import ProductDetail from "../src/componenents/ProductDetail"

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false) // Initializing showCart state with a default value of false

  return (
    <div>
    {/* {content} */}
    <Header />
    <Footer viewCart={viewCart} />
    <Routes>
      <Route path="/details/:sku" element={<ProductDetail />}></Route>
      <Route path="/" element={<ProductList />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      
    </Routes>
    </div>
    
  )
}

export default App
