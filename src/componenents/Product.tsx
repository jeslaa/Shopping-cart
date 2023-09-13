import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement, memo } from "react"

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {

    const img: string = new URL(`../images/${product.productName}.jpg`, import.meta.url).href
    console.log(img)

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qaunt: 1 } })

    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

    const content =
        <article className="product">
            <h3>{product.productName}</h3>
            <img src={img} alt={product.productName} className="product-img" />
            <p>{new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
        </article>

    return content
}

function areProductsEqual({ product: prevProduct, inCart: prevInCart }: PropsType, { product: nextProduct, inCart: nextInCart }: PropsType) {
    return (
        Object.keys(prevProduct).every(key => {
            return prevProduct[key as keyof ProductType] ===
                nextProduct[key as keyof ProductType]
        }) && prevInCart === nextInCart
    )
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct