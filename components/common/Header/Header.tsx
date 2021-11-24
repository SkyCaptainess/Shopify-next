import React, { useState } from 'react';
import Link from 'next/link';
import CartIcon from '../../icons/Cart';
import SearchIcon from '../../icons/Search';
import HamburgerIcon from '../../icons/Hamburger';
import { useCart } from '../../../contexts/CartContext';
import SearchWidget from '../SearchWidget';
import SidebarWidget from '../SidebarWidget';

const Header = () => {
  const [isSearchWidgetVisible, setIsSearchWidgetVisible] = useState(false);
  const [isSidebarWidgetVisible, setIsSidebarWidgetVisible] = useState(false);

  const { cartItemsCount, openCartSidebar } = useCart();

  return (
    <>
      <header className="bg-white p-4 lg:p-0 sticky top-0 left-0 z-30 w-full ">
        <div className="h-10 lg:h-16 flex items-center mx-auto container">
          <button
            className="text-black lg:hidden"
            onClick={() => setIsSidebarWidgetVisible(true)}
          >
            <HamburgerIcon />
          </button>
          <div className="flex flex-1 items-center justify-center lg:flex-none lg:block">
            <Link href="/">
              <a className="text-2xl font-semibold text-primary">Toyzed</a>
            </Link>
          </div>

          <ul className="hidden lg:flex items-center  flex-1 justify-center">
            <li className="mr-6 hover:text-primary">
              <Link href="/products">
                <a>Shop All</a>
              </Link>
            </li>
            <li className="mr-6 hover:text-primary">
              <Link href="/collections">
                <a>Collections</a>
              </Link>
            </li>
            <li className="mr-6 hover:text-primary">
              <Link href="#">
                <a>Help</a>
              </Link>
            </li>
            <li className="mr-6 hover:text-primary">
              <Link href="#">
                <a>About Us</a>
              </Link>
            </li>
          </ul>

          <div className="flex items-center justify-end">
            <ul className="flex items-center ">
              <li className="mr-6 cursor-pointer relative">
                <button
                  type="button"
                  onClick={() => setIsSearchWidgetVisible(true)}
                >
                  <SearchIcon />
                </button>
              </li>
              <li className="cursor-pointer relative" onClick={openCartSidebar}>
                <button type="button" onClick={openCartSidebar}>
                  <CartIcon />
                </button>

                {cartItemsCount ? (
                  <span
                    className="text-xs absolute -top-1 -right-2 bg-red-600 
              text-white w-5 h-5 rounded-full
                flex
                items-center justify-center
                "
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
