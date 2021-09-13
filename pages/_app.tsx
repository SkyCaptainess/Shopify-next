import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import type { AppProps } from 'next/app';
import Layout from '../components/common/Layout';
import { CartProvider } from '../contexts/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
export default MyApp;
