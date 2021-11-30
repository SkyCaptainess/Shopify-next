import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { GetCollectionsQuery } from '../../src/generated/graphql';

interface CollectionsProps {
  collections: GetCollectionsQuery['collections']['edges'];
}

const Collections = ({ collections }: CollectionsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {collections.map((collection) => (
        <div
          key={collection.node.id}
          className="mb-6 p-4 lg:p-0 relative rounded-lg overflow-hidden"
        >
          <Link href={`/collections/${collection.node.handle}`}>
            <a>
              <Image
                src={collection.node.image?.src as string}
                alt={(collection.node.image?.altText as string) || ''}
                width={480}
                height={480}
              />

              <div className="bg-black bg-opacity-40 absolute top-0 left-0 w-full h-full flex items-center justify-center p-2">
                <p className="text-white text-xl lg:text-2xl text-center">
                  {collection.node.title}
                </p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Collections;
