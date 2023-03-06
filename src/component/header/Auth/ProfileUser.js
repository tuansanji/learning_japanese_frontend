import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import moment from "moment";
import "./userInfor.scss";
import { deleteUser, getAllUsers, logOutUser } from "../../../redux/apiRequest";
import { createAxios } from "../../../redux/createInstance";
import { logOutSuccess } from "../../../redux/slice/authSlice";
import { toastErr, toastSuccess } from "../../../redux/slice/toastSlice";
import { resetImg } from "../../../redux/slice/userSlice";
function UserInfor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [imagePreview, setImagePreview] = useState(null);
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleImagePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  const handleUploadImage = async () => {
    if (!imagePreview) {
      console.log("No image selected.");
      return;
    }

    const formData = new FormData();
    const imgBlob = dataURLtoBlob(imagePreview);
    formData.append("avatar", imgBlob);

    const response = axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/user/edit`, formData, {
        headers: {
          token: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(resetImg(Math.random()));
        dispatch(toastSuccess(res.data));
        window.location.reload();
      })
      .catch((err) => {
        dispatch(toastErr(err.response.data));
      });
  };
  const handleLogOutUser = () => {
    logOutUser(user.accessToken, user._id, dispatch, navigate, axiosJWT);
  };
  return (
    <>
      {user && (
        <div className="container emp-profile mx-auto ">
          <div>
            <div className="row">
              <div className="col-md-4">
                <div className="flex flex-col justify-center mb-5">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="w-[200px] "
                      alt="Avatar preview"
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/auth/user/avatar/${user._id}`}
                      className="w-[10rem] h-[10rem] "
                      alt=""
                    />
                  )}
                  <div className=" my-5">
                    Change Photo
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImagePreview}
                    />
                  </div>
                  {imagePreview && (
                    <Button
                      className="bg-green-500 w-[100px] flex items-center"
                      type=" primary"
                      onClick={handleUploadImage}
                    >
                      Xác nhận
                    </Button>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>Vị trí của bạn</h5>
                  <h6>{user.isAdmin ? "Chủ trang(ADMIN)" : "Học viên"}</h6>
                  <p className="mt-10 text-[2rem]">
                    Tổng só xu hiện có :
                    <span className="text-[red] text-[3rem] ml-8">
                      {user.money}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 tab-infor">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row flex my-[1rem]">
                      <div className="col-md-6">
                        <label>User Id : </label>
                      </div>
                      <div className="col-md-6 ml-6">
                        <p> {user._id}</p>
                      </div>
                    </div>
                    <div className="row flex my-[1rem]">
                      <div className="col-md-6">
                        <label>Name :</label>
                      </div>
                      <div className="col-md-6 ml-6">
                        <p>{user.username}</p>
                      </div>
                    </div>
                    <div className="row flex my-[1rem]">
                      <div className="col-md-6">
                        <label>Email :</label>
                      </div>
                      <div className="col-md-6 ml-6">
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="row flex my-[1rem] items-center ">
                      <div className="col-md-6">
                        <label>Khóa học đã mua :</label>
                      </div>
                      <div className="col-md-6 ml-6 mr-5">
                        <p>{user.courses.length}</p>
                      </div>
                      <button
                        className="hover:bg-slate-300 p-1 rounded-lg"
                        onClick={() => {
                          alert("ai chon xem mà xem");
                        }}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                    <div className="row flex my-[1rem]">
                      <div className="col-md-6">
                        <label>Thời gian gia nhập </label>
                      </div>
                      <div className="col-md-6 ml-6">
                        {moment(user.createdAt).format("DD/MM/YYYY HH:mm")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn__user-switch">
            <Button
              className="bg-green-500 flex items-center"
              type="primary"
              icon={<PoweroffOutlined />}
              onClick={() => {
                handleLogOutUser();
                // deleteUser(user.accessToken, user._id, dispatch);
              }}
            >
              Đăng Xuất
            </Button>

            {user.isAdmin && (
              <Link to={`/auth/admin`}>
                <Button
                  className="bg-green-500 flex items-center"
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    getAllUsers(user.accessToken, dispatch);
                  }}
                >
                  Admin
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfor;
