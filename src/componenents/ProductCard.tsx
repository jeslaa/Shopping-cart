import React from 'react'
import { Link } from 'react-router-dom'
// import { ProductType } from '../context/ProductsProvider';

export type ProductType = { //Defining ProductType
    sku?: string,
    productName: string
    price: number
    image?: string
}

  const ProductCard: React.FC<ProductType> = ({ sku, productName, price, image }) => {
  return (
    <div className='product-card'>
      <Link to={`/details/${sku}`}>
          <img
            src={image}
            alt={productName}
            />
        <div className='products'>
          <div className='product-card-title'>{productName}</div>
          <div className='product-card-description'>{price}</div>
        </div>
      </Link>
    </div>
    
  )
}

export default ProductCard