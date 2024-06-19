import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    deviceToken: '',
    isAuthenticated: false,
  },
  reducers: {
    setDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.deviceToken = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setDeviceToken, logout } = authSlice.actions;
export default authSlice.reducer;
