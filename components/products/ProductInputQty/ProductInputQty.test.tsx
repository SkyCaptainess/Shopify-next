import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductInputQty from '.';

test('should display initial quantity count correctly', () => {
  const initialCount = 8;

  render(<ProductInputQty initialQty={initialCount} />);

  expect(screen.getByText(initialCount)).toBeInTheDocument();
});

test('should increment quantity count', () => {
  const initialCount = 1;

  render(<ProductInputQty initialQty={initialCount} />);

  const incrementButton = screen.getByLabelText('increment');

  userEvent.click(incrementButton);
  expect(screen.getByText(2)).toBeInTheDocument();

  userEvent.click(incrementButton);
  expect(screen.getByText(3)).toBeInTheDocument();

  userEvent.click(incrementButton);
  expect(screen.getByText(4)).toBeInTheDocument();
});

test('should not increment quantity count when reached max quantity', () => {
  const initialCount = 1;

  render(<ProductInputQty initialQty={initialCount} maxQuantity={5} />);

  const incrementButton = screen.getByLabelText('increment');

  userEvent.click(incrementButton);
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);

  expect(incrementButton).toHaveAttribute('disabled');
});

test('should decrement quantity count', () => {
  const initialCount = 4;

  render(<ProductInputQty initialQty={initialCount} />);

  const decrementButton = screen.getByLabelText('decrement');

  userEvent.click(decrementButton);
  expect(screen.getByText(3)).toBeInTheDocument();

  userEvent.click(decrementButton);
  expect(screen.getByText(2)).toBeInTheDocument();

  userEvent.click(decrementButton);
  expect(screen.getByText(1)).toBeInTheDocument();
});

test('should not decrement quantity count when quantity is 1', () => {
  const initialCount = 1;

  render(<ProductInputQty initialQty={initialCount} />);

  const decrementButton = screen.getByLabelText('decrement');

  expect(decrementButton).toHaveAttribute('disabled');
});
