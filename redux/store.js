import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import userInfoSlice from './slice/userSlice';
export const store = configureStore({
  reducer: {
    userInfoSlice: userInfoSlice.reducer,
    cartSlice: cartSlice.reducer
  },
});

