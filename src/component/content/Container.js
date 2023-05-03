import { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
export const socket = io(process.env.REACT_APP_BACKEND_URL);

function Container() {
  const [openMsg, setOpenMsg] = useState(false);
  const [reload, setReload] = useState(false);
  const [openMsgAdmin, setOpenMsgAdmin] = useState(false);
  const [msg, setMsg] = useState(false);
  const [msgErr, setMsgErr] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
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

  return (
    <div className="container_main md:mt-[7rem]">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {/* btn back to top */}
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
      {/* btn hiện danh sách thông báo lỗi - chỉ hiện với admin */}
      {user && user.isAdmin && (
        <button
          className="fixed right-10 bottom-[50%] z-[7777] p-4 rounded-[50%] bg-white active:opacity-50 transition-opacity hover:bg-green-500"
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
