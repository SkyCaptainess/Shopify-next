import React, { useRef } from 'react';
import SearchBar from '../SearchBar';
import useOnClickOutside from '../../../hooks/use-click-outside';

interface SearchWidgetProps {
  isVisible: boolean;
  onClose(): void;
}

const SearchWidget = ({ isVisible, onClose }: SearchWidgetProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="w-full fixed top-0 z-40">
        <div
          className="bg-white dark:bg-gray-800 p-4 flex items-center justify-center mt-14 lg:mt-16"
          ref={ref}
        >
          <SearchBar onSubmit={onClose} />
        </div>
      </div>
      <div className="bg-black fixed top-16 z-30 opacity-50 w-full h-full"></div>
    </>
  );
};

export default SearchWidget;
