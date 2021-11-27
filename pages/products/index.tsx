import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/products/ProductCard';
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  useGetProductsQuery,
} from '../../src/generated/graphql';

import { Button } from '../../components/ui';
import ProductsSkeleton from '../../components/products/ProductsSkeleton';

const ProductsPage = () => {
  const { query } = useRouter();

  const cursor = (query.cursor as string) || '';

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const variables: GetProductsQueryVariables = {
    first: 15,
  };

  if (cursor) {
    variables.cursor = cursor;
  }

  const { loading, data, error, fetchMore } = useGetProductsQuery({
    variables,
  });

  if (loading || !data) {
    return (
      <div className="container mx-auto mt-6 p-4 lg:p-0">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <ProductsSkeleton />
      </div>
    );
  }

  if (error) {
    return 'error';
  }

  const handleViewMore = async () => {
    setIsLoadingMore(true);
    const cursor = data.products.edges[data.products.edges.length - 1].cursor;

    await fetchMore({
      variables: { cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult;
        }

        if (!fetchMoreResult) {
          return prevResult;
        }

        const result: GetProductsQuery = {
          ...fetchMoreResult,
          products: {
            ...fetchMoreResult.products,
            edges: [
              ...prevResult.products.edges,
              ...fetchMoreResult.products.edges,
            ],
          },
        };

        return result;
      },
    });
    setIsLoadingMore(false);
  };

  return (
    <div className="container mx-auto mt-6 p-4 lg:p-0">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      {data.products.edges.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {data.products.edges.map((product) => (
              <ProductCard product={product.node} key={product.node.id} />
            ))}
          </div>
          <div className="mt-10 text-center">
            {data.products.pageInfo.hasNextPage ? (
              <Button
                onClick={handleViewMore}
                disabled={isLoadingMore}
                loading={isLoadingMore}
                size="md"
                className="w-52"
              >
                View More
              </Button>
            ) : (
              <p className="text-red-500">No more collections.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsPage;
