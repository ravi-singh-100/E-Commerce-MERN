import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/ProductList/ProductListSlice'
import { authReducer } from '../features/auth/authSlice';
import { cartReducer } from '../features/Cart/CartSlice';
import storage from 'redux-persist/lib/storage'
import {  persistReducer } from 'redux-persist'
import { orderReducer } from '../features/Orders/OrdersSlice';
const persistConfig={
  key:'root',
  version:1,
  storage,
}
const rootReducer=combineReducers({
  products: productsReducer,
auth:authReducer,
cart:cartReducer,
order:orderReducer
})
const persistantReducer=persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  // reducer:{
  //   products: productsReducer,
  // auth:authReducer,
  // cart:cartReducer,
  // order:orderReducer
  // }
  reducer:persistantReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false,
}),
});

