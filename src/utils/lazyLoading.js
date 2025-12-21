import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Higher-order component for lazy loading with error boundary
export const withLazyLoading = (importFunc, fallback = <LoadingSpinner />) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Preload component for better UX
export const preloadComponent = (importFunc) => {
  const componentImport = importFunc();
  return componentImport;
};

// Route-based code splitting
export const createLazyRoute = (importFunc, fallback) => {
  return withLazyLoading(importFunc, fallback);
};

// Component-based lazy loading with retry mechanism
export const withRetryLazyLoading = (importFunc, retries = 3) => {
  const LazyComponent = lazy(() => 
    importFunc().catch(error => {
      console.error('Failed to load component:', error);
      
      // Retry mechanism
      let retryCount = 0;
      const retry = () => {
        if (retryCount < retries) {
          retryCount++;
          console.log(`Retrying component load (${retryCount}/${retries})`);
          return importFunc();
        }
        throw error;
      };
      
      return retry();
    })
  );
  
  return (props) => (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Intersection Observer based lazy loading for components
export const withIntersectionLazyLoading = (importFunc, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    fallback = <div style={{ height: '200px' }} />
  } = options;
  
  return (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef();
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsVisible(true);
            setIsLoaded(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => observer.disconnect();
    }, [isLoaded, threshold, rootMargin]);
    
    if (!isVisible) {
      return <div ref={ref}>{fallback}</div>;
    }
    
    const LazyComponent = lazy(importFunc);
    
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};