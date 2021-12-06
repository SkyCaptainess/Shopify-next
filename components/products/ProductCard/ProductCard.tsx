import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { GetProductsQuery } from '../../../src/generated/graphql';

interface ProductCardProps {
  product: GetProductsQuery['products']['edges'][0]['node'];
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`;

  return (
    <div className="overflow-hidden" data-cy="product-card">
      <Link href={`/products/${product.handle}`}>
        <a>
          <div className="rounded-lg overflow-hidden bg-white">
            <Image
              src={product.images.edges[0].node.src}
              alt={product.title}
              width={480}
              height={480}
              objectFit="cover"
            />
          </div>

          <div className="p-4 text-center">
            <p className="mb-2 overflow-hidden h-12">{product.title}</p>
            <p className="font-semibold text-primary">{price}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
