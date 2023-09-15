import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext, { ProductType } from '../context/ProductsProvider'; // Make sure to import your context and ProductType

const ProductDetail: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const { products } = useContext(ProductsContext); // Access the products from your context

  // Find the specific product based on the SKU in the URL
  const product = products.find((p) => p.sku === sku);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className='product-detail'>
      <img src={product.image} alt={product.productName} />
      <div className='product-detail-title'>{product.productName}</div>
      <div className='product-detail-description'>Price: ${product.price.toFixed(2)}</div>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetail;
