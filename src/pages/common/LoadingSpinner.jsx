import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  };

  const spinnerClass = `${sizeClasses[size]} ${colorClasses[color]} animate-spin`;

  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg 
        className={spinnerClass}
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
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={`text-sm ${colorClasses[color]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {content}
    </div>
  );
};

// Skeleton loader for better perceived performance
export const SkeletonLoader = ({ 
  lines = 3, 
  height = 'h-4', 
  className = '' 
}) => {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={`bg-gray-200 rounded-sm ${height} ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

// Card skeleton for product cards
export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="bg-gray-200 h-4 rounded-sm w-3/4" />
        <div className="bg-gray-200 h-4 rounded-sm w-1/2" />
        <div className="bg-gray-200 h-6 rounded-sm w-1/3" />
      </div>
    </div>
  );
};

// List skeleton
export const ListSkeleton = ({ items = 5, itemHeight = 'h-16' }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className={`animate-pulse bg-gray-200 rounded-sm${itemHeight}`} />
      ))}
    </div>
  );
};

export default LoadingSpinner;