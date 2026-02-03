import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProducts, 
  selectShouldRefetchProducts,
  selectCachedProduct 
} from '@/features/product/productSlice';
// Order caching removed - orders should always be fresh

/**
 * Custom hook for smart product caching
 * Automatically fetches products only if cache is expired
 * 
 * @param {Object} options - Fetch options (e.g., { category: 'Snacks' })
 * @returns {Object} - { products, loading, error }
 */
export const useSmartProducts = (options = {}) => {
  const dispatch = useDispatch();
  const shouldRefetch = useSelector(selectShouldRefetchProducts);
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(fetchProducts(options));
    }
  }, [shouldRefetch, dispatch, JSON.stringify(options)]);

  return { products, loading, error };
};

/**
 * Custom hook for smart single product caching
 * Checks cache first, only fetches if expired or not found
 * 
 * @param {string} productId - Product ID to fetch
 * @returns {Object} - { product, loading, error }
 */
export const useSmartProduct = (productId) => {
  const dispatch = useDispatch();
  const cachedProduct = useSelector((state) => selectCachedProduct(state, productId));
  const { currentProduct, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (productId && !cachedProduct) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, cachedProduct, dispatch]);

  return { 
    product: cachedProduct || currentProduct, 
    loading, 
    error 
  };
};

/**
 * Get cache status for debugging (products only)
 * 
 * @returns {Object} - Cache information
 */
export const useCacheStatus = () => {
  const productCache = useSelector((state) => ({
    lastFetched: state.product.lastFetched,
    cacheExpiry: state.product.cacheExpiry,
    isExpired: selectShouldRefetchProducts(state),
    cachedProductCount: Object.keys(state.product.productCache).length,
  }));

  return { productCache };
};
