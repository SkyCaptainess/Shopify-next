import React from 'react';
import Header from '../Header';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
