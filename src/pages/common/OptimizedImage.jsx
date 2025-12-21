import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'blur',
  quality = 75,
  loading = 'lazy',
  sizes,
  priority = false,
  onLoad,
  onError,
  fallback = '/images/placeholder.jpg',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generate responsive image URLs
  const generateSrcSet = (baseSrc, widths = [320, 640, 768, 1024, 1280, 1920]) => {
    if (!baseSrc || baseSrc.startsWith('data:')) return '';
    
    return widths
      .map(w => {
        // If using a CDN like Cloudinary, you can add transformation parameters
        const transformedSrc = baseSrc.includes('cloudinary') 
          ? baseSrc.replace('/upload/', `/upload/w_${w},q_${quality},f_auto/`)
          : baseSrc;
        return `${transformedSrc} ${w}w`;
      })
      .join(', ');
  };

  // WebP support detection
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Convert image to WebP if supported
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc || originalSrc.startsWith('data:')) return originalSrc;
    
    if (supportsWebP() && originalSrc.includes('cloudinary')) {
      return originalSrc.replace('/upload/', `/upload/f_webp,q_${quality}/`);
    }
    
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || currentSrc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(getOptimizedSrc(src));
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, currentSrc, quality]);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.(e);
  };

  // Handle image error
  const handleError = (e) => {
    setIsError(true);
    setCurrentSrc(fallback);
    onError?.(e);
  };

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedSrc(src);
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority, quality]);

  // Placeholder component
  const PlaceholderComponent = () => {
    if (placeholder === 'blur') {
      return (
        <div 
          className={`bg-gray-200 animate-pulse ${className}`}
          style={{ width, height }}
        />
      );
    }
    
    if (placeholder === 'empty') {
      return (
        <div 
          className={`bg-gray-100 ${className}`}
          style={{ width, height }}
        />
      );
    }
    
    return null;
  };

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder */}
      {!isLoaded && !isError && <PlaceholderComponent />}
      
      {/* Main Image */}
      <img
        ref={imgRef}
        src={currentSrc}
        srcSet={currentSrc ? generateSrcSet(currentSrc) : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {/* Error state */}
      {isError && (
        <div className={`
          absolute inset-0 flex items-center justify-center
          bg-gray-100 text-gray-400 text-sm
          ${className}
        `}>
          <div className="text-center">
            <svg 
              className="w-8 h-8 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p>Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Progressive image component with blur-up effect
export const ProgressiveImage = ({ 
  src, 
  placeholder, 
  alt, 
  className,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      <img
        src={currentSrc}
        alt={alt}
        className={`
          transition-all duration-500
          ${!isLoaded ? 'blur-xs scale-110' : 'blur-0 scale-100'}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

// Image gallery with lazy loading
export const ImageGallery = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main image */}
      <OptimizedImage
        src={images[currentIndex]?.src}
        alt={images[currentIndex]?.alt}
        className="w-full aspect-square object-cover rounded-lg"
        priority={currentIndex === 0}
        quality={85}
      />
      
      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              shrink-0 w-16 h-16 rounded-smborder-2 overflow-hidden
              ${index === currentIndex ? 'border-blue-500' : 'border-gray-200'}
            `}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              quality={60}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptimizedImage;