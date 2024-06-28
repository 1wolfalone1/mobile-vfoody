import { createSlice } from '@reduxjs/toolkit';

const shopOwnerSlice = createSlice({
  name: 'shopOwnerSlice',
  initialState: {
    info: {},
  },
  reducers: {
    updateInfo: (state, actions) => {
      state.info = actions.payload;
    },
  },
});

export default shopOwnerSlice;

export const shopOwnerSliceSelector = (state) => state.shopOwnerSlice;
