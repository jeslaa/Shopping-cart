import { useContext } from "react";
import CartContext from "../context/CartProvider";
import { UseCartContext } from "../context/CartProvider";

const useCart = (): UseCartContext => {
    return useContext(CartContext)
}

export default useCart