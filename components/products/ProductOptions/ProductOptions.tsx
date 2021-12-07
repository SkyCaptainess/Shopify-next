import React from 'react';
import {
  GetSingleProductQuery,
  ProductOption,
  ProductVariant,
} from '../../../src/generated/graphql';

interface ProductOptionsProps {
  options: ProductOption[];
  selectedVariant: string;
  onSelectOption: (option: string, value: string) => void;
}

const ProductOptions = ({ options = [], selectedVariant, onSelectOption }: ProductOptionsProps) => {
  const getActiveOption = (option: string) => {
    return selectedVariant === option;
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.id}>
          <p className="text-lg text-gray-500">{option.name}</p>
          <div className="my-3">
            {option.values.map((value) => (
              <button
                onClick={() => onSelectOption(option.name, value)}
                key={value}
                className={`mr-2 border px-4 text-sm py-2 rounded mb-2 ${
                  getActiveOption(value) ? 'border-primary text-primary' : ''
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
