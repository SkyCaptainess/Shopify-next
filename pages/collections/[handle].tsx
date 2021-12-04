import React, { useState } from 'react';
import Image from 'next/image';
import { initializeApollo, addApolloState } from '../../lib/apollo-client';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

import ProductCard from '../../components/products/ProductCard';
import { Button } from '../../components/ui';
import {
  GetSingleCollectionDocument,
  GetSingleCollectionQuery,
  useGetSingleCollectionQuery,
} from '../../src/generated/graphql';

const PER_PAGE = 20;

const Collection = () => {
  const { query } = useRouter();

  const handle = query.handle as string;

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, fetchMore } = useGetSingleCollectionQuery({
    variables: {
      handle,
      first: PER_PAGE,
    },
  });

  const handleViewMore = async () => {
    if (!data?.collectionByHandle) {
      return;
    }

    const cursor =
      data.collectionByHandle.products.edges[
        data.collectionByHandle.products.edges.length - 1
      ].cursor;

    setIsLoadingMore(true);
    await fetchMore({
      variables: { cursor },
    });
    setIsLoadingMore(false);
  };

  if (!data?.collectionByHandle) {
    return null;
  }

  return (
    <div>
      <div className="container mx-auto lg:mt-10 p-4 lg:p-0">
        <div
          className="mb-10 relative overflow-hidden rounded-lg"
          style={{ height: 400 }}
        >
          <Image
            src={data.collectionByHandle.image?.src}
            alt={data.collectionByHandle.image?.altText || 'Collection image'}
            className="w-full h-full absolute top-0 object-cover"
            layout="fill"
          />
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h2 className="text-white text-4xl">
              {data.collectionByHandle.title}
            </h2>
          </div>
        </div>
        {data.collectionByHandle.products.edges.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {data.collectionByHandle.products.edges.map((product) => (
                <ProductCard key={product.node.id} product={product.node} />
              ))}
            </div>
            <div className="mt-10 text-center">
              {data.collectionByHandle.products.pageInfo.hasNextPage ? (
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
          <p className="text-red-500 text-center">No products yet.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ handle: string }>) {
  const handle = params?.handle as string;

  const apolloClient = initializeApollo();

  await apolloClient.query<GetSingleCollectionQuery>({
    query: GetSingleCollectionDocument,
    variables: { handle, first: PER_PAGE },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
