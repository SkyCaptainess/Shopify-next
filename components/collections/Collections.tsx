import Link from 'next/link';
import React from 'react';

interface Props {
  collections: any;
}

const Collections = ({ collections }: Props) => {
  return (
    <div className='container mx-auto mt-6'>
      <h2 className='text-2xl font-semibold mb-4'>Collections</h2>
      <div className='grid grid-cols-3 gap-6'>
        {collections.map((collection: any) => (
          <div key={collection.id} className='mb-6 p-4 lg:p-0 relative'>
            <Link href={`/collections/${collection.handle}`}>
              <a>
                <img
                  src={collection.image.src}
                  alt={collection.image.alt}
                  className='w-full h-full object-cover'
                />

                <div className='bg-black bg-opacity-40 absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                  <p className='text-white text-2xl'>{collection.title}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
