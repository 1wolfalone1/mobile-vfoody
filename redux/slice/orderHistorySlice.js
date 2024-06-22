import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
  listOrderHistory: [],
  listOrderTracking: [],
};
const orderHistorySlice = createSlice({
  name: 'orderHistorySlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getListOrderHistory.fulfilled,
         (state, actions) => {
          console.log(actions.payload, ' actions payload in order history')
        state.listOrderHistory = actions.payload.items;
      })
      .addCase(getListOrderHistory.rejected, (state, actions) => {
        console.log(actions.payload);
      }),
});
export const getListOrderHistory = createAsyncThunk(
  'orderHistorySlice/getListOrderHistory',
  async ({ accountId, pageIndex, pageSize }, { getState }) => {
    try {
      const res = await api.get('/api/v1/customer/order/history', {
        params: {
          accountId: accountId,
          pageIndex: pageIndex,
          pageSize: pageSize,
          status: 4,
        },
      });

      const data = await res.data;
      console.log(data, ' order history api response');
      return data.value;
    } catch (e) {
      console.log(e);
    }
  },
);
export default orderHistorySlice;

export const orderHistorySliceSelector = (state) => state.orderHistorySlice;
