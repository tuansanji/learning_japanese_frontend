import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      msg: null,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
      msg: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      state.login.isFetching = false;
      state.login.error = false;
      state.login.msg = null;
    },
    loginError: (state, action) => {
      state.login.error = true;
      state.login.isFetching = false;
      state.login.msg = action.payload;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerError: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
      state.register.msg = action.payload;
    },
    registerSuccess: (state) => {
      state.register.error = false;
      state.register.isFetching = false;
      state.register.success = true;
      state.register.msg = null;
    },
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
    logOutSuccess: (state, action) => {
      state.login.currentUser = null;
      state.login.isFetching = false;
      state.login.error = false;
    },
    logOutFail: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    resetMsg: (state) => {
      state.login.isFetching = false;
      state.login.error = false;
      state.login.msg = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  registerError,
  registerSuccess,
  registerStart,
  logOutSuccess,
  logOutStart,
  logOutFail,
  resetMsg,
} = authSlice.actions;
