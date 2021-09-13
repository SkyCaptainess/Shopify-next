import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import classNames from 'classnames';
import { Spinner } from '..';

type Variant = 'primary' | 'inverse' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: Variant;
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  component?: string | JSXElementConstructor<any>;
  width?: number;
  loading?: boolean;
  disabled?: boolean;
  size?: Size;
}

const variants = {
  primary: 'bg-primary text-white hover:bg-gray-50:text-primary',
  inverse: 'bg-white text-primary hover:bg-primary:text-white border-primary',
  danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'primary',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    size = 'sm',
    style = {},
    component = 'button',
    ...rest
  } = props;
  const ref = useRef<typeof component>(null);

  const Component = component;

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={classNames(
        'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <span className='ml-2'>
          <Spinner variant='light' />
        </span>
      )}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
