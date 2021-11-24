import { InferGetStaticPropsType } from 'next';
import ProductCard from '../components/products/ProductCard';
import ProductsSlider from '../components/products/ProductsSlider';
import { Button } from '../components/ui';
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
      <div className="w-screen relative h-80 lg:h-96">
        <div
          style={{
            backgroundImage: 'url(/images/banner.jpg)',
          }}
          className="w-full h-full absolute top-0 left-0 z-10 bg-cover bg-no-repeat"
        />
        <div className="absolute z-10 w-full h-full bg-black opacity-50 " />
        <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center text-gray-700">
          <div className="container mt-2 mx-auto p-4 lg:p-0">
            <h2 className="text-lg lg:text-4xl mb-4 font-semibold text-white">
              Choose the best toys for your kids.
            </h2>
            <p className="text-md lg:text-xl mb-10 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              officiis quod atque pariatur sapiente illum{' '}
            </p>
            <Button size="lg">Shop Now</Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 lg:p-0 mt-10">
        {collections.slice(0, 3).map((collection) => (
          <div key={collection.node.id} className="mb-10">
            <ProductsSlider
              title={
                <h2 className="text-2xl font-semibold mb-4">
                  {collection.node.title}
                </h2>
              }
            >
              {collection.node.products.edges.map((product) => (
                <ProductCard key={product.node.id} product={product.node} />
              ))}
            </ProductsSlider>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">Browse Products</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>
        <div className="text-center mt-4 mb-10">
          <Button size="md">View More</Button>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { data: productsData } = await client.query<GetProductsQuery>({
    query: GetProductsDocument,
  });

  const { data: collectionsData } = await client.query<GetCollectionsQuery>({
    query: GetCollectionsDocument,
    variables: { first: 3 },
  });

  return {
    props: {
      collections: collectionsData.collections.edges,
      products: productsData.products.edges,
    },
  };
};
