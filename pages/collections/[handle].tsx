import React from 'react';
import Image from 'next/image';
import { client } from '../../lib/apollo-client';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';

import ProductList from '../../components/products/ProductList/ProductList';
import {
  GetSingleCollectionDocument,
  GetSingleCollectionQuery,
  GetCollectionsDocument,
  GetCollectionsQuery,
} from '../../src/generated/graphql';

const Collection = ({
  collection,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!collection) {
    return null;
  }

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="mb-10 relative" style={{ height: 400 }}>
          <Image
            src={collection.image?.src}
            alt={collection.image?.altText || 'Collection image'}
            className="w-full h-full absolute top-0 object-cover"
            layout="fill"
          />
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h2 className="text-white text-4xl">{collection.title}</h2>
          </div>
        </div>
        <ProductList products={collection.products.edges} />
      </div>
    </div>
  );
};

export default Collection;

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ handle: string }>) {
  const handle = params?.handle as string;

  const { data } = await client.query<GetSingleCollectionQuery>({
    query: GetSingleCollectionDocument,
    variables: { handle },
  });

  if (!data.collectionByHandle) {
    throw new Error('Collection not found');
  }

  return {
    props: {
      collection: data.collectionByHandle,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await client.query<GetCollectionsQuery>({
    query: GetCollectionsDocument,
  });

  const paths = data.collections.edges.map((collection) => ({
    params: { handle: collection.node.id },
  }));

  return { paths, fallback: 'blocking' };
}
