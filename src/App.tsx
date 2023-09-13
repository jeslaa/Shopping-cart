import Header from "./componenents/Header"
import Footer from "./componenents/Footer"
import Cart from "./componenents/Cart"
import ProductList from "./componenents/ProductList"
import { useState } from "react"


function App() {
  const [showCart, setShowCart] = useState<boolean>(false) // Initializing showCart state with a default value of false

  const pageContent = showCart ? <Cart /> : <ProductList /> // Determining the content based on the showCart state 

  const content = (
    <>
      <Header showCart={showCart} setShowCart={setShowCart} />
      {pageContent}
      <Footer showCart={showCart} /> 
    </> //Rendering footer with showCart prop
  )

  return content
}

export default App
