import { GetStaticPropsContext } from 'next';
import { NextSeo } from 'next-seo';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { initializeApollo, addApolloState } from '../../lib/apollo-client';
import { Button } from '../../components/ui';
import { CartSuccessPopup } from '../../components/cart';
import ProductOptions from '../../components/products/ProductOptions';
import ProductVariantsSlider from '../../components/products/ProductVariantsSlider';
import ProductInputQty from '../../components/products/ProductInputQty';
import ProductRecommendations from '../../components/products/ProductRecommendations';
import { useCart } from '../../contexts/CartContext';
import {
  GetSingleProductDocument,
  GetSingleProductQuery,
  Image as ImageType,
  useGetSingleProductQuery,
} from '../../src/generated/graphql';
import { useRouter } from 'next/router';

const Product = () => {
  const { query } = useRouter();

  const handle = query.handle as string;

  const { data } = useGetSingleProductQuery({
    variables: {
      handle,
    },
  });

  const product = data?.productByHandle;

  let defaultOptionValues: Record<string, string> = {};
  product?.options.forEach((selector) => {
    defaultOptionValues[selector.name] = selector.values[0];
  });

  const initialSelectedVariant = product
    ? product.variants.edges[0].node
    : null;

  const [selectedOptions, setSelectedOptions] = useState(defaultOptionValues);
  const [selectedVariant, setSelectedVariant] = useState(
    initialSelectedVariant
  );
  const [addToCartStatus, setAddToCartStatus] = useState('idle');
  const [qty, setQty] = useState(1);

  const { addCartItem, buyNow } = useCart();

  const price = selectedVariant
    ? `${selectedVariant.priceV2.currencyCode} ${selectedVariant.priceV2.amount}`
    : 0;

  useEffect(() => {
    setSelectedVariant(initialSelectedVariant);
  }, [initialSelectedVariant]);

  const handleSelectOption = (name: string, value: string) => {
    if (!product) {
      return;
    }

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

  const handleSelectImage = (image: ImageType) => {
    if (!selectedVariant) {
      return;
    }
    setSelectedVariant({ ...selectedVariant, image });
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

  if (!product) {
    return null;
  }

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
              url: selectedVariant?.image?.src,
              width: 400,
              height: 400,
              alt: product?.title,
            },
          ],
        }}
      />
      <div className="container mx-auto my-4 px-4 lg:px-0">
        <div className="lg:flex mb-4 bg-white dark:bg-gray-800 p-4">
          <div className="lg:pr-6 lg:w-1/2">
            <div className="relative" style={{ paddingTop: '80%' }}>
              <Image
                src={selectedVariant?.image?.src}
                alt={product?.title}
                layout="fill"
                objectFit="contain"
              />
            </div>

            <ProductVariantsSlider
              images={product?.images.edges}
              activeImageID={selectedVariant?.image?.id as string}
              onSelectImage={handleSelectImage}
            />
          </div>
          <div className="flex-1 mt-4 lg:mt-0">
            <h1 className="text-2xl mb-6">{product?.title}</h1>
            <p className="text-3xl text-primary font-semibold mb-5">{price}</p>

            {selectedVariant && (
              <ProductOptions
                options={product?.options}
                selectedVariant={selectedVariant.title}
                onSelectOption={handleSelectOption}
              />
            )}

            <div className="mb-6 flex items-center">
              <ProductInputQty
                maxQuantity={selectedVariant?.quantityAvailable || undefined}
                onChange={handleInputQtyChange}
              />
              <p className="ml-4 text-gray-500">
                {selectedVariant?.quantityAvailable} pieces available
              </p>
            </div>

            <div className="lg:flex mb-6">
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
            {product.tags.length > 0 && (
              <div className="flex lg:items-center">
                <p className="text-lg text-gray-500 mr-6">Tags</p>
                <ul className="flex items-center flex-1 flex-wrap">
                  {product.tags.map((tag) => (
                    <li key={tag} className="mr-4 text-primary mb-2 lg:mb-0">
                      {tag.split('-').join(' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Product Description</h3>
          <div className="bg-white dark:bg-gray-800 p-4">
            <p dangerouslySetInnerHTML={{ __html: product?.descriptionHtml }} />
          </div>
        </div>
        <ProductRecommendations productId={product.id} />
        <CartSuccessPopup visible={addToCartStatus === 'succeeded'} />
      </div>
    </>
  );
};

export async function getServerSideProps({
  params,
}: GetStaticPropsContext<{ handle: string }>) {
  const handle = params?.handle as string;

  const apolloClient = initializeApollo();

  await apolloClient.query<GetSingleProductQuery>({
    query: GetSingleProductDocument,
    variables: { handle },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Product;
