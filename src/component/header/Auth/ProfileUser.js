import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

import "./userInfor.scss";
import { deleteUser, getAllUsers, logOutUser } from "../../../redux/apiRequest";
function UserInfor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const handleChangeProfile = (e) => {
    // đang mặc định chỉ thay đổi ảnh thôi(k làm kịp mấy cái kia)

    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
  };

  const handleLogOutUser = () => {
    logOutUser(user.accessToken, user.id, dispatch, navigate);
  };
  return (
    <>
      {user && (
        <div className="container emp-profile mx-auto ">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="flex flex-col justify-center mb-5">
                  <img src={user.thumb} className="w-[100px] " alt="" />
                  <div className="">
                    Change Photo
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => {
                        handleChangeProfile(e);
                      }}
                    />
                  </div>
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
                        <p>{user.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
            {/* <Button
              className="bg-green-500 flex items-center"
              type="primary"
              icon={<DeleteOutlined />}
            >
              Xóa Tài Khoản
            </Button> */}

            {user.isAdmin && (
              <Button
                className="bg-green-500 flex items-center"
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => {
                  getAllUsers(user.accessToken, dispatch);
                }}
              >
                Lấy danh sách User
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfor;
