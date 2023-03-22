import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import msgSvg from "../../../assets/img/msg.svg";
import io from "socket.io-client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const socket = io(process.env.REACT_APP_BACKEND_URL);

function MsgUser({ setOpenMsg, idRoom, setMsg }) {
  const msgRef = useRef(null);
  const newMsgRef = useRef();
  const [username, setUsername] = useState("Khách");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  useEffect(() => {
    if (user) {
      socket.emit("joinRoom", idRoom || user._id);
      setMsg(false);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/message/user`, {
          id: idRoom || user._id,
        })
        .then((response) => {
          setMessages([...response.data[0].message.reverse()]);
        })
        .catch((err) => {
          console.log(err);
        });

      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
    return () => {
      // socket.emit("disconnect", user._id);
      socket.removeListener("message");
      setMsg(false);
    };
  }, [user, idRoom]);

  useEffect(() => {
    msgRef.current && msgRef.current.focus();

    newMsgRef.current &&
      newMsgRef.current.scrollIntoView({
        // behavior: "smooth",
      });
  }, [messages]);

  const sendMessage = () => {
    const messageData = {
      username: user.isAdmin ? "Admin" : username,
      message,
      isAdmin: user.isAdmin,
      id: idRoom || user._id,
    };
    // setMessages([...messages, messageData]);
    socket.emit("message", messageData);

    setMessage("");
    msgRef.current.focus();
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      setUsername("Admin");
    } else if (user && !user.isAdmin) {
      setUsername(user.username);
    }
  }, [user]);

  const props = {
    action: "",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };
  return (
    <div className="fixed flex flex-col justify-between overflow-hidden w-[34rem] h-[48rem] bottom-[3rem] right-[2rem] z-[7778] bg-[#FFFFFF] rounded-2xl shadow-desc">
      <div className="h-[10rem] bg-[brown] text-[#ffff] flex flex-col justify-center items-center px-[3rem] relative transition-all">
        <CloseIcon
          onClick={() => {
            setOpenMsg(false);
          }}
          className="right-2 top-2 cursor-pointer hover:opacity-50"
          style={{ position: "absolute", fontSize: "2.5rem" }}
        />
        <h1 className="font-semibold text-[1.6rem]">
          Trò chuyện với chúng tôi
        </h1>
        <p>
          Chúng tôi sẵn sàng trợ giúp. Vui lòng hỏi chúng tôi bất cứ điều gì
          hoặc chia sẻ phản hồi của bạn
        </p>
      </div>
      <div className="chatbot flex flex-col justify-start items-start gap-5 overflow-y-auto max-h-[300px] pt-[1rem] pb-[3rem] ">
        {messages.length > 0 ? (
          messages.map((ms) => (
            <div
              className={`flex w-full  ${
                ms.username === "Admin" ? "flex-row-reverse" : ""
              }`}
              ref={newMsgRef}
              key={uuidv4()}
            >
              <div
                className={`flex w-[70%] gap-5 mx-2 ${
                  ms.username === "Admin"
                    ? "flex-row-reverse bg-[#79B9D7] "
                    : "bg-[#ccc] "
                } 
                rounded-md p-[1rem]`}
              >
                <p>
                  <strong className="flex items-center flex-row justify-center h-full">
                    <span> {ms.username === "Admin" && ": "}</span>
                    {ms.username}{" "}
                    <span> {!(ms.username === "Admin") && ": "}</span>
                  </strong>
                </p>
                <p>{ms.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="mx-auto flex justify-center flex-col items-center gap-10">
            <img className="w-[50%]" src={msgSvg} alt="" />
            <p>Gửi tin nhắn để bắt đầu cuộc hội thoại</p>
          </div>
        )}
      </div>
      <div className="min-h-[7rem] flex flex-col gap-2 py-[1rem] w-full">
        <Upload {...props} className="ml-5">
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <div className="flex w-full gap-[2rem] justify-between px-[1rem] items-center">
          <input
            ref={msgRef}
            className="h-[3rem] border-2 rounded-xl w-full p-[1rem] py-[2rem] outline-none  "
            type="text"
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (user) {
                  if (message) {
                    sendMessage();
                  }
                } else {
                  alert("Vui lòng đăng nhập trước khi nhắn!");
                }
              }
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (user) {
                if (message) {
                  sendMessage();
                }
              } else {
                alert("Vui lòng đăng nhập trước khi nhắn!");
              }
            }}
            className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[80%]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MsgUser;
