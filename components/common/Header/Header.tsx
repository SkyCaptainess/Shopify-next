import React from 'react';
import Link from 'next/link';
import Cart from '../../icons/Cart';
import { useCart } from '../../../contexts/CartContext';

const Header = () => {
  const { checkout, openCartSidebar } = useCart();

  return (
    <header className='bg-white p-4 lg:p-0 sticky top-0 left-0 z-10 w-full '>
      <div className='h-10 lg:h-20 flex items-center mx-auto container'>
        <Link href='/'>
          <a className='text-2xl font-semibold'>BAGZED</a>
        </Link>
        <div className='flex-1 flex items-center justify-end'>
          <ul className='flex items-center'>
            <li className='mr-4'>
              <Link href='/'>
                <a>SHOP ALL</a>
              </Link>
            </li>
            <li className='mr-4'>
              <Link href='/'>
                <a>CATALOG</a>
              </Link>
            </li>
            <li
              className='mr-4 cursor-pointer relative'
              onClick={openCartSidebar}
            >
              <Cart />

              {checkout.lineItems.length ? (
                <span
                  className='text-xs absolute -top-1 -right-2 bg-red-600 
              text-white w-5 h-5 rounded-full
                flex
                items-center justify-center
                '
                >
                  {checkout.lineItems.length}
                </span>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
