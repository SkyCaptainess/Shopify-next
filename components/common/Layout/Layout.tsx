import React from 'react';
import { CartSidebar } from '../../cart';
import Header from '../Header';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <CartSidebar />
    </>
  );
};

export default Layout;
