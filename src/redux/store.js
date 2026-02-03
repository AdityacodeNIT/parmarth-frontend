import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { rootPersistConfig } from './presistConfig';

// Import your slices
import cartReducer from '../features/cart/cartSlice.jsx';
import productReducer from '../features/product/productSlice.jsx';
import orderReducer from '../features/product/orderSlice.jsx'; // Using product/orderSlice which components use
import addressReducer from '../features/address/addressSlice.jsx'; 
import reviewSlice from  '../features/review/reviewSlice.jsx' // Assuming you have an address slice

import sellerslice from '../features/seller/sellerslice.jsx';
import authSlice  from '@/features/Auth/authSlice';
import wishlistSlice from '@/features/wishlist/wishlistslice.jsx'
import searchSlice from '@/features/search/searchslice.jsx'
import returnReducer from '../features/return/returnSlice.jsx';

// 1️ Combine reducers here
const rootReducer = combineReducers({
  cart: cartReducer,
  product:productReducer,
  order:orderReducer,
  address:addressReducer,
  review:reviewSlice,
  seller:sellerslice,
  auth:authSlice,
  wishlist:wishlistSlice,
  search:searchSlice, // Assuming you have an address slice
  return:returnReducer,
});

//  Make it persistent
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

//  Create the persistor
export const persistor = persistStore(store);
