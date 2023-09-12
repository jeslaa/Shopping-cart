import { ReactElement, createContext, useMemo, useReducer } from "react"

export type CartItem = {
    cItem: string,
    productName: string,
    price: number,
    quantity: number
}

type CartState = { cart: CartItem[] }

const intitialCartState: CartState = { cart: [] }

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItem,

}

const reducer = (state: CartState, action: ReducerAction):
    CartState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('ADD action payload is missing')
            }
            const { cItem, productName, price } = action.payload

            const filteredCart: CartItem[] = state.cart.filter(item => item.cItem !== cItem)

            const itemExist: CartItem | undefined = state.cart.find(item => item.cItem === cItem)

            const quantity: number = itemExist ? itemExist.quantity + 1 : 1

            return { ...state, cart: [...filteredCart, { cItem, productName, price, quantity }] }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('REMOVE action payload is missing')
            }
            const { cItem } = action.payload

            const filteredCart: CartItem[] = state.cart.filter(item => item.cItem !== cItem)

            return { ...state, cart: [...filteredCart] }
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('QUANTITY action payload is missing')
            }

            const { cItem, quantity } = action.payload

            const itemExist: CartItem | undefined = state.cart.find(item => item.cItem === cItem)

            if (!itemExist) {
                throw new Error('Item needs to exist to updtate quantity')
            }

            const updatedItem: CartItem = { ...itemExist, quantity }

            const filteredCart: CartItem[] = state.cart.filter(item => item.cItem !== cItem)

            return { ...state, cart: [...filteredCart, updatedItem] }
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
        }
        default:
            throw new Error('Reducer action type not recongized')
    }
}

const useCartContext = (intitialCartState: CartState) => {
    const [state, dispatch] = useReducer(reducer, intitialCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const allItems: number = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.quantity
    }, 0)

    const totalPrice = new Intl.NumberFormat('sv-se', { style: 'currency', currency: 'SEK' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.quantity * cartItem.price)
        }, 0))

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.cItem.slice(-2))
        const itemB = Number(b.cItem.slice(-2))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, allItems, totalPrice, cart }
}

export type UseCartContext = ReturnType<typeof useCartContext>

const inititalCartContextState: UseCartContext = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    allItems: 0,
    totalPrice: '',
    cart: []
}

export const CartContext = createContext<UseCartContext>(inititalCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider
            value={useCartContext(intitialCartState)} >
                { children}
        </CartContext.Provider>
    )
}

export default CartContext