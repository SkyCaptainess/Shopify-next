import React, { useState, useEffect } from 'react';

interface ProductInputQtyProps {
  initialQty?: number;
  maxQuantity?: number;
  onChange?: (qty: number, type: 'increment' | 'decrement') => void;
}

const ProductInputQty = ({
  initialQty = 1,
  maxQuantity,
  onChange,
}: ProductInputQtyProps) => {
  const [qty, setQty] = useState(initialQty);

  const increment = () => {
    if (maxQuantity && qty >= maxQuantity) {
      return;
    }

    setQty((count) => count + 1);

    if (onChange) {
      onChange(qty + 1, 'increment');
    }
  };

  const decrement = () => {
    if (qty === 1) {
      return;
    }

    setQty((count) => count - 1);

    if (onChange) {
      onChange(qty - 1, 'decrement');
    }
  };

  return (
    <div className="flex items-center border">
      <button
        className="px-4 py-2 border-r disabled:opacity-50"
        disabled={qty === 1}
        onClick={decrement}
      >
        -
      </button>
      <div className="text-center w-20">{qty}</div>
      <button
        className="px-4 py-2 border-l disabled:opacity-50"
        disabled={Boolean(maxQuantity && qty >= maxQuantity)}
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default ProductInputQty;
