import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import globalSlice from './slice/globalSlice';
import shopDetailsSlice from './slice/shopDetailsSlice';
import userInfoSlice from './slice/userSlice';
import persistSlice from './slice/persistSlice';

export const store = configureStore({
  reducer: {
    userInfoSlice: userInfoSlice.reducer,
    cartSlice: cartSlice.reducer,
    persistSlice: persistSlice.reducer,
    shopDetailsSlice: shopDetailsSlice.reducer, 
    globalSlice: globalSlice.reducer
  },
});

