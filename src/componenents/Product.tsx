import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement } from "react"
import '../styles/product.scss'
import { Link, useNavigate } from "react-router-dom"


type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>, //Defining dispatch function
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean, // Flag to indicate if there is a product in the cart
}


const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType)
: ReactElement => {

    const navigate = useNavigate();
    const handleGoToCart = () =>{
        onAddToCart()
        navigate('/cart')
    }

    //Function to add products to the cart
    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: 
        { ...product, qaunt: 1 } }) //Initializing quantity to 1

    const productInCart = inCart ? ' | Item added' : null //Displaying message if the product is added
    const content =
        <Link to={`/details/${product.sku}`}>
        <article className="product">
            <h2> {product.productName}</h2>
            <img src={ product.image } alt={product.productName} className="product-img" />
            <p>{new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' })
            .format(product.price)}{productInCart}</p>
            <button onClick={handleGoToCart} className="add-btn">Add to Cart</button>
        </article>
        </Link>

    return content
}


export default Product