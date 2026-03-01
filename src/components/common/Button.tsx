import React from 'react';

type ButtonVariant = 'primary' | 'danger' | 'success' | 'ghost' | 'outline';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/** Generic button with variant, size, and loading state support */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...rest
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full-width' : '',
    loading   ? 'btn--loading'   : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="btn-spinner" aria-hidden />}
      {!loading && leftIcon && <span className="btn-icon btn-icon--left">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="btn-icon btn-icon--right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
