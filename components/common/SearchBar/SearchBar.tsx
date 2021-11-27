import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
          className="w-10 text-white items-center flex justify-center"
        >
          <svg
            height="19"
            viewBox="0 0 19 19"
            width="19"
            className="text-gray-600"
            fill="currentColor"
          >
            <g fillRule="evenodd" stroke="none" strokeWidth="1">
              <g transform="translate(-1016 -32)">
                <g>
                  <g transform="translate(405 21)">
                    <g transform="translate(611 11)">
                      <path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></path>
                      <path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
