import React, { useState } from 'react';

import { initializeApollo, addApolloState } from '../../lib/apollo-client';
import Collections from '../../components/collections/Collections';
import {
  GetCollectionsDocument,
  GetCollectionsQuery,
  useGetCollectionsQuery,
} from '../../src/generated/graphql';
import { Button, Alert } from '../../components/ui';

const PER_PAGE = 12;

const CollectionsPage = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, fetchMore, error } = useGetCollectionsQuery({
    variables: { first: PER_PAGE },
    notifyOnNetworkStatusChange: true,
  });

  const handleViewMore = async () => {
    if (!data) {
      return;
    }

    const cursor =
      data.collections.edges[data.collections.edges.length - 1].cursor;

    setIsLoadingMore(true);

    await fetchMore({
      variables: { cursor },
    });

    setIsLoadingMore(false);
  };

  if (!data) {
    return (
      <div className="container mx-auto p-4 lg:p-0 mt-6">
        <Alert
          variant="danger"
          message="Sorry. We were'nt able to display collections right now. Please try again soon."
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-0 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Collections</h2>
      <Collections collections={data.collections.edges} />
      <div className="mt-10 text-center">
        {data.collections.pageInfo.hasNextPage ? (
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
  );
};

export default CollectionsPage;

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<GetCollectionsQuery>({
    query: GetCollectionsDocument,
    variables: { first: PER_PAGE },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
