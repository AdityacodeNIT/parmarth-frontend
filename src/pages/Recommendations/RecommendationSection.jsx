import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';
import LoadingSpinner from '../common/LoadingSpinner';
import { recommendationAPI } from '../../services/recommendationAPI';

const RecommendationSection = ({ 
  title, 
  type, 
  userId, 
  productId, 
  category,
  limit = 10,
  className = "",
  showViewAll = true 
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadRecommendations();
  }, [type, userId, productId, category, limit]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      switch (type) {
        case 'personalized':
          response = await recommendationAPI.getPersonalizedRecommendations({ limit });
          break;
        case 'product-based':
          response = await recommendationAPI.getProductRecommendations(productId, { limit });
          break;
        case 'trending':
          response = await recommendationAPI.getTrendingProducts({ category, limit });
          break;
        case 'recently-viewed':
          response = await recommendationAPI.getRecentlyViewed({ limit });
          break;
        default:
          throw new Error('Invalid recommendation type');
      }

      if (response.success) {
        const products = response.data.recommendations || response.data.products || [];
        setRecommendations(products);
      } else {
        throw new Error(response.message || 'Failed to load recommendations');
      }
    } catch (error) {
      console.error('Failed to load recommendations:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, recommendations.length - getVisibleCount());
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const getVisibleCount = () => {
    // Responsive visible count
    if (window.innerWidth >= 1280) return 5; // xl
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 3;  // md
    if (window.innerWidth >= 640) return 2;  // sm
    return 1; // xs
  };

  const handleProductClick = async (product) => {
    // Track interaction
    try {
      await recommendationAPI.trackInteraction({
        productId: product._id,
        interactionType: 'click',
        metadata: {
          recommendationType: type,
          recommendationReason: product.recommendationReason
        }
      });
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }

    // Navigate to product page
    window.location.href = `/product/${product._id}`;
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    
    try {
      // Track interaction
      await recommendationAPI.trackInteraction({
        productId: product._id,
        interactionType: 'add_to_cart',
        metadata: {
          recommendationType: type,
          price: product.price
        }
      });

      // Add to cart logic here
      console.log('Added to cart:', product.name);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleAddToWishlist = async (product, e) => {
    e.stopPropagation();
    
    try {
      // Track interaction
      await recommendationAPI.trackInteraction({
        productId: product._id,
        interactionType: 'wishlist_add',
        metadata: {
          recommendationType: type
        }
      });

      // Add to wishlist logic here
      console.log('Added to wishlist:', product.name);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className={`recommendation-section ${className}`}>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner text="Loading recommendations..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`recommendation-section ${className}`}>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Failed to load recommendations</p>
          <button 
            onClick={loadRecommendations}
            className="px-4 py-2 bg-blue-600 text-white rounded-smhover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  const visibleCount = getVisibleCount();
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < recommendations.length - visibleCount;

  return (
    <div className={`recommendation-section ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showViewAll && recommendations.length > visibleCount && (
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </button>
        )}
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                     bg-white shadow-lg rounded-full p-2 hover:bg-gray-50
                     border border-gray-200 transition-all duration-200"
            style={{ marginLeft: '-20px' }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                     bg-white shadow-lg rounded-full p-2 hover:bg-gray-50
                     border border-gray-200 transition-all duration-200"
            style={{ marginRight: '-20px' }}
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        )}

        {/* Products Grid */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
            }}
          >
            {recommendations.map((product, index) => (
              <ProductCard
                key={product._id || index}
                product={product}
                onClick={() => handleProductClick(product)}
                onAddToCart={(e) => handleAddToCart(product, e)}
                onAddToWishlist={(e) => handleAddToWishlist(product, e)}
                style={{ minWidth: `${100 / visibleCount}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation Reason */}
      {recommendations[0]?.recommendationReason && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          {recommendations[0].recommendationReason}
        </div>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onClick, onAddToCart, onAddToWishlist, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div 
      className="bg-white rounded-lg shadow-xs border border-gray-200 
               hover:shadow-md transition-all duration-200 cursor-pointer
               group overflow-hidden"
      style={style}
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <OptimizedImage
          src={product.ProductImage || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onAddToWishlist}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Recommendation Score */}
        {product.recommendationScore && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {Math.round(product.recommendationScore * 100)}% match
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 ml-1">
                {product.rating.toFixed(1)}
              </span>
            </div>
            {product.reviewCount > 0 && (
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(discountedPrice)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                   hover:bg-blue-700 transition-colors duration-200
                   flex items-center justify-center gap-2 text-sm font-medium"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecommendationSection;