import React from 'react';

const ProductOptions = ({ options = [], selectedVariant, onSelectOption }) => {
  const getActiveOption = (option) => {
    return selectedVariant.title === option;
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.id}>
          <p className='text-lg text-gray-500'>{option.name}</p>
          <div className='my-3'>
            {option.values.map((value) => (
              <button
                onClick={() => onSelectOption(option.name, value.value)}
                key={value.value}
                className={`mr-2 border px-4 text-sm py-2 rounded mb-2 ${
                  getActiveOption(value.value) ? 'border-red-500' : ''
                }`}
              >
                {value.value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
