import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    usersAll: {
      usersCurrent: null,
      isFetching: false,
      error: false,
    },
    inforUser: {
      keyImg: null,
      url: null,
    },
  },
  reducers: {
    getAllUsersStart: (state) => {
      state.usersAll.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.usersAll.usersCurrent = action.payload;
      state.usersAll.isFetching = false;
      state.usersAll.error = false;
    },
    getAllUsersError: (state) => {
      state.usersAll.error = true;
      state.usersAll.isFetching = false;
    },
    resetImg: (state, aciton) => {
      state.inforUser.keyImg = aciton.payload;
    },
  },
});

export const {
  getAllUsersError,
  getAllUsersSuccess,
  getAllUsersStart,
  deleteUser,
  resetImg,
} = userSlice.actions;
