// persistConfig.js
import storage from 'redux-persist/lib/storage';

export const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart','product','order','address'], // slices to persist
};
