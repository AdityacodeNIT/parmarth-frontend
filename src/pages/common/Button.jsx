import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const buttonVariants = {
  variant: {
    primary: 'bg-linear-primary text-white hover:opacity-90 shadow-md hover:shadow-lg',
    secondary: 'bg-linear-secondary text-white hover:opacity-90 shadow-md hover:shadow-lg',
    accent: 'bg-linear-accent text-gray-900 hover:opacity-90 shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-950',
    ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    danger: 'bg-error-500 text-white hover:bg-error-600 shadow-md hover:shadow-lg',
    success: 'bg-success-500 text-white hover:bg-success-600 shadow-md hover:shadow-lg',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-xl',
  },
};

const Button = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all-smooth focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full';

    const variantStyles = buttonVariants.variant[variant];
    const sizeStyles = buttonVariants.size[size];

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
