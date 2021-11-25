import { InferGetServerSidePropsType } from 'next';
import React, { useState } from 'react';

import { client } from '../../lib/apollo-client';
import Collections from '../../components/collections/Collections';
import {
  GetCollectionsDocument,
  GetCollectionsQuery,
  useGetCollectionsQuery,
} from '../../src/generated/graphql';
import { Button } from '../../components/ui';

const CollectionsPage = ({
  collections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const initialCursor = collections.collections.edges.length
    ? collections.collections.edges[collections.collections.edges.length - 1]
        .cursor
    : null;

  const [skip, setSkip] = useState(true);

  const { data, loading, fetchMore } = useGetCollectionsQuery({
    variables: { first: 12 },
    skip,
    notifyOnNetworkStatusChange: true,
  });

  const collectionsData = data ? data : collections;

  const handleViewMore = () => {
    setSkip(false);

    const cursor = data
      ? data.collections.edges[data.collections.edges.length - 1].cursor
      : initialCursor;

    fetchMore({
      variables: { cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return fetchMoreResult;
        }

        const currentResult = data ? prevResult : collections;

        const result: GetCollectionsQuery = {
          ...fetchMoreResult,
          collections: {
            ...fetchMoreResult.collections,
            edges: [
              ...currentResult.collections.edges,
              ...fetchMoreResult.collections.edges,
            ],
          },
        };

        return result;
      },
    });
  };

  return (
    <div className="container mx-auto p-4 lg:p-0 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Collections</h2>
      <Collections collections={collectionsData.collections.edges} />
      <div className="mt-10 text-center">
        {collectionsData.collections.pageInfo.hasNextPage ? (
          <Button onClick={handleViewMore} loading={loading} size="md">
            View More
          </Button>
        ) : (
          <p className="text-red-500">No more collections.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;

export const getServerSideProps = async () => {
  const { data: collectionsData } = await client.query<GetCollectionsQuery>({
    query: GetCollectionsDocument,
    variables: { first: 12 },
  });

  return {
    props: {
      collections: collectionsData,
    },
  };
};
