import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { client } from '../../lib/apollo-client';
import Collections from '../../components/collections/Collections';
import {
  GetCollectionsDocument,
  GetCollectionsQuery,
} from '../../src/generated/graphql';

const CollectionsPage = ({
  collections,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto p-4 lg:p-0 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Collections</h2>
      <Collections collections={collections} />
    </div>
  );
};

export default CollectionsPage;

export const getStaticProps = async () => {
  const { data: collectionsData } = await client.query<GetCollectionsQuery>({
    query: GetCollectionsDocument,
    variables: { first: 12 },
  });

  return {
    props: {
      collections: collectionsData.collections.edges,
    },
  };
};
