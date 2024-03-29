import { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MessageOutlined } from "@ant-design/icons";
import ChatIcon from "@material-ui/icons/Chat";
import io from "socket.io-client";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NavigationIcon from "@material-ui/icons/Navigation";
import axios from "axios";

import { MsgAdmin, MsgUser, MsgErrAdmin } from "./msgUser";
import { toastSuccess } from "../../redux/slice/toastSlice";
import { routes } from "../../routes/routes";
import ChatInput from "../../openAi/DemoOpenAi";
import { createAxios } from "../../redux/createInstance";
import { logOutSuccess } from "../../redux/slice/authSlice";
import { logOutUser } from "../../redux/apiRequest";
import { addCourseNew } from "../../redux/slice/courseSlice";

export const socket = io(process.env.REACT_APP_BACKEND_URL);

function Container() {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [reload, setReload] = useState(false);
  const [openMsgAdmin, setOpenMsgAdmin] = useState(false);
  const [msg, setMsg] = useState(false);
  const [msgErr, setMsgErr] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const courses = useSelector((state) => state.courses);
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const { pathname } = useLocation();

  // Sử dụng useLayoutEffect để cuộn lên đầu trang khi component được render lại
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // cập nhật dư liệu courses của user
  useEffect(() => {
    if (user) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/getCourses`,
          {
            id: user._id,
          },
          {
            headers: { token: `Bearer ${user.accessToken}` },
          }
        )
        .then((res) => {
          setReload(true);
          user.courses = res.data;
        })
        .catch((err) => console.log(err));
    }
  }, [reload, user]);
  // join room ngay khi vào trang - phục vụ cho việc hiện thông báo khi có tin nhắn
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
      socket.removeListener("notification");
    };
  }, [user]);

  // useEffect(() => {
  //   if (courses) {
  //     dispatch(addCourseNew("tokutei"));
  //   }
  // }, [courses]);

  return (
    <main className="container_main md:mt-[7rem]">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {/* btn back to top */}
      <button
        className="fixed bottom-[3rem] right-10  rounded-[50%] z-[7777] "
        id="btn_BackToTop"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: `smooth`,
          });
        }}
      >
        <NavigationIcon style={{ fontSize: "30px", color: "yellow" }} />
      </button>

      <button
        className="fixed right-[2rem] bottom-[35%] z-[7777] p-[1rem] px-[1.3rem] sm:p-0 sm:bg-transparent rounded-[50%] bg-white active:opacity-50 hover:p-[1.5rem] transition-all"
        onClick={() => {
          setOpenChatBox(!openChatBox);
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <ChatInput
            openChatBox={openChatBox}
            setOpenChatBox={setOpenChatBox}
          />
          <span className="text-[1rem] font-bold">Tra cứu</span>
        </div>
      </button>

      {/* btn hiện danh sách thông báo lỗi - chỉ hiện với admin */}
      {user && user.isAdmin && (
        <button
          className="fixed right-10 bottom-[70%] z-[7777] p-4 rounded-[50%] bg-white active:opacity-50 transition-opacity hover:bg-green-500"
          onClick={() => {
            setMsgErr(!msgErr);
          }}
        >
          <NotificationsIcon style={{ fontSize: "3rem", color: "red" }} />
        </button>
      )}
      {msgErr && <MsgErrAdmin />}
      {/* btn ẩn hiện bảng message với thay đổi tùy theo admin hay là user thường */}
      {!user || !user.isAdmin ? (
        <button
          onClick={() => {
            setOpenMsg(true);
          }}
          id="btn-msg"
          className="fixed right-[2rem] bottom-[15rem] rounded-[50%] p-[1rem] sm:p-0 z-[7777] bg-[#4747ef] hover:p-[1.5rem] transition-all "
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
    </main>
  );
}

export default Container;
