import React, { memo, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { useVirtualScroll, useDebounceCallback, useIntersectionObserver } from '../../hooks/usePerformanceOptimization';
import OptimizedImage from './OptimizedImage';
import LoadingSpinner from './LoadingSpinner';

// Memoized list item component
const ListItem = memo(({ item, index, style, onClick }) => {
  const handleClick = useCallback(() => {
    onClick?.(item, index);
  }, [item, index, onClick]);

  return (
    <div 
      style={style}
      className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <OptimizedImage
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg mr-4"
        sizes="64px"
        priority={index < 5}
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 truncate">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-blue-600">
            ${item.price}
          </span>
          {item.discount && (
            <span className="text-sm text-red-500 line-through">
              ${item.originalPrice}
            </span>
          )}
        </div>
      </div>
      
      {item.inStock ? (
        <span className="text-green-600 text-sm font-medium">In Stock</span>
      ) : (
        <span className="text-red-600 text-sm font-medium">Out of Stock</span>
      )}
    </div>
  );
});

ListItem.displayName = 'ListItem';

// Virtual scrolling list component
const VirtualizedList = memo(({ 
  items, 
  itemHeight = 120, 
  containerHeight = 600,
  onItemClick,
  renderItem: CustomItem = ListItem
}) => {
  const {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll,
    startIndex
  } = useVirtualScroll({
    items,
    itemHeight,
    containerHeight,
    overscan: 3
  });

  return (
    <div 
      className="overflow-auto border border-gray-300 rounded-lg"
      style={{ height: containerHeight }}
      onScroll={onScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <CustomItem
              key={item.id || startIndex + index}
              item={item}
              index={startIndex + index}
              style={{ height: itemHeight }}
              onClick={onItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

// Infinite scroll component
const InfiniteScrollList = memo(({ 
  items, 
  hasNextPage, 
  isLoading, 
  onLoadMore,
  onItemClick,
  itemHeight = 120
}) => {
  const loadMoreRef = useRef();
  const [isIntersecting] = useIntersectionObserver(loadMoreRef, {
    threshold: 1.0,
    rootMargin: '100px'
  });

  // Debounced load more to prevent multiple calls
  const debouncedLoadMore = useDebounceCallback(onLoadMore, 300);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isLoading) {
      debouncedLoadMore();
    }
  }, [isIntersecting, hasNextPage, isLoading, debouncedLoadMore]);

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          item={item}
          index={index}
          style={{ minHeight: itemHeight }}
          onClick={onItemClick}
        />
      ))}
      
      {hasNextPage && (
        <div 
          ref={loadMoreRef}
          className="flex justify-center py-8"
        >
          {isLoading ? (
            <LoadingSpinner text="Loading more items..." />
          ) : (
            <div className="text-gray-500">Scroll to load more</div>
          )}
        </div>
      )}
    </div>
  );
});

InfiniteScrollList.displayName = 'InfiniteScrollList';

// Main performance optimized list component
const PerformanceOptimizedList = ({
  items = [],
  searchTerm = '',
  sortBy = 'name',
  sortOrder = 'asc',
  onItemClick,
  onSearch,
  virtualized = false,
  infinite = false,
  hasNextPage = false,
  isLoading = false,
  onLoadMore,
  containerHeight = 600,
  itemHeight = 120,
  className = ''
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounced search to avoid excessive API calls
  const debouncedSearch = useDebounceCallback((term) => {
    onSearch?.(term);
  }, 300);

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Memoized filtered and sorted items
  const processedItems = useMemo(() => {
    let filtered = items;

    // Filter by search term
    if (localSearchTerm) {
      const searchLower = localSearchTerm.toLowerCase();
      filtered = items.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort items
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle numeric sorting
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
        
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }

      return 0;
    });

    return filtered;
  }, [items, localSearchTerm, sortBy, sortOrder]);

  // Render appropriate list type
  const renderList = () => {
    if (virtualized) {
      return (
        <VirtualizedList
          items={processedItems}
          itemHeight={itemHeight}
          containerHeight={containerHeight}
          onItemClick={onItemClick}
        />
      );
    }

    if (infinite) {
      return (
        <InfiniteScrollList
          items={processedItems}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          onItemClick={onItemClick}
          itemHeight={itemHeight}
        />
      );
    }

    // Regular list
    return (
      <div className="space-y-0 max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
        {processedItems.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            index={index}
            style={{ minHeight: itemHeight }}
            onClick={onItemClick}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`performance-optimized-list ${className}`}>
      {/* Search and controls */}
      <div className="mb-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => onSearch?.(localSearchTerm, e.target.value, sortOrder)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="createdAt">Sort by Date</option>
            </select>
            
            <button
              onClick={() => onSearch?.(localSearchTerm, sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          {processedItems.length} {processedItems.length === 1 ? 'item' : 'items'} found
        </div>
      </div>

      {/* List content */}
      {processedItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-lg font-medium mb-2">No items found</div>
          <div className="text-sm">Try adjusting your search criteria</div>
        </div>
      ) : (
        renderList()
      )}
    </div>
  );
};

export default memo(PerformanceOptimizedList);
export { VirtualizedList, InfiniteScrollList, ListItem };