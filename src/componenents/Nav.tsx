type Props = {
    showCart: Boolean,
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>

}

//Function to view cart
const Nav = ({ showCart, setShowCart }: Props) => {
    const button = showCart
        ? <button onClick={() => setShowCart(false)}>View Products</button> 
        : <button onClick={() => setShowCart(true)}>View Cart</button>

    const content = (
        <nav className="nav">
            {button}
        </nav>
    )
    return content
}

export default Nav