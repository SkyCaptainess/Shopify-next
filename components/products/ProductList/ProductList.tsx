import React from 'react';

import ProductCard from '../ProductCard';
import { GetProductsQuery } from '../../../src/generated/graphql';

interface ProductListProps {
  products: GetProductsQuery['products']['edges'];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
      {products.map((product) => (
        <ProductCard product={product} key={product.node.id} />
      ))}
    </div>
  );
};

export default ProductList;
