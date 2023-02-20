import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import MenuNav from "./menuNav/MenuNav";
import Auth from "./Auth/Auth";
import logo from "../.././assets/img/logo2.png";

function Nav() {
  const dispatch = useDispatch();
  return (
    <div className="nav-menu w-[100%] h-[66px] items-center bg-[#fff] border-b border-[#e8ebed] flex text-[1.4rem] top-0 px-7 sticky right-0 z-20">
      <div className="nav_logo max-h-[100%]  flex flex-1 items-center ">
        <Link to="/">
          <img src={logo} className="w-[66px] " alt="" />
        </Link>
        <h4 className="text-[#000] font-[700] text-[1.4rem] ml-4">
          Học tiếng nhật cùng Sanji Senpai
        </h4>
      </div>
      {/* <div className="h-[100%] flex items-center justify-center flex-1">
        <MenuNav />
      </div> */}
      <div className="nav_auth flex items-center justify-around flex-1 ">
        <div className="">
          <button>Khóa học của tôi</button>
        </div>
        <div className="">
          <Auth></Auth>
        </div>
      </div>
    </div>
  );
}

export default Nav;
