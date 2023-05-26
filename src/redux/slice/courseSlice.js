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
    tokutei: {
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
    listStageCurrent: [],
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
      localStorage.setItem(
        action.payload.state,
        JSON.stringify(action.payload.data)
      );
      state.lessonCurrent.lessonCurrent = action.payload.data;
    },
    getCurrentIndex: (state, action) => {
      localStorage.setItem(
        action.payload.state,
        JSON.stringify(action.payload.index)
      );

      state.lessonCurrent.currentIndex = action.payload.index;
    },
    getCurrentStage: (state, action) => {
      state.lessonCurrent.currentStage = action.payload;
    },
    getCurrentStageList: (state, action) => {
      state.listStageCurrent = action.payload;
    },
    getAllCourseSuccess: (state, action) => {
      state.listStageCurrent.error = false;
    },
    addCourseNew: (state, action) => {
      if (!state[action.payload]) {
        state = {
          ...state,
          [action.payload]: {
            allCourse: [],
            isFetching: false,
            error: false,
          },
        };
      }
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
  getAllCourseSuccess,
  addCourseNew,
} = courseSlice.actions;
