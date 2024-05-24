import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from './slice/userSlice';
export const store = configureStore({
  reducer: {
    userInfoSlice: userInfoSlice.reducer,
  },
});

