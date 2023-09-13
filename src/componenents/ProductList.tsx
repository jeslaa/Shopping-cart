import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import { ReactElement } from "react"
import Product from "./Product"

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart() //Get cart data
  const { products } = useProducts() //Get list of products

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if (products?.length) { //If there is products map them out
    pageContent = products.map(product => {
      const inCart: boolean = cart.some(item => item.cartItem === product.cartItem) // Checking if the product is already in the cart

      return (
        <Product key={product.cartItem} 
        product={product}
        dispatch= {dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        inCart={inCart}
        />
      )
    })
  }

  const content = (
    <main className="main">
      {pageContent}
    </main>
  )
  return content
}

export default ProductList