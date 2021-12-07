import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';

import Header from './Header';
import { CartProvider } from '../../../contexts/CartContext';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('Should show search widget when search button click', () => {
  render(
    <MockedProvider mocks={[]}>
      <CartProvider>
        <Header />
      </CartProvider>
    </MockedProvider>
  );

  const cartButton = screen.getByLabelText('search');

  userEvent.click(cartButton);

  expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument();
});

test('Should show sidebar widget when menu button click', () => {
  render(
    <MockedProvider mocks={[]}>
      <CartProvider>
        <Header />
      </CartProvider>
    </MockedProvider>
  );

  const menuButton = screen.getByLabelText('menu');

  userEvent.click(menuButton);

  const sidebarWidget = screen.getByRole('dialog', { name: 'sidebar' });

  expect(sidebarWidget).toBeInTheDocument();
});

test('Should close sidebar widget when close button click', async () => {
  render(
    <MockedProvider mocks={[]}>
      <CartProvider>
        <Header />
      </CartProvider>
    </MockedProvider>
  );

  const menuButton = screen.getByLabelText('menu');

  userEvent.click(menuButton);

  const closeMenu = screen.getByLabelText('Close sidebar');

  userEvent.click(closeMenu);

  const sidebarWidget = screen.queryByRole('dialog', { name: 'sidebar' });

  expect(sidebarWidget).toBeNull();
});
