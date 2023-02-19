import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { userSlice } from "./slice/userSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: userSlice.reducer,
  },
});
