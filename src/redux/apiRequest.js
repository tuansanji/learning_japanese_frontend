import axios from "axios";
import {
  loginError,
  loginStart,
  loginSuccess,
  registerStart,
  registerError,
  registerSuccess,
  logOutSuccess,
  logOutStart,
  logOutFail,
} from "./slice/authSlice";
import {
  getAllUsersError,
  getAllUsersStart,
  getAllUsersSuccess,
} from "./slice/userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://japanese-backend.onrender.com/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginError(err.response.data));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "https://japanese-backend.onrender.com/auth/register",
      user
    );
    dispatch(registerSuccess(res.data));
    navigate("/auth/login");
  } catch (error) {
    dispatch(registerError());
  }
};
export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const res = await axios.get(
      "https://japanese-backend.onrender.com/user/all",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(getAllUsersSuccess(res.data));
  } catch (error) {
    dispatch(getAllUsersError());
  }
};

export const deleteUser = async (accessToken, id, dispatch, navigate) => {
  try {
    const res = await axios.delete(
      `https://japanese-backend.onrender.com/user/delete/${id}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteUser());
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = async (accessToken, id, dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    const res = await axios.post(
      "https://japanese-backend.onrender.com/auth/logout",
      id,

      { headers: { token: `Bearer ${accessToken}` } }
    );
    dispatch(logOutSuccess(res.data));
    navigate("/auth/login");
  } catch (error) {
    console.log(error);
    dispatch(logOutFail());
  }
};
