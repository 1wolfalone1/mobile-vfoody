import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
  info: null,
  listPromotion: null,
  listRecentFood: null,
  listProduct: null,
  page: 1,
  total: 0,
  pageSize: 6,
};
const shopDetailsSlice = createSlice({
  name: 'shopDetailsSlice ',
  initialState: initialState,
  reducers: {
    changeUserInfo: (state, actions) => {
      return actions.payload;
    },
    resetState: (state, actions) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getListPromotionInShop.fulfilled, (state, action) => {
        state.listPromotion = action.payload;
      })
      .addCase(getListPromotionInShop.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getShopInfo.fulfilled, (state, action) => {
        state.info = action.payload;
      })
      .addCase(getShopInfo.rejected, (state, action) => {
        console.log(action.payload);
      }),
});

export const getShopInfo = createAsyncThunk('/shopDetails/getShopInfo', async (id) => {
  try {
    const res = await api.get('/api/v1/shop/info', {
      params: {
        shopId: 1,
      },
    });
    const data = await res.data;
    console.log(data);
    return data.value;
  } catch (err) {
    console.log(err);
    throw err;
  }
});
export const getListPromotionInShop = createAsyncThunk(
  '/shopDetails/getListPromotionInShop',
  async (id) => {
    try {
      const res = await api.get('/api/v1/customer/promotion/shop/1');
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
);
export default shopDetailsSlice;

export const listPromotionShopSelector = (state) => state.shopDetailsSlice.listPromotion;
export const shopInfoSelector = (state) => state.shopDetailsSlice.info;
