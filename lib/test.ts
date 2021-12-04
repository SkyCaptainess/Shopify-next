import { useMemo } from 'react';
import fetch from 'cross-fetch';
import {
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://bagzed.myshopify.com/api/graphql',
  fetch,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token':
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  };
});

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(),
          collections: relayStylePagination(),
        },
      },
    },
  }),
});
