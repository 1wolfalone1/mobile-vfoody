import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
  info: null,
  listPromotion: null,
  listRecentFood: null,
  listBestProduct: null,
  listAllProduct: null,
  page: 2,
  total: 0,
  pageSize: 7,
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
      })
      .addCase(getListBestProduct.fulfilled, (state, action) => {
        state.listBestProduct = action.payload;
      })
      .addCase(getListBestProduct.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getListAllProductsInShop.fulfilled, (state, action) => {
        state.listAllProduct = action.payload;
      })
});
export const getListAllProductsInShop = createAsyncThunk(
  '/shopDetails/listAllProductsInShop',
  async (id, {getState}) => { 
    try {
      const state = getState().shopDetailsSlice;
      console.log(state , "asdfasfd ")
      const res = await api.get('/api/v1/shop/product', {
        params: {
          shopId: id,
          pageIndex: state.page,
          pageSize: state.pageSize,
        },
      });
      const data = await res.data;
      console.log(data, '  list all product shop api');
      return data.value.items;
    } catch (err) {
      console.log(err, ' error list all product ');
      throw err;
    }
  },
);
export const getListBestProduct = createAsyncThunk(
  '/shopDetails/getListBestProduct',
  async (id) => {
    try {
      const res = await api.get('/api/v1/shop/' + id + '/product/top', {});
      const data = await res.data;
      console.log(data, '  list best product shop api');
      return data.value.items;
    } catch (err) {
      console.log(err, ' error list best product ');
      throw err;
    }
  },
);
export const getShopInfo = createAsyncThunk('/shopDetails/getShopInfo', async (id) => {
  try {
    const res = await api.get('/api/v1/shop/info', {
      params: {
        shopId: id,
      },
    });
    const data = await res.data;
    console.log(data, ' shopInfo api');
    return data.value;
  } catch (err) {
    console.log(err, ' error shopDetails info');
    throw err;
  }
});
export const getListPromotionInShop = createAsyncThunk(
  '/shopDetails/getListPromotionInShop',
  async (id) => {
    try {
      const res = await api.get('/api/v1/customer/promotion/shop/' + id);
      const data = await res.data;
      console.log(data, ' promotion api in slice shopDetails ');
      return data?.value?.items;
    } catch (err) {
      console.log(err, ' error getting promotion');
      throw err;
    }
  },
);
export default shopDetailsSlice;

export const listPromotionShopSelector = (state) => state.shopDetailsSlice.listPromotion;
export const shopInfoSelector = (state) => state.shopDetailsSlice.info;
export const listBestProductSelector = (state) => state.shopDetailsSlice.listBestProduct;
export const listAllProductSelector = (state) => state.shopDetailsSlice.listAllProduct;
