import React from 'react';
import ProductCard from '../ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6'>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
