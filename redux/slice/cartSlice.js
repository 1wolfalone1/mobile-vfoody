import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import qs from 'qs';
import api from '../../api/api';
const initialState = {
  items: {},
  total: 0,
  listItemInfo: [],
  vouchers: [],
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
      }),
});

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
