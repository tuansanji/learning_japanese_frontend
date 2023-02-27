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
      currentIndex: null,
      isFetching: false,
      error: false,
      currentStage: null,
    },
    listStageCurrent: null,
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
      localStorage.setItem("lesson", JSON.stringify(action.payload));
      state.lessonCurrent.lessonCurrent = action.payload;
    },
    getCurrentIndex: (state, action) => {
      localStorage.setItem("index", JSON.stringify(action.payload));
      state.lessonCurrent.currentIndex = action.payload;
    },
    getCurrentStage: (state, action) => {
      state.lessonCurrent.currentStage = action.payload;
    },
    getCurrentStageList: (state, action) => {
      state.listStageCurrent = action.payload;
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
  getCurrentIndex,
  getCurrentStage,
  getCurrentStageList,
} = courseSlice.actions;
