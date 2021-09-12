import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: any;
}

const ProductCard = ({ product }: Props) => {
  const price = `${product.variants[0].priceV2.currencyCode} ${product.variants[0].price}`;

  return (
    <div className='rounded overflow-hidden shadow-sm bg-white'>
      <Link href={`/products/${product.handle}`}>
        <a>
          <Image
            src={product.images[0].src}
            alt={product.title}
            width={400}
            height={400}
            objectFit='cover'
          />
          <div className='p-4'>
            <p className='text-lg mb-2'>{product.title}</p>
            <p className='text-lg font-semibold text-red-500'>{price}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
