import React, { Children, ReactElement, createContext, useState, useEffect } from "react"

export type ProductType = {
    item: string,
    productName: string
    price: number
}

const initialState: ProductType[] = []

// //Creating an array for ProductType
// const initialState: ProductType[] = [
//     {
//         "item": "item01",
//         "productName": "Computer",
//         "price": 12000
//     },
//     {
//         "item": "item02",
//         "productName": "Iphone",
//         "price": 9000
//     },
//     {
//         "item": "item03",
//         "productName": "Keyboard",
//         "price": 1300
//     }
// ]

export type UseProductsContext = { products: ProductType[] }

const initialContextState: UseProductsContext = { products: [] }

const ProductsContext = createContext<UseProductsContext>(initialContextState)

type ChildrenType = { children?: ReactElement | ReactElement[]} 

export const ProductsProvider = ({ children }: ChildrenType ): ReactElement => {
    const [ products, setProducts] = useState<ProductType[]> (initialState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch('http://localhost:3500/products').then(res => {
                return res.json()
            }).catch(err => {
                if (err instanceof Error) console.log(err.message)
            })
        return data
        }
        fetchProducts().then(products => setProducts(products))
    }, [])

    return (
        <ProductsContext.Provider value={{ products }}>
            { children }
        </ProductsContext.Provider>
    )
}

export default ProductsContext