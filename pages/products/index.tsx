import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import ProductCard from '../../components/products/ProductCard';
import {
  GetProductsDocument,
  GetProductsQuery,
  GetProductsQueryVariables,
  useGetProductsQuery,
} from '../../src/generated/graphql';
import { initializeApollo, addApolloState } from '../../lib/apollo-client';
import { Button, Alert } from '../../components/ui';
import ProductsSkeleton from '../../components/products/ProductsSkeleton';

const PER_PAGE = 15;

const ProductsPage = () => {
  const { query } = useRouter();

  const cursor = (query.cursor as string) || null;
  const search = (query.q as string) || null;

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const variables: GetProductsQueryVariables = {
    first: PER_PAGE,
    cursor,
    query: search ? `title:*${search}*` : null,
  };

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

  const handleViewMore = async () => {
    setIsLoadingMore(true);
    const cursor = data.products.edges[data.products.edges.length - 1].cursor;
    await fetchMore({
      variables: { cursor },
    });
    setIsLoadingMore(false);
  };

  if (error) {
    return (
      <div className="container mx-auto mt-6 p-4 lg:p-0">
        <Alert variant="danger" message="Sorry. We were'nt able to display products right now. Please try again soon." />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 p-4 lg:p-0">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      {search ? (
        <div className="text-center mb-10">
          <p>
            Search results for <strong>{search}</strong>
          </p>
        </div>
      ) : null}

      {data.products.edges.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="text-center">
          <p className="mb-1">No products found.</p>
          <p>Try searching for another keyword</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const cursor = (query.cursor as string) || null;
  const search = (query.q as string) || null;

  const variables: GetProductsQueryVariables = {
    first: PER_PAGE,
    cursor,
    query: search ? `title:*${search}*` : null,
  };

  const apolloClient = initializeApollo();

  await apolloClient.query<GetProductsQuery>({
    query: GetProductsDocument,
    variables,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
