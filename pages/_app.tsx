import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Router from 'next/router';
import nProgress from 'nprogress';

import Layout from '../components/common/Layout';
import { CartProvider } from '../contexts/CartContext';
import { client } from '../lib/apollo-client';
import seo from '../config/seo.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'nprogress/nprogress.css';
import '../styles/globals.css';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

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
