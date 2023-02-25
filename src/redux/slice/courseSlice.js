import { createSlice } from "@reduxjs/toolkit";
export const courseSlice = createSlice({
  name: "course",
  initialState: {
    n1: {
      allCourse: [],
      isFetching: false,
      error: false,
    },
    n2: {
      allCourse: [],
      isFetching: false,
      error: false,
    },
    n3: {
      allCourse: [],
      isFetching: false,
      error: false,
    },
    n4: {
      allCourse: [],
      isFetching: false,
      error: false,
    },
    n5: {
      allCourse: [],
      isFetching: false,
      error: false,
    },
    currentSection: {
      name: null,
      data: null,
    },
    isLoadingAndError: {
      loading: false,
      error: false,
    },
    lessonCurrent: {
      lessonCurrent: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getCourseStart: (state, action) => {
      state[action.payload.level].isFetching = true;
    },
    getCourseSuccess: (state, action) => {
      state[action.payload.level].isFetching = false;
      state[action.payload.level].error = false;
      state[action.payload.level].allCourse = action.payload.data;
    },
    getCourseFailure: (state, action) => {
      state[action.payload.level].isFetching = false;
      state[action.payload.level].error = true;
    },
    getLessonCurrent: (state, action) => {
      state.lessonCurrent.lessonCurrent = action.payload;
    },
  },
});

export const {
  getCourseStart,
  getCourseSuccess,
  getCourseFailure,
  getCurrentSection,
  resetCurrentSection,
  getLessonCurrent,
} = courseSlice.actions;
