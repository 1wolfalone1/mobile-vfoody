import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import globalSlice from './slice/globalSlice';
import shopDetailsSlice from './slice/shopDetailsSlice';
import userInfoSlice from './slice/userSlice';
export const store = configureStore({
  reducer: {
    userInfoSlice: userInfoSlice.reducer,
    cartSlice: cartSlice.reducer,
    shopDetailsSlice: shopDetailsSlice.reducer, 
    globalSlice: globalSlice.reducer
  },
});

