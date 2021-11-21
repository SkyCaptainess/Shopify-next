import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { IS_SERVER } from '../constants';
import { client } from '../lib/apollo-client';
import {
  GetCartDocument,
  GetCartQuery,
  useCheckoutCreateMutation,
  useCheckoutLineItemsAddMutation,
  useCheckoutLineItemsRemoveMutation,
} from '../src/generated/graphql';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface Context {
  isCartSidebarOpen: boolean;
  checkout: GetCartQuery['node'];
  cartItemsCount: number;
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
  const [checkout, setCheckout] = useState<GetCartQuery['node'] | null>(null);
  const [cartStatus, setCartStatus] = useState<Status>('idle');
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const [createCheckoutMutation] = useCheckoutCreateMutation();

  const [lineItemToAddMutation, { data: lineItemToAddData }] =
    useCheckoutLineItemsAddMutation();

  const [lineItemToRemoveMutation, { data: lineItemToRemoveData }] =
    useCheckoutLineItemsRemoveMutation();

  const createCheckout = useCallback(async () => {
    const { data } = await createCheckoutMutation({ variables: { input: {} } });
    if (data?.checkoutCreate?.checkout) {
      localStorage.setItem('checkoutId', data.checkoutCreate.checkout.id);
      setCheckout(data?.checkoutCreate?.checkout as GetCartQuery['node']);
    }
  }, [createCheckoutMutation]);

  const fetchCheckout = useCallback(async (checkoutId: string) => {
    const { data } = await client.query<GetCartQuery>({
      query: GetCartDocument,
      variables: { checkoutId },
    });
    if (data.node?.__typename === 'Checkout') {
      setCheckout(data.node);
      setCartItemsCount(data.node.lineItems.edges.length);
    }
  }, []);

  useEffect(() => {
    const initCart = async () => {
      const checkoutIdLocalStorage = !IS_SERVER
        ? localStorage.getItem('checkoutId')
        : '';

      if (checkoutIdLocalStorage) {
        fetchCheckout(checkoutIdLocalStorage);
      } else {
        createCheckout();
      }
    };

    initCart();
  }, [createCheckout, fetchCheckout]);

  const addCartItem = async (variantId: string, quantity: number) => {
    if (checkout?.__typename !== 'Checkout') {
      return;
    }

    const lineItems = [{ variantId, quantity }];

    await lineItemToAddMutation({
      variables: {
        checkoutId: checkout.id,
        lineItems,
      },
    });

    const { data } = await client.query<GetCartQuery>({
      query: GetCartDocument,
      variables: { checkoutId: checkout.id },
    });

    if (data.node?.__typename === 'Checkout') {
      setCheckout(data.node);
      setCartItemsCount(data.node.lineItems.edges.length);
    }
  };

  const removeCartItem = async (cartItemId: string) => {
    if (checkout?.__typename !== 'Checkout') {
      return;
    }
    await lineItemToRemoveMutation({
      variables: { checkoutId: checkout.id, lineItemIds: [cartItemId] },
    });

    const { data } = await client.query<GetCartQuery>({
      query: GetCartDocument,
      variables: { checkoutId: checkout.id },
    });

    if (data.node?.__typename === 'Checkout') {
      setCheckout(data.node);
      setCartItemsCount(data.node.lineItems.edges.length);
    }
  };

  const buyNow = async (variantId: string, quantity: number) => {
    if (checkout?.__typename !== 'Checkout') {
      return;
    }
    const lineItems = [{ variantId, quantity }];

    await lineItemToAddMutation({
      variables: {
        checkoutId: checkout.id,
        lineItems,
      },
    });

    const result = lineItemToAddData?.checkoutLineItemsAdd?.checkout;

    if (result) {
      window.location.href = result.webUrl;
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
        cartItemsCount,
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
