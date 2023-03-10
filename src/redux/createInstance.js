import axios from "axios";
import jwt_decode from "jwt-decode";
axios.defaults.withCredentials = true;
const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/refresh`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (user, dispatch, StateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();

        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };

        if (StateSuccess) {
          dispatch(StateSuccess(refreshUser));
        }
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return newInstance;
};
