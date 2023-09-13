import { useContext } from "react";
import ProductsContext from "../context/ProductsProvider";
import { UseProductsContext } from "../context/ProductsProvider";

const useProducts = (): UseProductsContext => {
    return useContext(ProductsContext)
}

export default useProducts