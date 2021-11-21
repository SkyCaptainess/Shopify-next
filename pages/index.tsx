import { gql } from '@apollo/client';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import Collections from '../components/collections/Collections';
import ProductList from '../components/products/ProductList/ProductList';
import { client } from '../lib/apollo-client';
import {
  GetProductsDocument,
  GetProductsQuery,
  GetCollectionsDocument,
  GetCollectionsQuery,
} from '../src/generated/graphql';

const Home = ({
  collections,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="w-screen relative h-52 lg:h-96">
        <div
          style={{
            backgroundImage: 'url(/images/banner.jpeg)',
          }}
          className="w-full h-full absolute top-0 left-0 z-10 bg-cover bg-no-repeat"
        />
        <div className="absolute z-20 bg-black  opacity-50 top-0 left-0 w-full h-full flex items-center justify-center text-gray-700">
          <div className="container mt-2 mx-auto p-4 lg:p-0">
            <h2 className="text-lg lg:text-4xl mb-4 font-semibold text-white">
              Lorem ipsum dolor imet
            </h2>
            <p className="text-md lg:text-xl mb-10 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              officiis quod atque pariatur sapiente illum{' '}
            </p>
            <button className="px-10 py-3 bg-white text-gray-800 text-md lg:text-lg shadow-sm">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 lg:p-0">
        <Collections collections={collections} />
        <h2 className="text-2xl font-semibold mb-4">Browse Products</h2>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { data: productsData, error } = await client.query<GetProductsQuery>({
    query: GetProductsDocument,
  });

  const { data: collectionsData } = await client.query<GetCollectionsQuery>({
    query: GetCollectionsDocument,
  });

  console.log('error', error);
  console.log('data', productsData);

  return {
    props: {
      collections: collectionsData.collections.edges,
      products: productsData.products.edges,
    },
  };
};
