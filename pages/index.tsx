import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import ProductCard from '../components/products/ProductCard';
import ProductsSlider from '../components/products/ProductsSlider';
import { Button } from '../components/ui';
import Hero from '../components/ui/Hero/Hero';
import { initializeApollo } from '../lib/apollo-client';
import {
  GetProductsDocument,
  GetProductsQuery,
  GetCollectionsDocument,
  GetCollectionsQuery,
} from '../src/generated/graphql';

const Home = ({ collections, products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const lastCursor = products[products.length - 1].cursor;

  return (
    <>
      <Hero image="/images/banner.png">
        <h2 className="text-lg lg:text-4xl mb-4 font-semibold">
          Choose the best toys for your kids.
        </h2>
        <p className="text-md lg:text-xl mb-10 ">
          Make playtime a blast with our finest toys and games.
        </p>
        <Link href="/products">
          <a>
            <Button size="lg">Shop Now</Button>
          </a>
        </Link>
      </Hero>
      <div className="container mx-auto p-4 lg:p-0 mt-10">
        {collections.slice(0, 3).map((collection) => (
          <div key={collection.node.id} className="mb-10">
            <ProductsSlider
              title={<h2 className="text-2xl font-semibold mb-4">{collection.node.title}</h2>}
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
          <Link href={`/products?cursor=${lastCursor}`}>
            <a>
              <Button size="md">View More</Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data: productsData } = await apolloClient.query<GetProductsQuery>({
    query: GetProductsDocument,
    variables: { first: 15 },
  });

  const { data: collectionsData } = await apolloClient.query<GetCollectionsQuery>({
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
