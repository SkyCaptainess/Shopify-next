import React from 'react';
import { CartSidebar } from '@/components/cart';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '60vh' }}>{children}</main>
      <CartSidebar />
      <Footer />
    </>
  );
};

export default Layout;
