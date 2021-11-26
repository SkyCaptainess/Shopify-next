import React, { useState } from 'react';
import Image from 'next/image';
import { client } from '../../lib/apollo-client';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import ProductCard from '../../components/products/ProductCard';
import { Button } from '../../components/ui';
import {
  GetSingleCollectionDocument,
  GetSingleCollectionQuery,
  useGetSingleCollectionQuery,
} from '../../src/generated/graphql';

const Collection = ({
  collection,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const initialCursor = collection.collectionByHandle?.products.edges.length
    ? collection.collectionByHandle?.products.edges[
        collection.collectionByHandle.products.edges.length - 1
      ].cursor
    : null;

  const [skip, setSkip] = useState(true);

  const { data, loading, fetchMore } = useGetSingleCollectionQuery({
    variables: {
      handle: collection.collectionByHandle?.handle as string,
      first: 20,
    },
    skip,
    notifyOnNetworkStatusChange: true,
  });

  const collectionData = data ? data : collection;

  const handleViewMore = () => {
    setSkip(false);

    const cursor = data?.collectionByHandle
      ? data.collectionByHandle.products.edges[
          data.collectionByHandle.products.edges.length - 1
        ].cursor
      : initialCursor;

    fetchMore({
      variables: { cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult;
        }

        if (!fetchMoreResult.collectionByHandle) {
          return prevResult;
        }

        const currentResult = data ? prevResult : collection;

        if (!currentResult.collectionByHandle) {
          return prevResult;
        }

        const result: GetSingleCollectionQuery = {
          ...fetchMoreResult,
          collectionByHandle: {
            ...fetchMoreResult.collectionByHandle,
            products: {
              ...fetchMoreResult.collectionByHandle.products,
              edges: [
                ...currentResult.collectionByHandle.products.edges,
                ...fetchMoreResult.collectionByHandle.products.edges,
              ],
            },
          },
        };

        return result;
      },
    });
  };

  if (!collectionData.collectionByHandle) {
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
            src={collectionData.collectionByHandle.image?.src}
            alt={
              collectionData.collectionByHandle.image?.altText ||
              'Collection image'
            }
            className="w-full h-full absolute top-0 object-cover"
            layout="fill"
          />
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h2 className="text-white text-4xl">
              {collectionData.collectionByHandle.title}
            </h2>
          </div>
        </div>
        {collectionData.collectionByHandle.products.edges.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {collectionData.collectionByHandle.products.edges.map(
                (product) => (
                  <ProductCard key={product.node.id} product={product.node} />
                )
              )}
            </div>
            <div className="mt-10 text-center">
              {collectionData.collectionByHandle.products.pageInfo
                .hasNextPage ? (
                <Button
                  onClick={handleViewMore}
                  disabled={loading}
                  loading={loading}
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

  const { data } = await client.query<GetSingleCollectionQuery>({
    query: GetSingleCollectionDocument,
    variables: { handle, first: 20 },
  });

  if (!data.collectionByHandle) {
    throw new Error('Collection not found');
  }

  return {
    props: {
      collection: data,
    },
  };
}
