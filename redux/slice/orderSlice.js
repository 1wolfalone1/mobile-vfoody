import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
const initialState = {
  products: {},
  orderPrice: {
    total: 0,
    totalProduct: 0,
    voucher: 10000,
    shippingFee: 4000,
  },
  voucher: {},
  listVoucher: {
    active: [],
    inactive: [],
  },
  orderInfo: {
    fullName: '',
    phoneNumber: '',
    building: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
  },
  ship: {
    distance: 0,
    duration: 0,
  },
};
const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {
    resetState: (state, actions) => {
      return initialState;
    },
    resetListVoucher: (state, actions) => {
      state.listVoucher = initialState.listVoucher;
    },
    changeShipInfo: (state, actions) => {
      const { distance, duration } = actions.payload;
      state.ship = {
        distance: distance,
        duration: duration,
      };
    },
    changeOrderInfo: (state, actions) => {
      const { fullName, phoneNumber, building } = actions.payload;
      state.orderInfo = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        building: building,
      };
    },
    changeVoucher: (state, actions) => {
      const selectVoucher = state.listVoucher.active.find((v) => v.id == actions.payload);
      state.voucher = selectVoucher;
    },
    changeItems: (state, actions) => {},
    calculateTotalProductPrice: (state, actions) => {
      const items = actions.payload;
      if (Array.isArray(items)) {
        const totalProductPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        state.orderPrice.totalProduct = totalProductPrice;
      }
    },
  },

  extraReducers: (builder) =>
    builder.addCase(getListVoucher.fulfilled, (state, actions) => {
      console.log(actions.payload, ' payload in get liafsst voucher');
      state.listVoucher.active = actions.payload.promotionActive.items;
      state.listVoucher.inactive = actions.payload.promotionInActive.items;
    }),
});

export const getListVoucher = createAsyncThunk(
  'orderSlice/getListVoucher',
  async ({ shopId, userId, distance }, { getState }) => {
    try {
      const stateOrder = getState().orderSlice;
      console.log(Date.now(), 'datata ne');
      const res = await api.get('/api/v1/customer/promotion/all', {
        params: {
          shopId: shopId,
          customerId: userId,
          orderValue: 30000,
          distance: distance,
          currentDate: '2024-06-01',
        },
      });
      const data = await res.data;
      console.log(data, 'data get list voucher in order page');
      if (data.isSuccess) {
        return data.value;
      } else {
        return {
          promotionActive: [],
          promotionInActive: [],
        };
      }
    } catch (err) {
      console.log(err, ' error in getlist voucher in order page');
      throw err;
    }
  },
);
export default orderSlice;

export const orderSelector = (state) => state.orderSlice;

export const orderTotalOrderSelector = (state) => {
  const orderPrice = state.orderSlice.orderPrice;
  const total = orderPrice.totalProduct + orderPrice.shippingFee - orderPrice.voucher;
  return total;
};
