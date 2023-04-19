import { createSlice } from "@reduxjs/toolkit";

export const mockTestSlice = createSlice({
  name: "mockTest",
  initialState: {
    list: [],
  },
  reducers: {
    getAllLesson(state, action) {
      state.list = action.payload;
    },
  },
});

export const { getAllLesson } = mockTestSlice.actions;
