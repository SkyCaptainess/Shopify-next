import React from 'react';
import Image from 'next/image';

interface Props {
  visible: boolean;
}

const CartSuccessPopup = ({ visible = false }: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center'>
      <div className='bg-black p-4 rounded bg-opacity-80  text-center'>
        <p className='text-2xl mb-2 text-white'>Successfully added to cart.</p>
        <Image alt='Check' src='/images/check.svg' width={60} height={60} />
      </div>
    </div>
  );
};

export default CartSuccessPopup;
