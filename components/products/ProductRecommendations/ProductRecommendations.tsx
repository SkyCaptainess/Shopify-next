import React from 'react';

import ProductSlider from '../ProductsSlider';
import { useGetProductRecommendationsQuery } from '../../../src/generated/graphql';
import ProductCard from '../ProductCard';

interface ProductRecommendationsProps {
  productId: string;
}

const ProductRecommendations = ({ productId }: ProductRecommendationsProps) => {
  const { data, error, loading } = useGetProductRecommendationsQuery({
    variables: { productId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const hasRecommendations = data?.productRecommendations && data.productRecommendations.length > 0;

  return (
    <>
      {hasRecommendations ? (
        <ProductSlider title={<h3 className="text-xl font-semibold mb-2">Related Products</h3>}>
          {data.productRecommendations?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ProductSlider>
      ) : (
        <div className="text-center">No related products.</div>
      )}
    </>
  );
};

export default ProductRecommendations;
