import React from 'react';
import { CartSidebar } from '../../cart';
import Footer from '../Footer';
import Header from '../Header';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <CartSidebar />
      <Footer />
    </>
  );
};

export default Layout;
