import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import CartIcon from '../../icons/Cart';
import SearchIcon from '../../icons/Search';
import HamburgerIcon from '../../icons/Hamburger';
import { useCart } from '../../../contexts/CartContext';
import SearchWidget from '../SearchWidget';
import SidebarWidget from '../SidebarWidget';
import ThemeSwitcher from '../ThemeSwitcher';

const Header = () => {
  const [isSearchWidgetVisible, setIsSearchWidgetVisible] = useState(false);
  const [isSidebarWidgetVisible, setIsSidebarWidgetVisible] = useState(false);

  const { cartItemsCount, openCartSidebar } = useCart();

  const { pathname, query } = useRouter();

  const page = query.page as string;

  const getActiveLink = (path: string) => {
    return pathname === path || page === path.slice(1);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 p-4 lg:p-0 sticky top-0 left-0 z-30 w-full ">
        <div className="h-10 lg:h-16 flex items-center mx-auto container">
          <div className="flex flex-1 lg:flex-none items-center">
            <button
              className="lg:hidden mr-4"
              onClick={() => setIsSidebarWidgetVisible(true)}
              aria-label="menu"
            >
              <HamburgerIcon />
            </button>
            <div className="lg:block">
              <Link href="/">
                <a className="text-2xl font-semibold text-primary">
                  <div className="w-32 hidden lg:flex items-center">
                    <Image
                      src="/images/logo-with-text.png"
                      alt="Toyzed Logo"
                      width={160}
                      height={40}
                    />
                  </div>

                  <div className="flex items-center lg:hidden">
                    <Image src="/images/logo.png" alt="Toyzed Logo" width={36} height={36} />
                  </div>
                </a>
              </Link>
            </div>
          </div>

          <ul className="hidden lg:flex items-center  flex-1 justify-center">
            <li
              className={`mr-6 hover:text-primary ${
                getActiveLink('/products') ? 'text-primary' : ''
              }`}
            >
              <Link href="/products">
                <a>Shop All</a>
              </Link>
            </li>
            <li
              className={`mr-6 hover:text-primary ${
                getActiveLink('/collections') ? 'text-primary' : ''
              }`}
            >
              <Link href="/collections">
                <a>Collections</a>
              </Link>
            </li>
            <li
              className={`mr-6 hover:text-primary ${getActiveLink('/help') ? 'text-primary' : ''}`}
            >
              <Link href="/help">
                <a>Help</a>
              </Link>
            </li>
            <li
              className={`mr-6 hover:text-primary ${getActiveLink('/about') ? 'text-primary' : ''}`}
            >
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>

          <div className="flex items-center justify-end">
            <ul className="flex items-center ">
              <li className="mr-6 cursor-pointer relative">
                <ThemeSwitcher />
              </li>
              <li className="mr-6 cursor-pointer relative">
                <button
                  aria-label="search"
                  type="button"
                  onClick={() => setIsSearchWidgetVisible(true)}
                >
                  <SearchIcon />
                </button>
              </li>
              <li className="cursor-pointer relative" onClick={openCartSidebar}>
                <button aria-label="cart" type="button" onClick={openCartSidebar}>
                  <CartIcon />
                </button>

                {cartItemsCount ? (
                  <span
                    className="text-xs absolute -top-1 -right-2 bg-red-600 
              text-white w-5 h-5 rounded-full
                flex
                items-center justify-center
                "
                    data-cy="cart-item-count"
                  >
                    {cartItemsCount}
                  </span>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </header>
      <SearchWidget
        isVisible={isSearchWidgetVisible}
        onClose={() => setIsSearchWidgetVisible(false)}
      />
      <SidebarWidget
        isVisible={isSidebarWidgetVisible}
        onClose={() => setIsSidebarWidgetVisible(false)}
      />
    </>
  );
};

export default Header;
