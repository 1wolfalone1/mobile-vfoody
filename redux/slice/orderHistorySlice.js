import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listOrderHistory: [],
  listOrderTracking: []
}
const orderHistorySlice = createSlice({
  name: 'orderHistorySlice',
  initialState: initialState,
  reducers: {
    
  },
});

export default orderHistorySlice;

export const persistSliceSelector = (state) => state.orderHistorySlice;
