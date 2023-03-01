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
  getCourseFailure,
  getCourseStart,
  getCourseSuccess,
} from "./slice/courseSlice";
import {
  getAllUsersError,
  getAllUsersStart,
  getAllUsersSuccess,
} from "./slice/userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
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
      `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
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
      `${process.env.REACT_APP_BACKEND_URL}/user/all`,
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
      `${process.env.REACT_APP_BACKEND_URL}/user/delete/${id}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteUser());
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = async (
  accessToken,
  id,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(logOutStart());
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
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

export const getCourse = async (dispatch, level) => {
  dispatch(getCourseStart({ level: level }));
  try {
    const course = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses/${level}`
    );

    dispatch(
      getCourseSuccess({
        level: level,
        data: course.data,
      })
    );
  } catch (error) {
    dispatch(getCourseFailure({ level: level }));
  }
};

export const getLevelCourse = async (dispatch, level) => {
  try {
    const courses = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses/${level}`
    );
    let arr = [];
    await courses.data.forEach((level) => arr.push(level.way));
    return arr;
  } catch (error) {
    console.log("get level failed");
  }
};

export const getWayCourse = async (dispatch, level, way) => {
  try {
    const courses = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses/${level}/${way}`
    );
    let arr = [];
    courses.data.forEach((way) => way.stage && arr.push(way.stage));

    return arr;
  } catch (error) {
    console.log(error);
  }
};

export const getStageCourse = async (dispatch, level, way, stage) => {
  try {
    const courses = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses/${level}/${way}/${stage}`
    );
    let arr = [];
    await courses.data.forEach((way) => way && arr.push(way.lesson));

    return courses.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLessonCourse = async (level, way, stage, lesson) => {
  try {
    const courses = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses/${level}/${way}/${stage}/${lesson}`
    );

    return courses.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLesson = async (level, way, stage, lesson, name) => {
  try {
    const learnList = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses/${level}/${way}/${stage}/${lesson}/${name}`
    );
    return learnList.data;
  } catch (error) {
    console.log(error);
  }
};
