import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';
import Image from 'next/image';
import { client } from '../../lib/shopify';
import ProductOptions from '../../components/products/ProductOptions';
import ProductSlider from '../../components/products/ProductSlider';

const Product = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let defaultOptionValues = {};
  product.options.forEach((selector) => {
    defaultOptionValues[selector.name] = selector.values[0].value;
  });

  const [selectedOptions, setSelectedOptions] = useState(defaultOptionValues);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(product.variants[0].image);

  const price = `${selectedVariant.priceV2.currencyCode} ${selectedVariant.price}`;

  const handleSelectOption = (name: string, value: string) => {
    const currentSelectedOptions = { ...selectedOptions, [name]: value };

    const currentSelectedVariant = client.product.helpers.variantForOptions(
      product,
      currentSelectedOptions
    );

    setSelectedOptions(currentSelectedOptions);
    setSelectedVariant(currentSelectedVariant);
  };

  const handleSelectImage = (image: any) => {
    setSelectedImage(image);
  };

  return (
    <div className='container mx-auto my-5'>
      <div className='lg:flex mb-4 bg-white p-4'>
        <div className='pr-6 lg:w-1/2'>
          <div className='relative' style={{ paddingTop: '80%' }}>
            <Image
              src={selectedImage.src}
              alt={product.title}
              layout='fill'
              objectFit='cover'
            />
          </div>

          <ProductSlider
            images={product.images}
            activeImage={selectedImage}
            onSelectImage={handleSelectImage}
          />
        </div>
        <div className='flex-1'>
          <h1 className='text-4xl mb-5'>{product.title}</h1>
          <p className='text-2xl text-red-500 font-semibold mb-5'>{price}</p>
          <ProductOptions
            options={product.options}
            selectedVariant={selectedVariant}
            onSelectOption={handleSelectOption}
          />
        </div>
      </div>
      <div className='bg-white p-4'>
        <h3 className='text-xl font-semibold mb-5'>Product Description</h3>
        <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </div>
    </div>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ handle: string }>) {
  const handle = params?.handle as string;

  try {
    const results = await client.product.fetchByHandle(handle);
    const product = JSON.parse(JSON.stringify(results));

    return {
      props: { product },
      revalidate: 100,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const products = await client.product.fetchAll();
  const paths = products.map((product: any) => ({
    params: { handle: product.handle },
  }));

  return { paths, fallback: 'blocking' };
}

export default Product;
