import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: "users",
  },
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { changeStatus } = adminSlice.actions;
