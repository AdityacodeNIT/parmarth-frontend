import { useEffect, useRef, useState, useCallback } from 'react';

// Performance monitoring hook
export const usePerformanceMonitoring = (componentName) => {
  const mountTime = useRef(Date.now());
  const renderCount = useRef(0);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    renderCount.current += 1;
    
    // Measure component mount time
    const mountDuration = Date.now() - mountTime.current;
    
    // Log performance metrics
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName}:`, {
        mountTime: `${mountDuration}ms`,
        renderCount: renderCount.current
      });
    }

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      mountTime: mountDuration,
      renderCount: renderCount.current,
      lastRender: Date.now()
    }));
  }, [componentName]);

  return metrics;
};

// Web Vitals monitoring hook
export const useWebVitals = () => {
  const [vitals, setVitals] = useState({});

  useEffect(() => {
    // Dynamic import to avoid bundle size impact
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(metric => setVitals(prev => ({ ...prev, cls: metric })));
      getFID(metric => setVitals(prev => ({ ...prev, fid: metric })));
      getFCP(metric => setVitals(prev => ({ ...prev, fcp: metric })));
      getLCP(metric => setVitals(prev => ({ ...prev, lcp: metric })));
      getTTFB(metric => setVitals(prev => ({ ...prev, ttfb: metric })));
    }).catch(error => {
      console.warn('Web Vitals not available:', error);
    });
  }, []);

  return vitals;
};

// Memory usage monitoring hook
export const useMemoryMonitoring = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMemoryInfo({
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          timestamp: Date.now()
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

// Network monitoring hook
export const useNetworkMonitoring = () => {
  const [networkInfo, setNetworkInfo] = useState(null);

  useEffect(() => {
    const updateNetworkInfo = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        setNetworkInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
          timestamp: Date.now()
        });
      }
    };

    updateNetworkInfo();
    
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      connection.addEventListener('change', updateNetworkInfo);
      
      return () => {
        connection.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  return networkInfo;
};

// Performance observer hook for custom metrics
export const usePerformanceObserver = (entryTypes = ['navigation', 'resource']) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const newEntries = list.getEntries();
      setEntries(prev => [...prev, ...newEntries]);
    });

    try {
      observer.observe({ entryTypes });
    } catch (error) {
      console.warn('PerformanceObserver error:', error);
    }

    return () => {
      observer.disconnect();
    };
  }, [entryTypes]);

  return entries;
};

// Render performance hook
export const useRenderPerformance = (componentName) => {
  const renderStart = useRef(null);
  const [renderMetrics, setRenderMetrics] = useState({});

  const startRender = useCallback(() => {
    renderStart.current = performance.now();
  }, []);

  const endRender = useCallback(() => {
    if (renderStart.current) {
      const renderTime = performance.now() - renderStart.current;
      setRenderMetrics(prev => ({
        ...prev,
        [componentName]: {
          lastRenderTime: renderTime,
          averageRenderTime: prev[componentName] 
            ? (prev[componentName].averageRenderTime + renderTime) / 2 
            : renderTime,
          renderCount: (prev[componentName]?.renderCount || 0) + 1
        }
      }));
      renderStart.current = null;
    }
  }, [componentName]);

  return { startRender, endRender, renderMetrics };
};

// Bundle size monitoring hook
export const useBundleAnalysis = () => {
  const [bundleInfo, setBundleInfo] = useState(null);

  useEffect(() => {
    // Analyze loaded scripts
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    const totalScriptSize = scripts.reduce((total, script) => {
      // This is an approximation - in real scenarios you'd need server-side bundle analysis
      return total + (script.src.length * 100); // Rough estimate
    }, 0);

    setBundleInfo({
      scriptCount: scripts.length,
      stylesheetCount: stylesheets.length,
      estimatedSize: totalScriptSize,
      scripts: scripts.map(s => s.src),
      stylesheets: stylesheets.map(s => s.href)
    });
  }, []);

  return bundleInfo;
};

// Custom performance hook for specific operations
export const useOperationPerformance = () => {
  const [operations, setOperations] = useState({});

  const measureOperation = useCallback((operationName, operation) => {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      
      Promise.resolve(operation())
        .then(result => {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          setOperations(prev => ({
            ...prev,
            [operationName]: {
              lastDuration: duration,
              averageDuration: prev[operationName]
                ? (prev[operationName].averageDuration + duration) / 2
                : duration,
              executionCount: (prev[operationName]?.executionCount || 0) + 1,
              lastExecuted: Date.now()
            }
          }));
          
          resolve(result);
        })
        .catch(error => {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          setOperations(prev => ({
            ...prev,
            [operationName]: {
              ...prev[operationName],
              lastError: error.message,
              errorCount: (prev[operationName]?.errorCount || 0) + 1,
              lastDuration: duration
            }
          }));
          
          reject(error);
        });
    });
  }, []);

  return { operations, measureOperation };
};

// Performance reporting hook
export const usePerformanceReporting = () => {
  const webVitals = useWebVitals();
  const memoryInfo = useMemoryMonitoring();
  const networkInfo = useNetworkMonitoring();
  const bundleInfo = useBundleAnalysis();

  const generateReport = useCallback(() => {
    return {
      timestamp: Date.now(),
      webVitals,
      memory: memoryInfo,
      network: networkInfo,
      bundle: bundleInfo,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      url: window.location.href
    };
  }, [webVitals, memoryInfo, networkInfo, bundleInfo]);

  const sendReport = useCallback(async (endpoint = '/api/performance') => {
    try {
      const report = generateReport();
      
      if (navigator.sendBeacon) {
        // Use sendBeacon for better reliability
        navigator.sendBeacon(endpoint, JSON.stringify(report));
      } else {
        // Fallback to fetch
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report)
        }).catch(error => {
          console.warn('Failed to send performance report:', error);
        });
      }
    } catch (error) {
      console.warn('Error generating performance report:', error);
    }
  }, [generateReport]);

  return { generateReport, sendReport };
};