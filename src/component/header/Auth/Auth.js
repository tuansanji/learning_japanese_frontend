import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Cookies from "js-cookie";
import { logOutUser } from "../../../redux/apiRequest";
import { createAxios } from "../../../redux/createInstance";
import { logOutSuccess } from "../../../redux/slice/authSlice";
import axios from "axios";
axios.defaults.withCredentials = true;

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const keyImg = useSelector((state) => state.users.inforUser?.keyImg);
  const [urlImage, setUrlImage] = useState("");
  // const [userGmail, setUser] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user/api`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  // console.log(userGmail);

  const items = [
    {
      key: "1",
      label: <Link to="/user/infor">Thông tin tài khoản</Link>,
    },

    {
      key: "4",
      danger: true,
      label: (
        <Link
          onClick={() => {
            logOutUser(
              user.accessToken,
              user._id,
              dispatch,
              navigate,
              axiosJWT
            );
          }}
        >
          Đăng xuất
        </Link>
      ),
    },
  ];
  return (
    <div>
      {user ? (
        <div className="flex justify-center items-center gap-4">
          <Dropdown
            menu={{
              items,
            }}
          >
            <Link className="text-red-600 font-bold" to="/user/infor">
              <Space>
                {user.username}
                <DownOutlined />
              </Space>
            </Link>
          </Dropdown>
          <Link to="/user/infor">
            <img
              key={keyImg}
              className="w-[4rem] h-[4rem] rounded-[50%]"
              src={`${process.env.REACT_APP_BACKEND_URL}/auth/user/avatar/${user._id}`}
              alt=""
            ></img>
          </Link>
        </div>
      ) : (
        <Link
          to={"/auth/login"}
          className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[40px]"
        >
          Đăng Nhập
        </Link>
      )}
    </div>
  );
}

export default Auth;
