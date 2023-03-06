import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const toastSlice = createSlice({
  name: "toastMessage",
  initialState: {},
  reducers: {
    toastSuccess: (state, action) => {
      state = "success";
      toast.success(` ${action.payload}!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "toast__message",
      });
    },
    toastErr: (state, action) => {
      state = "error";
      toast.error(` ${action.payload}!`, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "toast__message",
      });
    },
  },
});
export const { toastSuccess, toastErr } = toastSlice.actions;
