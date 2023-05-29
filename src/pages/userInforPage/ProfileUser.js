import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import moment from "moment";

import { getAllUsers, logOutUser } from "../../redux/apiRequest";
import { createAxios } from "../../redux/createInstance";
import { logOutSuccess } from "../../redux/slice/authSlice";
import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";
import { resetImg } from "../../redux/slice/userSlice";
function UserInfor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const MAX_IMAGE_SIZE = 990000; // 1MB
  const MAX_IMAGE_WIDTH = 1000; // Giới hạn chiều rộng tối đa
  const MAX_IMAGE_HEIGHT = 1000;

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user]);

  // xử lí ảnh preview
  const handleImagePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > MAX_IMAGE_WIDTH) {
            height *= MAX_IMAGE_WIDTH / width;
            width = MAX_IMAGE_WIDTH;
          }
          if (height > MAX_IMAGE_HEIGHT) {
            width *= MAX_IMAGE_HEIGHT / height;
            height = MAX_IMAGE_HEIGHT;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7); // Giảm chất lượng ảnh xuống còn 70%
          const blob = dataURLtoBlob(dataUrl);
          setImagePreview(dataUrl);
        };
        img.src = event.target.result;
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

  // hàm xử lí up load ảnh
  const handleUploadImage = async () => {
    if (!imagePreview) {
      console.log("No image selected.");
      return;
    }
    const formData = new FormData();
    const imgBlob = dataURLtoBlob(imagePreview);
    formData.append("avatar", imgBlob);
    axios
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
        console.log("lỗi");
        dispatch(toastErr(err.response.data));
      });
  };

  // khi ng dùng đăng xuất
  const handleLogOutUser = () => {
    logOutUser(user.accessToken, user._id, dispatch, navigate, axiosJWT);
  };

  return (
    <>
      {user && (
        <div className="mx-auto p-[3%] my-[3%] rounded-md bg-[#fff] w-[70%] md:w-full font-medium">
          <div>
            <div className="">
              <div className="">
                <div className="flex flex-row gap-10 mb-5 md:w-full">
                  <div className="h-[20rem] md:h-[10rem] md:w-[10rem] w-[20rem] overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="h-full"
                        alt="Avatar preview"
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/auth/user/avatar/${user._id}`}
                        className="h-full w-full"
                        onError={(e) => {
                          e.target.onerror = null; // ngăn chặn vòng lặp vô hạn nếu ảnh mặc định bị lỗi
                          e.target.src =
                            "https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"; // đường dẫn đến ảnh mặc định
                        }}
                        alt=""
                      />
                    )}
                  </div>
                  <div className=" my-5">
                    Change Photo
                    <input
                      className="w-auto flex md:w-[24rem] sm:w-[17rem]"
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImagePreview}
                    />
                    {imagePreview && (
                      <Button
                        className="bg-green-500 w-[100px] flex items-center mt-[3rem]"
                        type=" primary"
                        onClick={handleUploadImage}
                      >
                        Xác nhận
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-[#333]">
                  <h5>Vị trí của bạn</h5>
                  <h6 className="text-[#0062CC] ">
                    {user.isAdmin ? "Chủ trang(ADMIN)" : "Học viên"}
                  </h6>
                  <p className="mt-10 text-[2rem] flex items-center">
                    Tổng số xu hiện có :
                    <span className="text-[red] text-[3rem] ml-8">
                      {user.money}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <div className=" " id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row flex my-[1rem]">
                      <div className="">
                        <label className="font-bold">User Id : </label>
                      </div>
                      <div className=" ml-6">
                        <p className="text-[#0062CC] font-bold">
                          {" "}
                          {user._id.substring(user._id.length - 10)}
                        </p>
                      </div>
                    </div>
                    <div className="row flex my-[1rem]">
                      <div className="">
                        <label className="font-bold">Name :</label>
                      </div>
                      <div className=" ml-6">
                        <p className="text-[#0062CC] font-bold">
                          {user.username}
                        </p>
                      </div>
                    </div>
                    <div className="row flex my-[1rem]">
                      <div className="">
                        <label className="font-bold">Email :</label>
                      </div>
                      <div className=" ml-6">
                        <p className="text-[#0062CC] font-bold">{user.email}</p>
                      </div>
                    </div>

                    <div className="row flex my-[1rem] items-center ">
                      <div className="">
                        <label className="font-bold">Khóa học đã mua :</label>
                      </div>
                      <div className=" ml-6 mr-5">
                        <p className="text-[red]">{user.courses.length}</p>
                      </div>
                    </div>
                    <div className=" flex my-[1rem]">
                      <div className="">
                        <label className="font-bold">Thời gian gia nhập </label>
                      </div>
                      <div className=" ml-6">
                        {moment(user.createdAt).format("DD/MM/YYYY HH:mm")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-green-500 flex items-center mx-[1rem]"
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
