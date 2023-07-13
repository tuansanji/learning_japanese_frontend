import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";

import MsgUser from "./MsgUser";

function MsgAdmin({ setOpenMsgAdmin, setMsg }) {
  const [listRoom, setListRoom] = useState([]);
  const [idRoom, setIdRoom] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  // lấy hết dữ liệu all room
  useEffect(() => {
    if (user && user.isAdmin) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/message/allRoom
`,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((response) => {
          setListRoom(response?.data.reverse());
        });
    }
  }, [user]);

  return (
    <div
      className="fixed w-[50%] justify-center p-5 top-0 left-0 bottom-0 
    flex  z-[8000] bg-pink-200"
    >
      <CloseIcon
        onClick={() => {
          setOpenMsgAdmin(false);
        }}
        className="right-2 top-2 cursor-pointer hover:opacity-50"
        style={{ position: "absolute", fontSize: "4rem" }}
      />
      <div className="w-full flex flex-wrap gap-10 overflow-y-auto">
        {listRoom?.map((room) => (
          <div
            className="cursor-pointer bg-slate-100 h-[8rem] p-4 w-[45%] hover:bg-[red] transition-all "
            key={uuid()}
            onClick={() => {
              setIdRoom(room.to);
              setOpenMenu(true);
            }}
          >
            <div
              aria-label="card-horizontal"
              className="flex items-center gap-x-5"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-lg">
                <img
                  src="https://bit.ly/3zzCTUT"
                  alt=""
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-1 gap-y-1 ">
                <h3 className="text-[2rem] font-bold text-black">
                  {room.from}
                </h3>
                <span className="text-[2rem] text-gray-400">
                  {moment(room.createdAt).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openMenu && (
        <MsgUser idRoom={idRoom} setOpenMsg={setOpenMenu} setMsg={setMsg} />
      )}
    </div>
  );
}

export default MsgAdmin;
