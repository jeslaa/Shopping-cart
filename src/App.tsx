import Header from "../src/componenents/Header"
import Footer from "../src/componenents/Footer"
import Cart from "../src/componenents/Cart"
import ProductList from "../src/componenents/ProductList"
import { useState } from "react"

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false) // Initializing showCart state with a default value of false

  const pageContent = viewCart ? <Cart /> : <ProductList /> // Determining the content based on the showCart state 

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )

  return content
}

export default App
