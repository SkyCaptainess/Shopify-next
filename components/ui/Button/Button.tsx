import cn from 'classnames';
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'inverted';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
  size?: 'normal' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'default',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    size = 'normal',
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    styles.root,
    {
      [styles.default]: variant === 'default',
      [styles.primary]: variant === 'primary',
      [styles.inverted]: variant === 'inverted',
      [styles.normal]: size === 'normal',
      [styles.medium]: size === 'medium',
      [styles.large]: size === 'large',
      [styles.loading]: loading,
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && <span>....</span>}
    </Component>
  );
});

export default Button;
