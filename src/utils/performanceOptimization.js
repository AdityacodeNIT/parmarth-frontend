// Performance optimization utilities
import { debounce, throttle } from 'lodash';

// Debounced search function
export const createDebouncedSearch = (searchFunction, delay = 300) => {
    return debounce(searchFunction, delay);
};

// Throttled scroll handler
export const createThrottledScrollHandler = (handler, delay = 100) => {
    return throttle(handler, delay);
};

// Virtual scrolling implementation
export class VirtualScroller {
    constructor(container, itemHeight, renderItem, totalItems) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.renderItem = renderItem;
        this.totalItems = totalItems;
        this.visibleStart = 0;
        this.visibleEnd = 0;
        this.scrollTop = 0;

        this.init();
    }

    init() {
        this.containerHeight = this.container.clientHeight;
        this.visibleCount = Math.ceil(this.containerHeight / this.itemHeight) + 1;
        this.totalHeight = this.totalItems * this.itemHeight;

        // Create viewport
        this.viewport = document.createElement('div');
        this.viewport.style.height = `${this.totalHeight}px`;
        this.viewport.style.position = 'relative';

        // Create visible items container
        this.itemsContainer = document.createElement('div');
        this.itemsContainer.style.position = 'absolute';
        this.itemsContainer.style.top = '0';
        this.itemsContainer.style.width = '100%';

        this.viewport.appendChild(this.itemsContainer);
        this.container.appendChild(this.viewport);

        // Add scroll listener
        this.container.addEventListener('scroll', this.handleScroll.bind(this));

        this.updateVisibleItems();
    }

    handleScroll() {
        this.scrollTop = this.container.scrollTop;
        this.updateVisibleItems();
    }

    updateVisibleItems() {
        const startIndex = Math.floor(this.scrollTop / this.itemHeight);
        const endIndex = Math.min(startIndex + this.visibleCount, this.totalItems);

        if (startIndex !== this.visibleStart || endIndex !== this.visibleEnd) {
            this.visibleStart = startIndex;
            this.visibleEnd = endIndex;
            this.renderVisibleItems();
        }
    }

    renderVisibleItems() {
        // Clear existing items
        this.itemsContainer.innerHTML = '';

        // Set container position
        this.itemsContainer.style.transform = `translateY(${this.visibleStart * this.itemHeight}px)`;

        // Render visible items
        for (let i = this.visibleStart; i < this.visibleEnd; i++) {
            const item = this.renderItem(i);
            item.style.height = `${this.itemHeight}px`;
            this.itemsContainer.appendChild(item);
        }
    }

    scrollToIndex(index) {
        const scrollTop = index * this.itemHeight;
        this.container.scrollTop = scrollTop;
    }

    destroy() {
        this.container.removeEventListener('scroll', this.handleScroll);
        this.container.innerHTML = '';
    }
}

// Image lazy loading with Intersection Observer
export class LazyImageLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px',
            threshold: 0.1,
            ...options
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.options
        );
    }

    observe(img) {
        this.observer.observe(img);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src;

                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    this.observer.unobserve(img);
                }
            }
        });
    }

    disconnect() {
        this.observer.disconnect();
    }
}

// Bundle splitting utilities
export const loadChunk = async (chunkName) => {
    try {
        const module = await import(/* webpackChunkName: "[request]" */ `../chunks/${chunkName}`);
        return module.default || module;
    } catch (error) {
        console.error(`Failed to load chunk: ${chunkName}`, error);
        throw error;
    }
};

// Resource preloading
export const preloadResource = (href, as, type = null) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;

    if (type) {
        link.type = type;
    }

    document.head.appendChild(link);

    return new Promise((resolve, reject) => {
        link.onload = resolve;
        link.onerror = reject;
    });
};

// DNS prefetch
export const prefetchDNS = (hostname) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = hostname;
    document.head.appendChild(link);
};

// Preconnect to external domains
export const preconnect = (href, crossorigin = false) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;

    if (crossorigin) {
        link.crossOrigin = 'anonymous';
    }

    document.head.appendChild(link);
};

// Critical CSS inlining
export const inlineCriticalCSS = (css) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
};

// Font loading optimization
export const loadFont = (fontFamily, fontUrl, fontDisplay = 'swap') => {
    const fontFace = new FontFace(fontFamily, `url(${fontUrl})`, {
        display: fontDisplay
    });

    return fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont);
        return loadedFont;
    });
};

// Memory management utilities
export class MemoryManager {
    constructor() {
        this.cache = new Map();
        this.maxSize = 100; // Maximum cache entries
    }

    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            // Remove oldest entry
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const entry = this.cache.get(key);
        if (entry) {
            // Update timestamp for LRU
            entry.timestamp = Date.now();
            return entry.value;
        }
        return null;
    }

    clear() {
        this.cache.clear();
    }

    cleanup(maxAge = 5 * 60 * 1000) { // 5 minutes default
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > maxAge) {
                this.cache.delete(key);
            }
        }
    }
}

// Performance monitoring
export class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = [];
    }

    startTiming(name) {
        this.metrics.set(name, {
            startTime: performance.now(),
            endTime: null,
            duration: null
        });
    }

    endTiming(name) {
        const metric = this.metrics.get(name);
        if (metric) {
            metric.endTime = performance.now();
            metric.duration = metric.endTime - metric.startTime;

            // Log slow operations
            if (metric.duration > 100) {
                console.warn(`Slow operation detected: ${name} took ${metric.duration.toFixed(2)}ms`);
            }
        }
    }

    getTiming(name) {
        return this.metrics.get(name);
    }

    getAllTimings() {
        return Object.fromEntries(this.metrics);
    }

    observeLCP() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(observer);
    }

    observeFID() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });

        observer.observe({ entryTypes: ['first-input'] });
        this.observers.push(observer);
    }

    observeCLS() {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            });
        });

        observer.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(observer);
    }

    disconnect() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Create global instances
export const memoryManager = new MemoryManager();
export const performanceMonitor = new PerformanceMonitor();
export const lazyImageLoader = new LazyImageLoader();

// Initialize performance monitoring
if (typeof window !== 'undefined') {
    performanceMonitor.observeLCP();
    performanceMonitor.observeFID();
    performanceMonitor.observeCLS();

    // Cleanup memory cache periodically
    setInterval(() => {
        memoryManager.cleanup();
    }, 5 * 60 * 1000); // Every 5 minutes
}

// Export utility functions
export {
    debounce,
    throttle
};