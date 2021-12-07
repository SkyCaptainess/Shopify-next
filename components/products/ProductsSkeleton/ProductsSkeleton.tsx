import React from 'react';

interface ProductsSkeletonProps {
  number?: number;
}

const ProductsSkeleton = ({ number = 15 }: ProductsSkeletonProps) => {
  const listItems = Array(number)
    .fill(null)
    .map((__, index) => index + 1);

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {listItems.map((item) => (
        <li key={item}>
          <div className="bg-gray-300 w-full rounded-lg" style={{ paddingTop: '60%' }}></div>
          <div className="p-4">
            <div className="bg-gray-300 h-4 mb-2"></div>
            <div className="bg-gray-300 h-4 w-2/4"></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductsSkeleton;
