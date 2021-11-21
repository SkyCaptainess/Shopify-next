import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { GetProductsQuery } from '../../../src/generated/graphql';

interface ProductCardProps {
  product: GetProductsQuery['products']['edges'][0];
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = `${product.node.priceRange.minVariantPrice.amount} ${product.node.priceRange.minVariantPrice.currencyCode}`;

  return (
    <div className="rounded overflow-hidden shadow-sm bg-white">
      <Link href={`/products/${product.node.handle}`}>
        <a>
          <Image
            src={product.node.images.edges[0].node.src}
            alt={product.node.title}
            width={480}
            height={480}
            objectFit="cover"
          />
          <div className="p-4">
            <p className="text-lg mb-2">{product.node.title}</p>
            <p className="text-lg font-semibold text-red-500">{price}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
