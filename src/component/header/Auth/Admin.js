import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";

import "./userInfor.scss";
import StickyHeadTable from "./Admin/Users";
import MenuUser from "./Admin/Users";

function ADMIN() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  return (
    <>
      <div className="container emp-profile mx-auto ">
        <div className="flex justify-around w-full">
          <Button
            className="bg-green-500 flex items-center"
            type="primary"
            onClick={() => {}}
          >
            Quản lí Thành viên
          </Button>

          {user.isAdmin && (
            <Button
              className="bg-green-500 flex items-center"
              type="primary"
              onClick={() => {}}
            >
              Quản lí khóa học
            </Button>
          )}
        </div>
        <MenuUser currentUser={user} />
      </div>
    </>
  );
}

export default ADMIN;
