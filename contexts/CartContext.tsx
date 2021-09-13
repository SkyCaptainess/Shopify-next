import { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../lib/shopify';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface Context {
  isCartSidebarOpen: boolean;
  checkout: any;
  addCartItem(variantId: string, quantity: number): Promise<void>;
  buyNow(variantId: string, quantity: number): Promise<void>;
  removeCartItem(cartItemId: string): Promise<void>;
  openCartSidebar(): void;
  closeCartSidebar(): void;
  cartStatus: Status;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

const CartContext = createContext<Context | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [checkout, setCheckout] = useState<any>({ lineItems: [] });
  const [cartStatus, setCartStatus] = useState<Status>('idle');

  const createCheckout = async () => {
    const res = await client.checkout.create();
    if (res) {
      localStorage.setItem('checkoutId', res.id);
      setCheckout(res);
    }
  };

  const fetchCheckout = async (checkoutId: string) => {
    try {
      setCartStatus('loading');
      const res = await client.checkout.fetch(checkoutId);
      if (res) {
        setCheckout(res);
        setCartStatus('succeeded');
      } else {
        setCartStatus('failed');
      }
    } catch (error) {
      setCartStatus('failed');
    }
  };

  useEffect(() => {
    const checkoutId = localStorage.getItem('checkoutId');

    if (checkoutId) {
      fetchCheckout(checkoutId);
    } else {
      createCheckout();
    }
  }, []);

  const addCartItem = async (variantId: string, quantity: number) => {
    if (!checkout) {
      return;
    }

    const lineItemsToAdd = [{ variantId, quantity }];
    const res = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    if (res) {
      setCheckout(res);
    }
  };

  const removeCartItem = async (cartItemId: string) => {
    const res = await client.checkout.removeLineItems(checkout.id, [
      cartItemId,
    ]);
    if (res) {
      setCheckout(res);
    }
  };

  const buyNow = async (variantId: string, quantity: number) => {
    if (!checkout) {
      return;
    }

    const lineItemsToAdd = [{ variantId, quantity }];
    const res = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    if (res) {
      window.location.href = res.webUrl;
    }
  };

  const openCartSidebar = () => {
    setIsCartSidebarOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  const isLoading = cartStatus === 'loading';
  const isError = cartStatus === 'failed';
  const isSuccess = cartStatus === 'succeeded';

  return (
    <CartContext.Provider
      value={{
        isCartSidebarOpen,
        checkout,
        cartStatus,
        isLoading,
        isError,
        isSuccess,
        addCartItem,
        openCartSidebar,
        closeCartSidebar,
        removeCartItem,
        buyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must only used within CartProvider');
  }
  return context;
};
