// import useCart from "../hooks/useCart"
import '../styles/footer.scss'

type Props = {
  viewCart: boolean
}

// Defining the Footer component
const Footer = ({ viewCart }: Props) => {

  //Using useCart to get cart information
  // const { allItems, totalPrice } = useCart()

  

  const pageContent = viewCart
  ? <p className="year"></p>
  : (
    <>
    {/* <div className="footer-cart">
      <div className="cart-info">
      <p className="total-items">Total Items: {allItems}</p> 
      <p className="total-price">Total Price: {totalPrice}</p>
      <p className="year">Shopping Cart &copy; 2023</p>
      </div>
   
    </div> */}
      
    </> // Displaying total items and price^
  )

  const content = (
    <footer className="footer">
      {pageContent}
    </footer>
  )
  return content // Return the footer content
}

export default Footer