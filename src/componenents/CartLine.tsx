import { ChangeEvent, ReactElement } from 'react'
import { CartProduct } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import placeHolderImg from "../../public/keyboard.jpg"

//Defining props
type Props = {
    item: CartProduct,
    dispatch: React.Dispatch<ReducerAction>, // Defining the dispatch function
    REDUCER_ACTIONS: ReducerActionType
}



const CartTotal = ({item, dispatch, REDUCER_ACTIONS}: Props) => {

    const totalPrice: number = (item.qaunt * item.price)

    // Setting the highest quantiity to 20 in the scroll list
    const highestQuant: number = 20 > item.qaunt ? 20 : item.qaunt 

    const optionValues: number[] = [...Array(highestQuant).keys()].map(i => i + 1)

   //Creating a list of options for the quantity selection
    const opt: ReactElement[] = optionValues.map(val => {  
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

   // Handling the quantity change event
    const onChangeQuant = (e: ChangeEvent<HTMLSelectElement>) => {  
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, qaunt: Number(e.target.value)}
        
        })
    }
        //Remove function
        const deleteOnClick = () => dispatch({
            type: REDUCER_ACTIONS.REMOVE,
            payload: item, 
        })

        
    
         // Defining the content for each cart item
        const content = (
            <li className='cart-item'>
                <div className='cart'>
                <img src={item.image || placeHolderImg} alt={item.productName} />
                <div className='Item-name'>{item.productName}</div>
                <div className='price'>{new Intl.NumberFormat('se-SV', //Number formatting and setting the currency to SEK
                { style: 'currency', currency: 'SEK'}).format(item.price)}</div>

                <label htmlFor="itemQuant" className='offscreen'>
                    Item Quantity</label>
                <select name="itemQuant" id="itemQuant" 
                className='cart-select' value={item.qaunt} 
                onChange={onChangeQuant}>
                    {opt}
                </select>

                <div className='cart-subtotal'>
                {new Intl.NumberFormat('se-SV', 
                { style: 'currency', currency: 'SEK'}).format(totalPrice)}
                </div>

                <button className='remove-btn' 
                title='Remove item' onClick={deleteOnClick}>
                    Remove
                </button>
                </div>
                
            </li>
        )
    
    return content
}

export default CartTotal