import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminSlice } from "./slice/adminSlice";

import { authSlice } from "./slice/authSlice";
import { courseSlice } from "./slice/courseSlice";
import { toastSlice } from "./slice/toastSlice";
import { userSlice } from "./slice/userSlice";
import { mockTestSlice } from "./slice/mockTestSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: userSlice.reducer,
  courses: courseSlice.reducer,
  toast: toastSlice.reducer,
  admin: adminSlice.reducer,
  mockTest: mockTestSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
});

export let persistor = persistStore(store);
