import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";

import "./userInfor.scss";
import StickyHeadTable from "./Admin/Users";
import MenuUser from "./Admin/Users";
import MenuCourses from "./Admin/Courses";

function ADMIN() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const [controller, setController] = useState("users");
  return (
    <>
      <div className="container emp-profile mx-auto ">
        <div className="flex justify-around w-full">
          <Button
            className={` flex items-center ${
              controller === "courses" && "bg-green-500"
            } ${controller === "users" && "bg-blue-500"}`}
            type="primary"
            onClick={() => {
              setController("users");
            }}
          >
            Quản lí Thành viên
          </Button>

          {user.isAdmin && (
            <Button
              className={`flex items-center 
              ${controller === "users" && "bg-green-500"} ${
                controller === "courses" && "bg-blue-500"
              }
              `}
              type="primary"
              onClick={() => {
                setController("courses");
              }}
            >
              Quản lí khóa học
            </Button>
          )}
        </div>

        {controller === "users" && <MenuUser currentUser={user} />}
        {controller === "courses" && <MenuCourses currentUser={user} />}
      </div>
    </>
  );
}

export default ADMIN;
