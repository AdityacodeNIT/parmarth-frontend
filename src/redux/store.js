import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { rootPersistConfig } from './presistConfig';

// Import your slices
import cartReducer from '../features/cart/cartSlice.jsx';
import productReducer from '../features/product/productSlice.jsx';
import orderReducer from '../features/order/orderSlice.jsx';
import addressReducer from '../features/address/addressSlice.jsx'; 
import reviewSlice from  '../features/review/reviewSlice.jsx' // Assuming you have an address slice

import sellerslice from '../features/seller/sellerslice.jsx';
import authSlice  from '@/features/Auth/authSlice';
import wishlistSlice from '@/features/wishlist/wishlistslice.jsx'

// 1️ Combine reducers here
const rootReducer = combineReducers({
  cart: cartReducer,
  product:productReducer,
  order:orderReducer,
  address:addressReducer,
  review:reviewSlice,
  seller:sellerslice,
  auth:authSlice,
  wishlist:wishlistSlice // Assuming you have an address slice
  // add more slices here in future (e.g. user: userReducer)
});

//  Make it persistent
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

//  Create the persistor
export const persistor = persistStore(store);
