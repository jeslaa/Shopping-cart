import Nav from "./Nav"
import useCart from "../hooks/useCart"
import '../styles/navbar.scss'

type Props = {
    showCart: Boolean, // Prop to show/hide the cart
    setShowCart: React.Dispatch<React.SetStateAction<boolean>> // Function for setting the showCart state

}

const Header = ({showCart, setShowCart}: Props)  => {
    //Getting cart data
    const { allItems, totalPrice } = useCart()

    const content = (
        <header className="header">
            <h1 className="title">Shop</h1>
            <div className="header-title">
                <div className="header-price">
                    <p className="total-items">Total Items: {allItems} </p>
                    <p className="total-price">Total Price: {totalPrice} </p>
                </div>
            </div>
            <Nav showCart={showCart} setShowCart={setShowCart}></Nav>
        </header>
    )
  return content //Returning content for header
}

export default Header