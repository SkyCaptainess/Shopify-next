import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='bg-white p-4 lg:p-0 sticky top-0 left-0 z-10 w-full '>
      <div className='h-10 lg:h-20 flex items-center mx-auto container'>
        <Link href='/'>
          <a className='text-2xl font-semibold'>BAGZED</a>
        </Link>
        <div className='flex-1 flex justify-end'>
          <ul className='flex'>
            <li className='mr-4'>
              <Link href='/'>
                <a>SHOP ALL</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>CATALOG</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
