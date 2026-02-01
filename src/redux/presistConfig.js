// persistConfig.js
import storage from 'redux-persist/lib/storage';

export const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'address', 'wishlist'], // ❌ Removed 'auth' - don't persist auth in localStorage
  // Auth should rely on httpOnly cookies only for security
};
