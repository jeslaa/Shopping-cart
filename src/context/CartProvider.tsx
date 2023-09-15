import { ReactElement, createContext, useMemo, useReducer } from "react"

//Defining the props
export type CartProduct = {
    sku?: string,
    productName: string,
    price: number,
    qaunt: number,
    // image?: string
}

type CartState = { cart: CartProduct[] } //Defining the initial state

const intitialCartState: CartState = { cart: [] }

const REDUCER_ACTION_TYPE = { // Defining action types for the reducer
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartProduct,

}

const reducer = (state: CartState, action: ReducerAction):
    CartState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: { //Handling adding an item
            if (!action.payload) {
                throw new Error('ADD action payload is missing')
            }
            const { sku, productName, price } = action.payload

            const filteredCart: CartProduct[] = state.cart.filter(item => item.sku !== sku)

            const doesItemExist: CartProduct | undefined = state.cart.find(item => item.sku === sku)

            const qaunt: number = doesItemExist ? doesItemExist.qaunt + 1 : 1 //Calculating the quantity

            return { ...state, cart: [...filteredCart, { sku, productName, price, qaunt }] } // Returning updated cart
        }
        case REDUCER_ACTION_TYPE.REMOVE: { //Handling remove
            if (!action.payload) {
                throw new Error('REMOVE action payload is missing')
            }
            const { sku } = action.payload

            const filteredCart: CartProduct[] = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart] }
        }
        case REDUCER_ACTION_TYPE.QUANTITY: { // Handling the quantity and if updated
            if (!action.payload) {
                throw new Error('QUANTITY action payload is missing')
            }

            const { sku, qaunt } = action.payload

            const doesItemExist: CartProduct | undefined = state.cart.find(item => item.sku === sku)

            if (!doesItemExist) {
                throw new Error('Item needs to exist to updtate quantity')
            }
            
            const updatedItem: CartProduct = { ...doesItemExist, qaunt } // Create an updated item with the new quantity

            const filteredCart: CartProduct[] = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart, updatedItem] } // Return updated cart state
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] } //Clearing cart when submitting
        }
        default:
            throw new Error('Reducer action type not recongized')
    }
}

const useCartContext = (intitialCartState: CartState) => { // Creating a custom hook to provide cart data
    const [state, dispatch] = useReducer(reducer, intitialCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const allItems: number = state.cart.reduce((previousValue, CartProduct) => { // Calculate total items and total price
        return previousValue + CartProduct.qaunt
    }, 0)

    const totalPrice = new Intl.NumberFormat('sv-se', { style: 'currency', currency: 'SEK' }).format(
        state.cart.reduce((previousValue, CartProduct) => {
            return previousValue + (CartProduct.qaunt * CartProduct.price)
        }, 0))

    const cart = state.cart.sort((a, b) => { // Sort the cart items by id
        const itemA = Number(a.sku?.slice(-2))
        const itemB = Number(b.sku?.slice(-2))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, allItems, totalPrice, cart }
}

export type UseCartContext = ReturnType<typeof useCartContext>

const inititalCartContextState: UseCartContext = { // Define the initial state for CartContext
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    allItems: 0,
    totalPrice: '',
    cart: []
}

export const CartContext = createContext<UseCartContext>(inititalCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] } // Define the type for children components

export const CartProvider = ({ children }: ChildrenType): ReactElement => { // Creating a CartProvider component to wrap app and provide cart context
    return (
        <CartContext.Provider
            value={useCartContext(intitialCartState)} >
            {children}
        </CartContext.Provider>
    )
}

export default CartContext