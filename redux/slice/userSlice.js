import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonConstants } from '../../constant';

const initialState = {
  info: {},
  role: CommonConstants.USER_ROLE.GUEST,
};
const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState: initialState,
  reducers: {
    changeUserInfo: (state, actions) => {
      console.log(actions.payload , ' changing user info')
      return actions.payload;
    },
    resetState: (state, actions) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        return {
          info: action.payload,
          role: CommonConstants.USER_ROLE.USER,
        };
      })
      .addCase(authenticate.rejected, (state, action) => {
        return {
          info: {},
          role: CommonConstants.USER_ROLE.GUEST,
        };
      }),
});

export default userInfoSlice;

export const userInfoSliceSelector = (state) => {
  return state.userInfoSlice.info;
};

export const userRoleSelector = (state) => state.userInfoSlice.role;

export const authenticate = createAsyncThunk('userInfo/authenticate', 
  async () => {});
