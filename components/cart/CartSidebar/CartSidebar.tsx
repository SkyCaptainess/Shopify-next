import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import CartItem from '../CartItem';
import Close from '../../icons/Close';
import { Button, Spinner } from '../../ui';

const CartSidebar = () => {
  const {
    checkout,
    isCartSidebarOpen,
    closeCartSidebar,
    isLoading,
    isError,
    isSuccess,
  } = useCart();

  if (!isCartSidebarOpen) {
    return null;
  }

  return (
    <div>
      <div className='fixed top-0 right-0 z-20 bg-white h-full p-4 border-l w-2/5'>
        <div className='flex flex-col h-full'>
          <div className='flex items-center mb-6'>
            <button aria-label='Close cart sidebar' onClick={closeCartSidebar}>
              <Close />
            </button>
            <div className='flex items-center flex-1 justify-center'>
              <h1 className='text-center text-2xl font-semibold'>My Cart</h1>
            </div>
          </div>

          {isLoading && (
            <div className='text-center my-10'>
              <Spinner size='md' />
            </div>
          )}

          {isError && (
            <div>
              Unable to display your cart items right now. Please try again
              later.
            </div>
          )}

          {isSuccess && (
            <>
              {checkout.lineItems.length ? (
                <>
                  <div className='flex-1'>
                    {checkout.lineItems.map((lineItem) => (
                      <CartItem cartItem={lineItem} key={lineItem.id} />
                    ))}
                  </div>

                  <div className='mt-10'>
                    <div className='mb-4 flex items-center justify-end'>
                      <p className='pr-2 lg:text-lg'>Sub Total:</p>
                      <p className='text-lg'>
                        {checkout.subtotalPriceV2.currencyCode}{' '}
                        {checkout.subtotalPrice}
                      </p>
                    </div>
                    <div className='mb-4 flex items-center  justify-end'>
                      <p className='pr-2 lg:text-lg'>Taxes:</p>
                      <p className='text-lg'>
                        {checkout.totalTaxV2.currencyCode} {checkout.totalTax}
                      </p>
                    </div>
                    <div className='mb-4 flex items-center  justify-end'>
                      <p className='pr-2 lg:text-lg'>Total:</p>
                      <p className='text-xl lg:text-2xl text-red-500 font-semibold'>
                        {checkout.totalPriceV2.currencyCode}{' '}
                        {checkout.totalPrice}
                      </p>
                    </div>
                    <Button
                      component='a'
                      href={checkout.webUrl}
                      className='w-full'
                      size='lg'
                      variant='primary'
                    >
                      Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <div className='text-center my-10'>
                  <p className='text-2xl'>Your cart is empty :(</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div
        className='fixed bg-black bg-opacity-40 top-0 left-0 h-full w-full z-10'
        role='button'
        onClick={closeCartSidebar}
      />
    </div>
  );
};

export default CartSidebar;