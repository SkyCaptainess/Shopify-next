import React from 'react';
import ProductCard from '../../components/products/ProductCard';
import { useGetProductsQuery } from '../../src/generated/graphql';

const ProductsPage = () => {
  const { loading, data, error } = useGetProductsQuery();

  if (loading || !data) {
    return 'loading';
  }

  if (error) {
    return 'error';
  }

  return (
    <div className="container mx-auto mt-6 p-4 lg:p-0">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {data.products.edges.length > 0 ? (
          data.products.edges.map((product) => (
            <ProductCard product={product.node} key={product.node.id} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
