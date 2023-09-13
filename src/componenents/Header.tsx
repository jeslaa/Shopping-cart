import Nav from "./Nav"
import useCart from "../hooks/useCart"

type Props = {
    showCart: Boolean,
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>

}

const Header = ({showCart, setShowCart}: Props)  => {
    const { allItems, totalPrice } = useCart()

    const content = (
        <header className="header">
            <div className="header-title">
                <div className="header-price">
                    <p>Total Items: {allItems} </p>
                    <p>Totral Price: {totalPrice} </p>
                </div>
            </div>
            <Nav showCart={showCart} setShowCart={setShowCart}></Nav>
        </header>
    )
  return content
}

export default Header