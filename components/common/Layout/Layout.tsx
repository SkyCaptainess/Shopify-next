import React from 'react';
import Link from 'next/link';

import { CartSidebar } from '@/components/cart';
import AnnouncementBar from '@/components/common/AnnouncementBar';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <AnnouncementBar>
        <div className="flex flex-col lg:flex-row items-center justify-center px-4">
          <p className="text-center text-white mr-2">New Released Amazing Toys For Your Kids.</p>
          <Link href="/products">
            <a className="text-white font-semibold">Shop Now</a>
          </Link>
        </div>
      </AnnouncementBar>
      <Header />
      <main style={{ minHeight: '60vh' }}>{children}</main>
      <CartSidebar />
      <Footer />
    </>
  );
};

export default Layout;
