import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../../contexts/CartContext';
import Trash from '../../icons/Trash';
import { Spinner } from '../../ui';
import { CheckoutLineItem } from '../../../src/generated/graphql';

interface Props {
  cartItem: CheckoutLineItem;
}

const CartItem = ({ cartItem }: Props) => {
  const [removing, setRemoving] = useState(false);
  const { removeCartItem } = useCart();

  const handleRemoveCartItem = async () => {
    try {
      setRemoving(true);
      await removeCartItem(cartItem.id);
      console.log('success');
      setRemoving(false);
    } catch (error) {
      console.log(error);
      setRemoving(false);
    }
  };

  return (
    <div
      className={`lg:flex mb-4 border-b pb-4  relative ${
        removing ? 'opacity-50' : ''
      }`}
    >
      <Image
        src={cartItem?.variant?.image?.src}
        alt={cartItem.variant?.image?.altText || 'Product'}
        width={150}
        height={150}
      />
      <div className="flex-1 lg:ml-4">
        <p className="mb-2 font-semibold lg:text-xl">{cartItem.title}</p>
        {cartItem.variant?.selectedOptions.map((option) => (
          <p className="mb-2 lg:text-xl text-gray-500" key={option.name}>
            {option.name}: {option.value}
          </p>
        ))}

        <p className="mb-2 text-lg">x {cartItem.quantity}</p>
        <p className="font-semibold lg:text-lg text-red-500 mb-2">
          {cartItem.variant?.priceV2.currencyCode}{' '}
          {cartItem.variant?.priceV2.amount}
        </p>
      </div>
      <div>
        <button
          className="text-red-500"
          disabled={removing}
          onClick={handleRemoveCartItem}
        >
          {removing ? <Spinner /> : <Trash />}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
