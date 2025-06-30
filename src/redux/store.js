import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { rootPersistConfig } from './presistConfig';

// Import your slices
import cartReducer from '../features/cart/cartSlice.jsx';
import productReducer from '../features/product/productSlice.jsx';
import orderReducer from '../features/product/orderSlice.jsx';
import addressReducer from '../features/address/addressSlice.jsx'; // Assuming you have an address slice

// 1️⃣ Combine reducers here
const rootReducer = combineReducers({
  cart: cartReducer,
  product:productReducer,
  order:orderReducer,
  address:addressReducer, // Assuming you have an address slice
  // add more slices here in future (e.g. user: userReducer)
});

// 2️⃣ Make it persistent
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// 3️⃣ Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

// 4️⃣ Create the persistor
export const persistor = persistStore(store);
