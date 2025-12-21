import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const cardVariants = {
  variant: {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    product: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover-lift cursor-pointer',
    stats: 'bg-linear-primary text-white shadow-glow',
    outline: 'border-2 border-gray-300 dark:border-gray-600 bg-transparent',
  },
  padding: {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
};

const Card = forwardRef(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl shadow-md transition-all-smooth';
    const variantStyles = cardVariants.variant[variant];
    const paddingStyles = cardVariants.padding[padding];

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles, paddingStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
