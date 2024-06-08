import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import qs from 'qs';
import api from '../../api/api';
const initialState = {
  items: {},
  total: 0,
  listItemInfo: [],
  vouchers: [],
  listShopInfo: [],
  status: {
    code: 200,
    message: '',
  },
};
const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    changeUserInfo: (state, actions) => {
      return actions.payload;
    },
    resetState: (state, actions) => initialState,
    resetStateListShop: (state, actions) => {
      state.listShopInfo = initialState.listShopInfo;
    },
    resetStateListItemInfo: (state, actions) => {
      state.listItemInfo = initialState.listItemInfo;
    },
    addToCart: (state, actions) => {
      console.log(actions.payload, ' add to cart');
      const { productId, shopId, quantity, topping } = actions.payload;
      const carts = state.items;
      const cartItem = {
        productId,
        quantity,
        topping,
      };
      if (Array.isArray(carts[shopId])) {
        let isExists = false;
        state.items[shopId].map((item) => {
          if (item.productId === productId) {
            isExists = true;
            return cartItem;
          } else {
            return item;
          }
        });
        if (!isExists) {
          state.items[shopId].push(cartItem);
        }
      } else {
        state.items[shopId] = [];
        state.items[shopId].push(cartItem);
      }
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getCartInfo.fulfilled, (state, action) => {
        console.log(action.payload, ' payloiadddd');
        state.listItemInfo = action.payload;
      })
      .addCase(getCartInfo.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getListShopInfo.fulfilled, (state, action) => {
        state.listShopInfo = action.payload;
      })
      .addCase(getListShopInfo.rejected, (state, action) => {
        console.log(action.payload);
      }),
});
export const getListShopInfo = createAsyncThunk(
  'cartSlice/getListShopInfo',
  async (id, { getState }) => {
    try {
      const state = getState().cartSlice;
      const keysArray = Object.keys(state.items).map(Number);
      console.log(keysArray, 'keys', state.items);
      const res = await api.get('/api/v1/customer/shop', {
        params: {
          ids: keysArray,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });
      const data = await res.data;
      console.log(data, 'Data cart shop info invoke');
      if (data.isSuccess) {
        return data.value;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err, ' error in getShopInfo in cartslice');
      throw err;
    }
  },
);
export const getCartInfo = createAsyncThunk('cartSlice/getCartInfo', async (id, { getState }) => {
  try {
    const state = getState().cartSlice;
    const listItem = state.items[id];
    let listIds = [];
    if (Array.isArray(listItem)) {
      listIds = listItem.map((item) => item.productId);
    } else {
      return [];
    }
    const res = await api.get('/api/v1/customer/product', {
      params: {
        ids: listIds,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
    const data = await res.data;
    console.log(data, 'Data cart invoke');
    if (data.isSuccess) {
      return data.value;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err, ' error in getCartInfo');
    throw err;
  }
});
export default cartSlice;

export const cartSelector = (state) => state.cartSlice;
