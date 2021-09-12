import React from 'react';
import Image from 'next/image';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { client } from '../../lib/shopify';

import ProductList from '../../components/products/ProductList/ProductList';

const Collection = ({
  collection,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <div className='container mx-auto mt-10'>
        <div className='mb-10 relative' style={{ height: 400 }}>
          <Image
            src={collection.image.src}
            alt={collection.image.alt}
            className='w-full h-full absolute top-0 object-cover'
            layout='fill'
          />
          <div className='bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex items-center justify-center'>
            <h2 className='text-white text-4xl'>{collection.title}</h2>
          </div>
        </div>
        <ProductList products={collection.products} />
      </div>
    </div>
  );
};

export default Collection;

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ handle: string }>) {
  const handle = params?.handle as string;

  const collection = await client.collection.fetchByHandle(handle);

  if (!collection) {
    return {
      notFound: true,
    };
  }

  const parsedCollection = JSON.parse(JSON.stringify(collection));

  return {
    props: {
      collection: parsedCollection,
    },
  };
}

export async function getStaticPaths() {
  const collections = await client.collection.fetchAllWithProducts();

  const parsedCollections = JSON.parse(JSON.stringify(collections));

  const paths = parsedCollections.map((collection) => ({
    params: { handle: collection.id },
  }));

  return { paths, fallback: 'blocking' };
}
