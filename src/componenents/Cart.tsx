import useCart from "../hooks/useCart"
import { useState } from "react"
import "../styles/cart.scss"
import CartTotal from "./CartLine"

// Tracking confirmation status
const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false)

  const { dispatch, REDUCER_ACTIONS, allItems, totalPrice, cart } = useCart() // Get cart data and actions using the useCart hook

  //Submit function
  const onSubmit = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT })
    setConfirm(true)
  }

  // Page content based on confirmation status
  const pageContent = confirm
    ? <h2>The order has been placed.</h2>
    : <>
      <h2 className="offscreen">Cart</h2>
      <ul>
        {cart.map(item => {
          return (
            <div className="card">
                <CartTotal
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
            </div>
            
          )
        })}
      </ul>
      <div className="cart-total">
        <div className="cart-info">
        <p> Total items: {allItems}</p>
        <p> Total price: {totalPrice}</p>
        <button className="cart-submit" disabled={!allItems} 
        onClick={onSubmit}>Place order</button>
        </div>
        
      </div>
    </>

  const content = (
    <main className="main main-cart">
      {pageContent}
    </main>
  )
  return content //Returning content for the cart component
}

export default Cart