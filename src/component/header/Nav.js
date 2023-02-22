import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import MenuNav from "./menuNav/MenuNav";
import SwipeableTemporaryDrawer from "./MenuNavMobile";
import Auth from "./Auth/Auth";
import logo from "../../assets/img/logo_img.jpg";

function Nav() {
  const dispatch = useDispatch();
  return (
    <div className="nav-menu w-[100%] h-[66px] items-center bg-[#fff] border-b border-[#e8ebed] flex text-[1.4rem] top-0 px-7 sticky right-0 z-20">
      <div className="nav_logo max-h-[100%]  flex flex-1 items-center md:hidden ">
        <a href="/">
          <img src={logo} className="w-[66px] " alt="" />
        </a>
        <h4 className="text-[#000] font-[700] text-[1.4rem] ml-4   ">
          LEARN JAPANESE
        </h4>
      </div>
      <div className="">
        <SwipeableTemporaryDrawer />
      </div>
      <div
        className="h-[100%] tablet:flex items-center justify-center flex-1 md:hidden  translate-x-0
  "
      >
        <MenuNav />
      </div>
      <div className="nav_auth flex items-center justify-around flex-1  md:justify-end">
        <div className="md:hidden ">
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
