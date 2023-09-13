import Header from "./componenents/Header"
import Footer from "./componenents/Footer"
import Cart from "./componenents/Cart"
import ProductList from "./componenents/ProductList"
import { useState } from "react"


function App() {
  const [showCart, setShowCart] = useState<boolean>(false)

  const pageContent = showCart ? <Cart /> : <ProductList />

  const content = (
    <>
      <Header showCart={showCart} setShowCart={setShowCart} />
      {pageContent}
      <Footer viewCart={showCart} />
    </>
  )

  return content
}

export default App
