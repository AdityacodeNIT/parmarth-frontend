// persistConfig.js
import storage from 'redux-persist/lib/storage';

export const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'address', 'wishlist', 'product'], // Product caching OK, order should be fresh
  // Auth should rely on httpOnly cookies only for security
};
