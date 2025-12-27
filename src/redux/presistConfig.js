// persistConfig.js
import storage from 'redux-persist/lib/storage';

export const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart','address','auth','wishlist'], // slices to persist
};
