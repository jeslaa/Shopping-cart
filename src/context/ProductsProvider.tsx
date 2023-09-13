import { ReactElement, createContext, useState, useEffect } from "react"

export type ProductType = { //Defining ProductType
    cartItem: string,
    productName: string
    price: number
}

const initialState: ProductType[] = [] //Product is initially an empty array

export type UseProductsContext = { products: ProductType[] }

const initialContextState: UseProductsContext = { products: [] }

const ProductsContext = createContext<UseProductsContext>(initialContextState) //Creating context for products

type ChildrenType = { children?: ReactElement | ReactElement[] } // Defining the type for children components

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(() => { // Use state to store and manage product data
        // Trying to load data from local storage
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : initialState;
    });

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => { //Fetching data from json database
            try {
                const data = await fetch('http://localhost:3500/products').then(res => res.json()); 

                // Save the fetched data to local storage
                localStorage.setItem('products', JSON.stringify(data)); //Saving the data

                return data;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        fetchProducts().then(products => setProducts(products)); // Fetching products and updates the state
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsContext