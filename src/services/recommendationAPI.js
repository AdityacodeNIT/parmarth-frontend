import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance for recommendations
const recommendationClient = axios.create({
  baseURL: `${API_BASE_URL}/recommendations`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
recommendationClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add session ID for anonymous tracking
    const sessionId = sessionStorage.getItem('sessionId') || generateSessionId();
    config.headers['X-Session-ID'] = sessionId;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
recommendationClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Recommendation API Error:', error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // Don't redirect for recommendation failures
    }
    
    return Promise.reject(error);
  }
);

// Generate session ID for anonymous users
function generateSessionId() {
  const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  sessionStorage.setItem('sessionId', sessionId);
  return sessionId;
}

export const recommendationAPI = {
  // Get personalized recommendations
  getPersonalizedRecommendations: async (params = {}) => {
    try {
      const response = await recommendationClient.get('/personalized', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get personalized recommendations');
    }
  },

  // Get product-based recommendations ("You may also like")
  getProductRecommendations: async (productId, params = {}) => {
    try {
      const response = await recommendationClient.get(`/product/${productId}`, { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get product recommendations');
    }
  },

  // Get trending products
  getTrendingProducts: async (params = {}) => {
    try {
      const response = await recommendationClient.get('/trending', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get trending products');
    }
  },

  // Get recently viewed products
  getRecentlyViewed: async (params = {}) => {
    try {
      const response = await recommendationClient.get('/recently-viewed', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get recently viewed products');
    }
  },

  // Track user interaction
  trackInteraction: async (interactionData) => {
    try {
      const response = await recommendationClient.post('/track', interactionData);
      return response;
    } catch (error) {
      // Don't throw error for tracking failures to avoid disrupting user experience
      console.warn('Failed to track interaction:', error);
      return { success: false };
    }
  },

  // Get user preferences
  getUserPreferences: async () => {
    try {
      const response = await recommendationClient.get('/preferences');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user preferences');
    }
  },

  // Get category recommendations
  getCategoryRecommendations: async (params = {}) => {
    try {
      const response = await recommendationClient.get('/categories', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get category recommendations');
    }
  },

  // Get user interaction history
  getInteractionHistory: async (params = {}) => {
    try {
      const response = await recommendationClient.get('/history', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get interaction history');
    }
  },

  // Get similar users (for debugging)
  getSimilarUsers: async (params = {}) => {
    try {
      const response = await recommendationClient.get('/similar-users', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get similar users');
    }
  },

  // Get recommendation analytics (admin only)
  getRecommendationAnalytics: async (params = {}) => {
    try {
      const response = await recommendationClient.get('/analytics', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get recommendation analytics');
    }
  }
};

// Recommendation utilities
export const recommendationUtils = {
  // Track page view
  trackPageView: async (productId, duration = 0) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'view',
      duration,
      metadata: {
        page: window.location.pathname,
        referrer: document.referrer
      }
    });
  },

  // Track product click
  trackProductClick: async (productId, context = {}) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'click',
      metadata: {
        ...context,
        page: window.location.pathname
      }
    });
  },

  // Track search result click
  trackSearchClick: async (productId, searchQuery, position) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'search_click',
      metadata: {
        searchQuery,
        position,
        page: window.location.pathname
      }
    });
  },

  // Track add to cart
  trackAddToCart: async (productId, quantity = 1, price) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'add_to_cart',
      metadata: {
        quantity,
        price,
        page: window.location.pathname
      }
    });
  },

  // Track remove from cart
  trackRemoveFromCart: async (productId, quantity = 1) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'remove_from_cart',
      metadata: {
        quantity,
        page: window.location.pathname
      }
    });
  },

  // Track purchase
  trackPurchase: async (productId, quantity, price, orderId) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'purchase',
      metadata: {
        quantity,
        price,
        orderId,
        page: window.location.pathname
      }
    });
  },

  // Track wishlist actions
  trackWishlistAdd: async (productId) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'wishlist_add',
      metadata: {
        page: window.location.pathname
      }
    });
  },

  trackWishlistRemove: async (productId) => {
    return recommendationAPI.trackInteraction({
      productId,
      interactionType: 'wishlist_remove',
      metadata: {
        page: window.location.pathname
      }
    });
  },

  // Batch track multiple interactions
  batchTrackInteractions: async (interactions) => {
    const promises = interactions.map(interaction => 
      recommendationAPI.trackInteraction(interaction)
    );
    
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some interactions failed to track:', error);
    }
  },

  // Get recommendation reasons
  getRecommendationReason: (product) => {
    if (product.recommendationReason) {
      return product.recommendationReason;
    }
    
    if (product.recommendationScore > 0.8) {
      return 'Highly recommended for you';
    } else if (product.recommendationScore > 0.6) {
      return 'Good match for your interests';
    } else {
      return 'You might like this';
    }
  },

  // Format recommendation score
  formatRecommendationScore: (score) => {
    if (!score) return '';
    
    const percentage = Math.round(score * 100);
    if (percentage >= 90) return 'Perfect match';
    if (percentage >= 80) return 'Great match';
    if (percentage >= 70) return 'Good match';
    if (percentage >= 60) return 'Decent match';
    return 'Might interest you';
  },

  // Debounce tracking calls
  debounceTrack: (() => {
    const timeouts = new Map();
    
    return (key, trackFunction, delay = 1000) => {
      if (timeouts.has(key)) {
        clearTimeout(timeouts.get(key));
      }
      
      const timeoutId = setTimeout(() => {
        trackFunction();
        timeouts.delete(key);
      }, delay);
      
      timeouts.set(key, timeoutId);
    };
  })(),

  // Local storage for offline tracking
  saveOfflineInteraction: (interaction) => {
    try {
      const offline = JSON.parse(localStorage.getItem('offlineInteractions') || '[]');
      offline.push({
        ...interaction,
        timestamp: Date.now()
      });
      
      // Keep only last 100 interactions
      if (offline.length > 100) {
        offline.splice(0, offline.length - 100);
      }
      
      localStorage.setItem('offlineInteractions', JSON.stringify(offline));
    } catch (error) {
      console.warn('Failed to save offline interaction:', error);
    }
  },

  // Sync offline interactions when online
  syncOfflineInteractions: async () => {
    try {
      const offline = JSON.parse(localStorage.getItem('offlineInteractions') || '[]');
      
      if (offline.length === 0) return;
      
      const promises = offline.map(interaction => 
        recommendationAPI.trackInteraction(interaction)
      );
      
      await Promise.allSettled(promises);
      
      // Clear synced interactions
      localStorage.removeItem('offlineInteractions');
      
      console.log(`Synced ${offline.length} offline interactions`);
    } catch (error) {
      console.warn('Failed to sync offline interactions:', error);
    }
  }
};

// Auto-sync offline interactions when online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    recommendationUtils.syncOfflineInteractions();
  });
  
  // Sync on page load if online
  if (navigator.onLine) {
    setTimeout(() => {
      recommendationUtils.syncOfflineInteractions();
    }, 1000);
  }
}

export default recommendationAPI;