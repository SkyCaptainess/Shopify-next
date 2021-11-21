import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import Layout from '../components/common/Layout';
import { CartProvider } from '../contexts/CartContext';
import { client } from '../lib/apollo-client';
import seo from '../config/seo.json';

import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seo} />
      <ApolloProvider client={client}>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </ApolloProvider>
    </>
  );
}
export default MyApp;
