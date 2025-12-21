import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = {
  variant: {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-100',
    success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100',
    error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100',
    accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-100',
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  },
};

const Badge = forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center font-semibold rounded-full transition-all-smooth';
    const variantStyles = badgeVariants.variant[variant];
    const sizeStyles = badgeVariants.size[size];

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
