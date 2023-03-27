import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MessageOutlined } from "@ant-design/icons";
import ChatIcon from "@material-ui/icons/Chat";
import io from "socket.io-client";
import NotificationsIcon from "@material-ui/icons/Notifications";

import HomePage from "../../pages/homePage/HomePage";
import LevelPage from "../../pages/coursePage/LevelPage";
import Login from "../header/Auth/Login";
import Register from "../header/Auth/Register";
import UserInfor from "../../pages/userInforPage/ProfileUser";
import WayPage from "../../pages/coursePage/WayPage";
import GuidePage from "../../pages/guidePage/GuidePage";
import BuyCourse from "../../pages/coursePage/BuyCourse";
import CoursePage from "../../pages/coursePage/CoursePage";
import GuidePages from "../../pages/guidePage/GuidePages";
import ADMIN from "../header/Auth/Admin/Admin";
import NavigationIcon from "@material-ui/icons/Navigation";
import ResetPassword from "../header/Auth/ChangePassword";
import ForgotPassword from "../header/Auth/ForgotPassword";
import MyCourse from "../../pages/historyCourse/MyCourse";

import MsgUser from "./msgUser/MsgUser";
import MsgAdmin from "./msgUser/MsgAdmin";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toastSuccess } from "../../redux/slice/toastSlice";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
export const socket = io(process.env.REACT_APP_BACKEND_URL);

function Container() {
  const [openMsg, setOpenMsg] = useState(false);
  const [openMsgAdmin, setOpenMsgAdmin] = useState(false);
  const [msg, setMsg] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  useEffect(() => {
    if (user && !user.isAdmin) {
      socket.emit("joinRoom", user._id);

      socket.on("notification", (data) => {
        if (data.username !== user.username) {
          dispatch(toastSuccess("You have a new message"));
          setMsg(true);
        }
      });
    } else if (user && user.isAdmin) {
      socket.on("notification", (data) => {
        if (data.username === "Admin") {
          dispatch(toastSuccess("You have a new message"));
          setMsg(true);
        }
      });
    }
    return () => {
      // socket.emit("leaveRoom", user._id);
      socket.removeListener("notification");
    };
  }, [user]);

  return (
    <div className="container_main md:mt-[7rem]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guide" element={<GuidePages />} />
        <Route path="/guide/:question" element={<GuidePage />} />
        <Route path={`/courses`} element={<CoursePage />} />
        <Route path={`/courses/:level`} element={<LevelPage />} />
        <Route path={`/courses/:level/:way`} element={<WayPage />} />
        <Route path={`/courses/buy/:level`} element={<BuyCourse />} />
        <Route path={`/me/courses`} element={<MyCourse />} />
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/user/infor" element={<UserInfor />}></Route>
        <Route path="/auth/admin" element={<ADMIN />}></Route>

        <Route
          path="/user/change-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route
          path="/user/forgot-password"
          element={<ForgotPassword />}
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <button
        className="fixed bottom-[6rem] right-10 border rounded-[50%] z-[7777] "
        id="btn_BackToTop"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: `smooth`,
          });
        }}
      >
        <NavigationIcon style={{ fontSize: "40px", color: "yellow" }} />
      </button>
      {!user || !user.isAdmin ? (
        <button
          onClick={() => {
            setOpenMsg(true);
          }}
          id="btn-msg"
          className="fixed right-[2rem] bottom-[15rem] rounded-[50%] p-[1rem] sm:p-0 z-[7777] bg-[#4747ef] hover:p-[1.5rem] transition-all hover:bg-[green]"
        >
          <MessageOutlined
            style={{
              fontSize: "4rem",
              backgroundColor: "#fff",
              borderRadius: "50%",
            }}
          />
          <span className="absolute top-[-1rem] right-1 text-[red] text-[2rem] font-bold">
            {msg && <NotificationsIcon style={{ fontSize: "2rem" }} />}
          </span>
        </button>
      ) : (
        <button
          onClick={() => {
            setOpenMsgAdmin(!openMsgAdmin);
          }}
          id="btn-msg"
          className="fixed right-[2rem] bottom-[15rem] rounded-[50%] p-[1rem]  sm:p-0 z-[7777] bg-[#4747ef] hover:p-[1.5rem] transition-all ]"
        >
          <ChatIcon
            style={{
              fontSize: "4rem",
              backgroundColor: "#4747ef",
              borderRadius: "50%",
              color: "#fff",
            }}
          />
          <span className="absolute top-[-1rem] right-1 text-[red] text-[2rem] font-bold">
            {msg && <NotificationsIcon style={{ fontSize: "2rem" }} />}
          </span>
        </button>
      )}

      {openMsg && <MsgUser setOpenMsg={setOpenMsg} setMsg={setMsg} />}
      {openMsgAdmin && (
        <MsgAdmin setOpenMsgAdmin={setOpenMsgAdmin} setMsg={setMsg} />
      )}
    </div>
  );
}

export default Container;
