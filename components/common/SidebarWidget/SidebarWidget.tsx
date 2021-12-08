import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useOnClickOutside from '@/hooks/use-click-outside';
import CloseIcon from '@/components/icons/Close';

interface SidebarWidgetProps {
  isVisible: boolean;
  onClose(): void;
}

const SidebarWidget = ({ onClose, isVisible }: SidebarWidgetProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  const { pathname, query } = useRouter();

  const page = query.page as string;

  const getActiveLink = (path: string) => {
    return pathname === path || page === path.slice(1);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed top-0 lef-0 w-1/2 z-50 h-full bg-white dark:bg-gray-800"
        ref={ref}
        role="dialog"
        aria-label="sidebar"
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} aria-label="Close sidebar">
            <CloseIcon />
          </button>
        </div>
        <ul>
          <li className="border-b p-4 hover:text-primary" onClick={onClose}>
            <Link href="/products">
              <a className={`${getActiveLink('/products') ? 'text-primary' : ''}`}>Shop All</a>
            </Link>
          </li>
          <li className="border-b p-4 hover:text-primary" onClick={onClose}>
            <Link href="/collections">
              <a className={`${getActiveLink('/collections') ? 'text-primary' : ''}`}>
                Collections
              </a>
            </Link>
          </li>
          <li className="border-b p-4 hover:text-primary" onClick={onClose}>
            <Link href="/help">
              <a className={`${getActiveLink('/help') ? 'text-primary' : ''}`}>Help</a>
            </Link>
          </li>
          <li className="p-4 hover:text-primary" onClick={onClose}>
            <Link href="/about">
              <a className={`${getActiveLink('/about') ? 'text-primary' : ''}`}>About</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bg-black opacity-50 fixed z-40 top-0 left-0 w-full h-full"></div>
    </>
  );
};

export default SidebarWidget;
