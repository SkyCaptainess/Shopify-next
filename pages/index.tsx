import { InferGetStaticPropsType, GetStaticProps } from 'next';
import Collections from '../components/collections/Collections';
import ProductList from '../components/products/ProductList/ProductList';
import Hero from '../components/ui/Hero';
import { client } from '../lib/shopify';

const Home = ({
  collections,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Hero imageSrc='/images/banner.jpeg' alt='Banner' />
      <div className='container mx-auto'>
        <Collections collections={collections} />
        <h2 className='text-2xl font-semibold mb-4'>Browse Products</h2>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const collections = await client.collection.fetchAllWithProducts();
  const products = await client.product.fetchAll();

  const parsedCollections = JSON.parse(JSON.stringify(collections));
  const parsedProducts = JSON.parse(JSON.stringify(products));

  return {
    props: {
      collections: parsedCollections,
      products: parsedProducts,
    },
  };
};
