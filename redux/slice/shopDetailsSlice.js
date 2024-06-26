import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

import { enableMapSet } from 'immer';

enableMapSet();
const initialState = {
  info: null,
  listPromotion: null,
  listRecentFood: null,
  listBestProduct: null,
  listAllProduct: null,
  product: {
    info: null,
    topping: [],
    toppingSelected: {
      radio: {},
      checkbox: {},
    },
  },
  page: 1,
  total: 0,
  totalPage: 0,
  pageSize: 4,
};
const shopDetailsSlice = createSlice({
  name: 'shopDetailsSlice ',
  initialState: initialState,
  reducers: {
    toggleFavouriteShop: (state, action) => {
      if (state.info) {
        state.info.isFavouriteShop = !state.info.isFavouriteShop;
      }
    },
    changeUserInfo: (state, actions) => {
      return actions.payload;
    },
    resetState: (state, actions) => initialState,
    resetProductDetails: (state, actions) => {
      state.product = initialState.product;
    },

    addToppingRadio: (state, actions) => {
      const { toppingId, optionId } = actions.payload;
      if (optionId == -1) {
        state.product.toppingSelected.radio[toppingId] = undefined;
        return;
      }
      const item = state.product.topping.find((item) => item.id === toppingId);
      console.log(optionId, ' optinnnnnnnnnnnnnnnnnnn');
      if (item) {
        toppingInCart = state.product.toppingSelected.radio[toppingId];
        console.log('22222222222222222222222222222');
        const newOption = item.options.find((option) => option.id === optionId);
        state.product.toppingSelected.radio[toppingId] = {
          optionId: optionId,
          topping: item,
          option: newOption,
        };
      }
    },
    addToppingCheckbox: (state, actions) => {
      console.log(actions.payload);
      const toppingId = actions.payload.toppingId;
      const checks = actions.payload.checks;
      if (checks.length == 0) {
        if (state.product.toppingSelected.checkbox[toppingId]) {
          state.product.toppingSelected.checkbox[toppingId] = undefined;
          return;
        }
      }
      const topping = state.product.topping.find((item) => item.id === toppingId);
      const listOption = topping.options.filter((item) => {
        if (checks.find((optionId) => optionId === item.id)) {
          return true;
        } else {
          return false;
        }
      });
      state.product.toppingSelected.checkbox[toppingId] = {
        toppingId: toppingId,
        topping: topping,
        options: listOption,
      };
    },
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
        state.pageSize = action.payload.pageSize;
        state.page = action.payload.pageIndex;
        state.totalPage = action.payload.totalOfPages;
        state.listAllProduct = action.payload.items;
      })
      .addCase(addMoreProductInShopDetails.fulfilled, (state, action) => {
        state.pageSize = action.payload.pageSize;
        state.page = action.payload.pageIndex;
        state.totalPage = action.payload.totalOfPages;
        state.listAllProduct = [...state.listAllProduct, ...action.payload.items];
      })
      .addCase(addMoreProductInShopDetails.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getProductDetailsById.fulfilled, (state, action) => {
        const { questions, ...info } = action.payload;

        state.product.info = info;
        state.product.topping = questions;
      })
      .addCase(getProductDetailsById.rejected, (state, action) => {
        console.log(action.payload);
      }),
});
export const getProductDetailsById = createAsyncThunk(
  '/shopDetails/getProductDetailsById',
  async (id, { getState }) => {
    try {
      const state = getState().shopDetailsSlice;
      const res = await api.get('/api/v1/shop/product/detail', {
        params: {
          productId: id,
        },
      });
      const data = await res.data;
      console.log(data, '  get product shop api');
      return data.value;
    } catch (err) {
      console.log(err, ' error get product ');
      throw err;
    }
  },
);
export const getListAllProductsInShop = createAsyncThunk(
  '/shopDetails/listAllProductsInShop',
  async (id, { getState }) => {
    try {
      const state = getState().shopDetailsSlice;
      console.log(state, 'asdfasfd ');
      const res = await api.get('/api/v1/shop/product', {
        params: {
          shopId: id,
          pageIndex: 1,
          pageSize: state.pageSize,
        },
      });
      const data = await res.data;
      console.log(data, '  list all product shop api');
      return data.value;
    } catch (err) {
      console.log(err, ' error list all product ');
      throw err;
    }
  },
);
export const addMoreProductInShopDetails = createAsyncThunk(
  'shopDetailsSlice/addMoreProductInShopDetails',

  async (page, { getState }) => {
    try {
      const state = getState().shopDetailsSlice;
      console.log(state, 'asdfasfd  api add more product');
      const res = await api.get('/api/v1/shop/product', {
        params: {
          shopId: state.info.id,
          pageIndex: page,
          pageSize: state.pageSize,
        },
      });
      const data = await res.data;
      console.log(data, '  add more procut product shop api');
      return data.value;
    } catch (err) {
      console.log(err, ' error addmore product ');
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
export const dataShopDetailsSelector = (state) => state.shopDetailsSlice;
