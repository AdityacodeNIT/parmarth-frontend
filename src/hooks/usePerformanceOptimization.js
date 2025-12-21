import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { debounce, throttle } from '../utils/performanceOptimization';

// Hook for debounced values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttled callbacks
export const useThrottle = (callback, delay) => {
  const throttledCallback = useMemo(
    () => throttle(callback, delay),
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      throttledCallback.cancel();
    };
  }, [throttledCallback]);

  return throttledCallback;
};

// Hook for debounced callbacks
export const useDebounceCallback = (callback, delay) => {
  const debouncedCallback = useMemo(
    () => debounce(callback, delay),
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
};

// Hook for virtual scrolling
export const useVirtualScroll = ({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const onScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll,
    startIndex,
    endIndex
  };
};

// Hook for intersection observer
export const useIntersectionObserver = (
  elementRef,
  { threshold = 0, root = null, rootMargin = '0%' } = {}
) => {
  const [entry, setEntry] = useState();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const updateEntry = useCallback(([entry]) => {
    setEntry(entry);
    setIsIntersecting(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const node = elementRef?.current;
    if (!node || typeof IntersectionObserver !== 'function') {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, updateEntry]);

  return [isIntersecting, entry];
};

// Hook for lazy loading images
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef();

  const [isIntersecting] = useIntersectionObserver(imgRef, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting && src && !isLoaded && !isError) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        setIsError(true);
      };
      
      img.src = src;
    }
  }, [isIntersecting, src, isLoaded, isError]);

  return { imgRef, imageSrc, isLoaded, isError };
};

// Hook for performance monitoring
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const mountTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current += 1;
    const renderTime = Date.now() - mountTime.current;
    
    if (renderTime > 100) {
      console.warn(`Slow render in ${componentName}: ${renderTime}ms`);
    }
  });

  useEffect(() => {
    return () => {
      const totalTime = Date.now() - mountTime.current;
      console.log(`${componentName} unmounted after ${totalTime}ms, ${renderCount.current} renders`);
    };
  }, [componentName]);

  return {
    renderCount: renderCount.current,
    mountTime: mountTime.current
  };
};

// Hook for memory usage monitoring
export const useMemoryMonitor = (interval = 5000) => {
  const [memoryInfo, setMemoryInfo] = useState({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0
  });

  useEffect(() => {
    if (!performance.memory) {
      return;
    }

    const updateMemoryInfo = () => {
      setMemoryInfo({
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      });
    };

    updateMemoryInfo();
    const intervalId = setInterval(updateMemoryInfo, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return memoryInfo;
};

// Hook for network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get connection info if available
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setConnectionType(connection.effectiveType || 'unknown');

      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || 'unknown');
      };

      connection.addEventListener('change', handleConnectionChange);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionType };
};

// Hook for prefetching data
export const usePrefetch = (prefetchFn, shouldPrefetch = true) => {
  const hasPrefetched = useRef(false);

  useEffect(() => {
    if (shouldPrefetch && !hasPrefetched.current) {
      const timer = setTimeout(() => {
        prefetchFn();
        hasPrefetched.current = true;
      }, 100); // Small delay to avoid blocking initial render

      return () => clearTimeout(timer);
    }
  }, [prefetchFn, shouldPrefetch]);

  return hasPrefetched.current;
};

// Hook for idle callback
export const useIdleCallback = (callback, options = {}) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(
        () => callbackRef.current(),
        options
      );
      return () => cancelIdleCallback(id);
    } else {
      // Fallback for browsers without requestIdleCallback
      timeoutRef.current = setTimeout(() => callbackRef.current(), 0);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [options]);
};

// Hook for measuring component performance
export const useComponentPerformance = (componentName) => {
  const startTime = useRef(performance.now());
  const renderTimes = useRef([]);

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    renderTimes.current.push(renderTime);
    
    // Keep only last 10 render times
    if (renderTimes.current.length > 10) {
      renderTimes.current.shift();
    }

    const avgRenderTime = renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length;
    
    if (renderTime > 16) { // More than one frame at 60fps
      console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms (avg: ${avgRenderTime.toFixed(2)}ms)`);
    }

    startTime.current = performance.now();
  });

  return {
    avgRenderTime: renderTimes.current.length > 0 
      ? renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length 
      : 0,
    lastRenderTime: renderTimes.current[renderTimes.current.length - 1] || 0,
    renderCount: renderTimes.current.length
  };
};

export default {
  useDebounce,
  useThrottle,
  useDebounceCallback,
  useVirtualScroll,
  useIntersectionObserver,
  useLazyImage,
  usePerformanceMonitor,
  useMemoryMonitor,
  useNetworkStatus,
  usePrefetch,
  useIdleCallback,
  useComponentPerformance
};