import React, { useRef } from 'react';
import Link from 'next/link';
import useOnClickOutside from '../../../hooks/use-click-outside';
import CloseIcon from '../../icons/Close';

interface SidebarWidgetProps {
  isVisible: boolean;
  onClose(): void;
}

const SidebarWidget = ({ onClose, isVisible }: SidebarWidgetProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 lef-0 w-1/2 z-50 h-full bg-white" ref={ref}>
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <ul>
          <li className="border-b p-4 hover:text-primary" onClick={onClose}>
            <Link href="/products">
              <a>Shop All</a>
            </Link>
          </li>
          <li className="border-b p-4 hover:text-primary" onClick={onClose}>
            <Link href="/collections">
              <a>Collections</a>
            </Link>
          </li>
          <li className="border-b p-4 hover:text-primary" onClick={onClose}>
            <Link href="#">
              <a>Help</a>
            </Link>
          </li>
          <li className="p-4 hover:text-primary" onClick={onClose}>
            <Link href="#">
              <a>About Us</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bg-black opacity-50 fixed z-40 top-0 left-0 w-full h-full"></div>
    </>
  );
};

export default SidebarWidget;
