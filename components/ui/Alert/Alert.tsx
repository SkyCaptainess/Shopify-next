import React from 'react';
import classNames from 'classnames';

type Variant = 'success' | 'info' | 'danger';

interface AlertProps {
  message: string;
  variant?: Variant;
  className?: string;
}

const variants = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  danger: 'bg-red-500',
};

const Alert = ({ message, variant = 'info', className }: AlertProps) => {
  return (
    <div
      className={classNames(
        'border border-transparent rounded-md shadow-sm font-medium py-2 px-4 text-white',
        variants[variant],
        className
      )}
    >
      {message}
    </div>
  );
};

export default Alert;
