import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  map: {
    origin: {
      name: '',
      lat: 0,
      lng: 0,
    },
    destination: {
      name: '',
      lat: 0,
      lng: 0,
    },
    isChange: false,
  },
  snackbar: {
    icon: null,
    message: null,
    open: false,
    iconFunction: () => {
      console.log('Snackbar icon function');
    },
    action: {
      label: 'Undo',
      onPress: () => {},
    },
    style: {},
    duration: 5000,
    elevation: 5,
  },
};
const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    changeUserInfo: (state, actions) => {
      return actions.payload;
    },
    resetState: (state, actions) => initialState,
    openSnackBar: (state, actions) => {
      state.snackbar.message = actions.payload.message;
      state.snackbar.open = true;
    },
    closeSnackBar: (state, actions) => {
      state.snackbar = initialState.snackbar;
    },
    changeMapState: (state, actions) => {
      const { latitude, longitude, name } = actions.payload;
      state.map.isChange = true;
      state.map.origin = {
        latitude,
        longitude,
        name,
      };
    },
    resetMapsState: (state, actions) => {
      state.map = initialState.map
    },
    customSnackBar: (state, actions) => {
      const { icon, iconFunction, action, style, duration, elevation } = actions.payload;
      if (icon) state.snackbar.icon = actions.payload.icon;
      if (iconFunction) state.snackbar.iconFunction = actions.payload.iconFunction;
      if (action) state.snackbar.action = actions.payload.action;
      if (style) state.snackbar.style = actions.payload.style;
      if (duration) state.snackbar.duration = actions.payload.duration;
      if (elevation) state.snackbar.elevation = actions.payload.elevation;
    },
  },
  // extraReducers: (builder) =>
  //   builder
  //     .addCase(authenticate.fulfilled, (state, action) => {
  //       return {
  //         info: action.payload,
  //         role: CommonConstants.USER_ROLE.USER,
  //       };
  //     })
  //     .addCase(authenticate.rejected, (state, action) => {
  //       return {
  //         info: {},
  //         role: CommonConstants.USER_ROLE.GUEST,
  //       };
  //     }),
});

export default globalSlice;

export const globalSelector = (state) => state.globalSlice;
export const snackBarSelector = (state) => state.globalSlice.snackbar;
