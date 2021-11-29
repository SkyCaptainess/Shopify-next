import React, { useState } from 'react';
import { useRouter } from 'next/router';

import SearchIcon from '../../icons/Search';

interface SearchBarProps {
  onSubmit(): void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const router = useRouter();

  const { query } = router;

  const searchTextParam = (query.q as string) || '';

  const [searchText, setSearchText] = useState(searchTextParam);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({ pathname: '/products', query: { q: searchText } });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center border-b border-gray-400  overflow-hidden w-96">
        <input
          type="text"
          aria-labelledby="Search"
          placeholder="Search for products..."
          className="px-4 py-2 bg-transparent flex-1"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <button
          type="submit"
          className="w-10 items-center flex justify-center"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
