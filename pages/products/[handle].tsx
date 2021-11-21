import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Image from 'next/image';
import { client } from '../../lib/apollo-client';
import { Button } from '../../components/ui';
import { CartSuccessPopup } from '../../components/cart';
import ProductOptions from '../../components/products/ProductOptions';
import ProductSlider from '../../components/products/ProductSlider';
import ProductInputQty from '../../components/products/ProductInputQty';
import { useCart } from '../../contexts/CartContext';
import {
  GetSingleProductDocument,
  GetSingleProductQuery,
  GetProductsDocument,
  GetProductsQuery,
  ImageEdge,
} from '../../src/generated/graphql';

const Product = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let defaultOptionValues: Record<string, string> = {};
  product?.options.forEach((selector) => {
    defaultOptionValues[selector.name] = selector.values[0];
  });

  const initialSelectedVariant = product
    ? product.variants.edges[0].node
    : null;
  const initialSelectedImage = product ? initialSelectedVariant?.image : null;

  const [selectedOptions, setSelectedOptions] = useState(defaultOptionValues);
  const [selectedVariant, setSelectedVariant] = useState(
    initialSelectedVariant
  );
  const [selectedImage, setSelectedImage] = useState(initialSelectedImage);
  const [addToCartStatus, setAddToCartStatus] = useState('idle');
  const [qty, setQty] = useState(1);

  const { addCartItem, buyNow } = useCart();

  const price = selectedVariant
    ? `${selectedVariant.priceV2.currencyCode} ${selectedVariant.priceV2.amount}`
    : 0;

  const handleSelectOption = (name: string, value: string) => {
    const currentSelectedOptions = { ...selectedOptions, [name]: value };
    setSelectedOptions(currentSelectedOptions);

    const findVariant = product.variants.edges.find((edge) =>
      edge.node.selectedOptions.every(
        (option) => currentSelectedOptions[option.name] === option.value
      )
    );

    if (!findVariant) {
      return;
    }
    setSelectedVariant(findVariant.node);
  };

  const handleSelectImage = (value: ImageEdge) => {
    setSelectedImage(value.node);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      return;
    }

    try {
      setAddToCartStatus('loading');
      await addCartItem(selectedVariant.id, qty);
      setAddToCartStatus('succeeded');
    } catch (error) {
      setAddToCartStatus('failed');
    } finally {
      setTimeout(() => {
        setAddToCartStatus('idle');
      }, 1000);
    }
  };

  const handleInputQtyChange = (count: number) => {
    setQty(count);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      return;
    }

    try {
      await buyNow(selectedVariant.id, 1);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <>
      <NextSeo
        title={product?.title}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product?.title,
          description: product.description,
          images: [
            {
              url: selectedImage?.src,
              width: 400,
              height: 400,
              alt: product?.title,
            },
          ],
        }}
      />
      <div className="container mx-auto my-4 px-4 lg:px-0">
        <div className="lg:flex mb-4 bg-white p-4">
          <div className="lg:pr-6 lg:w-1/2">
            <div className="relative" style={{ paddingTop: '80%' }}>
              <Image
                src={selectedImage?.src}
                alt={product?.title}
                layout="fill"
                objectFit="contain"
              />
            </div>

            <ProductSlider
              images={product?.images.edges}
              activeImageID={selectedImage?.id as string}
              onSelectImage={handleSelectImage}
            />
          </div>
          <div className="flex-1 mt-4 lg:mt-0">
            <h1 className="text-4xl mb-5">{product?.title}</h1>
            <p className="text-2xl text-red-500 font-semibold mb-5">{price}</p>

            <div className="mb-4 flex items-center">
              <ProductInputQty
                maxQuantity={selectedVariant?.quantityAvailable || undefined}
                onChange={handleInputQtyChange}
              />
              <p className="ml-4 text-gray-500">
                {selectedVariant?.quantityAvailable} pieces available
              </p>
            </div>

            {selectedVariant && (
              <ProductOptions
                options={product?.options}
                selectedVariant={selectedVariant.title}
                onSelectOption={handleSelectOption}
              />
            )}

            <div className="lg:flex">
              <Button
                variant="primary"
                size="lg"
                className="mr-4 mb-4 w-full lg:mb-0"
                onClick={handleAddToCart}
                disabled={addToCartStatus === 'loading'}
                loading={addToCartStatus === 'loading'}
              >
                Add to cart
              </Button>
              <Button
                className="w-full"
                variant="inverse"
                size="lg"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4">
          <h3 className="text-xl font-semibold mb-5">Product Description</h3>
          <p dangerouslySetInnerHTML={{ __html: product?.descriptionHtml }} />
        </div>
        <CartSuccessPopup visible={addToCartStatus === 'succeeded'} />
      </div>
    </>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ handle: string }>) {
  const handle = params?.handle as string;

  const { data, error } = await client.query<GetSingleProductQuery>({
    query: GetSingleProductDocument,
    variables: { handle },
  });

  if (error || !data.productByHandle) {
    throw new Error('Product not found');
  }

  return {
    props: { product: data.productByHandle },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query<GetProductsQuery>({
    query: GetProductsDocument,
  });
  const paths = data.products.edges.map((product) => ({
    params: { handle: product.node.handle },
  }));

  return { paths, fallback: 'blocking' };
}

export default Product;
