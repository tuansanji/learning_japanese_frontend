import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import MenuUser from "./Users";
import MenuCourses from "./Courses";
import { toastErr, toastSuccess } from "../../../../redux/slice/toastSlice";
import { changeStatus } from "../../../../redux/slice/adminSlice";
import MockTestList from "./MockTestList";

function ADMIN() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const statusAdmin = useSelector((state) => state.admin?.status);

  return (
    <>
      <div className=" w-[70%] bg-[#fff]  p-[3%] my-[3%] rounded-md mx-auto ">
        <Button
          className={` flex items-center mb-10
              controller 
          bg-red-500`}
          type="primary"
          onClick={() => {
            dispatch(
              toastErr(
                "Cận thận ở chế độ edit hàng loạt vì nó đang gặp lỗi set input nơi đang chỉnh sửa"
              )
            );
            dispatch(
              toastErr("Chế độ chính sửa ở users và courses đang là khác nhau")
            );
            dispatch(
              toastSuccess(
                "cách đẻ không xảy ra lỗi hiện tại tạm thời đang là CHỈ SỬA DUY NHẤT MỘT ĐỐI TƯỢNG TRONG MỖI LẦN SỬA"
              )
            );
          }}
        >
          Thông báo những lỗi đang có trong trang. Admin chú ý
        </Button>
        <div className="flex justify-around w-full">
          <Button
            className={` flex items-center ${
              statusAdmin === "courses" && "bg-green-500"
            } ${
              statusAdmin === "users" && "bg-blue-500 border-b-4 border-[red]"
            }
           ${statusAdmin === "mockTest" && "bg-green-500 "}     
            
            `}
            type="primary"
            onClick={() => {
              dispatch(changeStatus("users"));
            }}
          >
            Quản lí Thành viên
          </Button>

          <Button
            className={`flex items-center 
              ${statusAdmin === "users" && "bg-green-500 "} ${
              statusAdmin === "courses" && "bg-blue-500 border-b-4 border-[red]"
            }
           ${statusAdmin === "mockTest" && "bg-green-500 "}     
             
            `}
            type="primary"
            onClick={() => {
              dispatch(changeStatus("courses"));
            }}
          >
            Quản lí khóa học
          </Button>
          <Button
            className={`flex items-center
            bg-green-500
           ${
             statusAdmin === "mockTest" &&
             "!bg-blue-500 border-b-4 border-[red]"
           }     
           `}
            type="primary"
            onClick={() => {
              dispatch(changeStatus("mockTest"));
            }}
          >
            Quản lí bài thi
          </Button>
        </div>
        {statusAdmin === "mockTest" && <MockTestList currentUser={user} />}
        {statusAdmin === "users" && <MenuUser currentUser={user} />}
        {statusAdmin === "courses" && <MenuCourses currentUser={user} />}
      </div>
    </>
  );
}

export default ADMIN;
