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
import { toastErr, toastSuccess } from "./slice/toastSlice";
import { getAllUsersError, getAllUsersStart } from "./slice/userSlice";

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
    dispatch(registerError(error.response.data));
  }
};
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAllUsersStart());

  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/all`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    // dispatch(getAllUsersSuccess());
    return res.data;
  } catch (error) {
    dispatch(getAllUsersError());
  }
};

export const deleteUser = async (accessToken, id, axiosJWT) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/delete`,

      { id: id },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    // dispatch(deleteUser());
    return res.data;
  } catch (error) {
    console.log("delete user error");
  }
};

export const deleteManyUser = async (accessToken, arr, axiosJWT) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/delete/many`,

      { arr: arr },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    // dispatch(deleteUser());
    return res.data;
  } catch (error) {
    console.log("delete user error");
  }
};

export const editUserRequest = async (accessToken, user, axiosJWT) => {
  try {
    const res = await axiosJWT.patch(
      `${process.env.REACT_APP_BACKEND_URL}/user/edit`,
      {
        id: user.id,
        username: user.username,
        email: user.email,
        money: user.money,
      },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    return res.data;
  } catch (error) {
    console.log("edit user error");
  }
};

// log out để phục vụ việc refresh token
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
    dispatch(logOutSuccess());
    dispatch(toastSuccess(res.data));
    navigate("/auth/login");
  } catch (error) {
    dispatch(logOutFail());
    dispatch(toastErr(error.response.data));
  }
};

// log out không sử dụng token để

export const logOutUserNoRefresh = (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    dispatch(logOutSuccess());
    dispatch(toastSuccess("Đăng xuất thành công"));
    setTimeout(() => {
      navigate("/auth/login");
    }, 500);
  } catch (error) {
    dispatch(logOutFail());
    dispatch(toastErr("Đăng xuất thất bại"));
  }
};

export const postCourse = async (accessToken, course, axiosJWT) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_BACKEND_URL}/courses`,

    course,

    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res;
};

export const deleteCourse = async (accessToken, id, axiosJWT) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_BACKEND_URL}/courses/delete`,
    { id },
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res;
};

export const deleteManyCourse = async (accessToken, arr, axiosJWT) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_BACKEND_URL}/courses/delete/many`,
    { arr: arr },
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res;
};

export const editCourseRequest = async (accessToken, course, axiosJWT) => {
  const res = await axiosJWT.patch(
    `${process.env.REACT_APP_BACKEND_URL}/courses/edit`,
    course,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res;
};

export const getAllCourses = async (accessToken, axiosJWT) => {
  try {
    const courses = await axiosJWT.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    return courses.data;
  } catch (error) {
    console.log(error);
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
    courses.data.forEach((way) => way && arr.push(way.lesson));

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
