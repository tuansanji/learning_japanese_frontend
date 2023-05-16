import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import CHATICON from "../assets/img/open-book.svg";
import { Input, Modal, Skeleton } from "antd";
import parse from "html-react-parser";

import Loading from "../component/SupportTab/Loading";
import { useSelector } from "react-redux";
const { Search } = Input;
const ChatInput = () => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [response, setResponse] = useState("");
  const [response2, setResponse2] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const handleSubmit = async (value) => {
    if (value) {
      if (localStorage.getItem("gpt-count")) {
        let currentCount = Number(
          JSON.parse(localStorage.getItem("gpt-count"))
        );
        if (user) {
          if (currentCount >= 40) {
            alert("Vui lòng liên hệ với chúng tôi để mở hết chức năng!");
            return;
          }
        } else {
          if (currentCount >= 20) {
            alert("Vui lòng đăng kí tài khoản để tiếp tục sử dụng!");
            return;
          }
        }

        let nextCount =
          Number(JSON.parse(localStorage.getItem("gpt-count"))) + 1;
        localStorage.setItem("gpt-count", JSON.stringify(nextCount));
      } else {
        localStorage.setItem("gpt-count", JSON.stringify(0));
      }
      setResponse2("");
      setLoading(true);
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_TKGPT,
      });
      const openai = new OpenAIApi(configuration);

      let baseText = `
trả lời dùm tôi theo form:
chuyển từ "${value}" trong tiếng nhật là  :
Một số câu với từ "${value}" trong tiếng nhật là :
`;

      let base2 = `Từ "${value}" trong tiếng nhật có là gì? Đặt câu ví dụ với từ "${value}" trong tiếng nhật`;

      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: base2,
          temperature: 0.6,
          max_tokens: 1000, // Thêm tham số max_tokens tại đ
          n: 1,
          stream: false,
        });
        setLoading(false);
        setResponse(
          completion.data.choices[0].text.substring(3).replace(/\n/g, "<br>")
        );

        setResponse2("");
      } catch (error) {
        if (error.response) {
          setLoading(false);
          console.log(error.response.status);
          console.log(error.response.data);
          setResponse2("");
        } else {
          setLoading(false);
          console.log(error.message);
          setResponse2("");
        }
      }
    }
  };
  useEffect(() => {
    if (response) {
      setResponse2("");
      (async () => {
        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_TKGPT,
        });
        const openai = new OpenAIApi(configuration);

        let base2 = `Thêm một số câu nói thêm về ${response} đi `;

        try {
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: base2,
            temperature: 0.6,
            max_tokens: 1000, // Thêm tham số max_tokens tại đ
            n: 1,
            stream: false,
          });

          setResponse2(
            completion.data.choices[0].text.substring(2).replace(/\n/g, "<br>")
          );
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            setResponse2("");
          } else {
            console.log(error.message);
            setResponse2("");
          }
        }
      })();
    }
  }, [response]);
  const handleCancel = () => {
    setOpenChatBox(false);
  };
  return (
    <div className="page_gpt">
      {/* <Draggable> */}
      <div
        onClick={() => {
          setOpenChatBox(!openChatBox);
        }}
      >
        <div className="w-10 h-10 rounded-[9999px] flex flex-col   cursor-pointer">
          <img src={CHATICON} alt="" className="object-cover" />
        </div>
      </div>
      {/* </Draggable> */}
      {openChatBox && (
        <Modal
          title="Tra cứu từ điển"
          width="70%"
          id="chat"
          open={openChatBox}
          onCancel={handleCancel}
          maskClosable={false}
          className="modal__gpt"
          style={{ top: "50px" }}
          footer={[]}
        >
          <div className="pt-[2rem] gap-9 min-h-[30rem] flex flex-col">
            <Search
              disabled={loading}
              placeholder="Tra từ vựng, ngữ pháp, kanji, mẫu câu,.."
              allowClear
              maxLength={40}
              enterButton={
                <button
                  disabled={loading}
                  className={`p-[12px] ml-[2px] rounded-sm bg-blue-500 text-white ${
                    loading ? "opacity-50" : "opacity-100"
                  }`}
                >
                  Tìm kiếm
                </button>
              }
              size="large"
              onSearch={handleSubmit}
            />
            {loading && <Loading />}
            {response && !loading && (
              <div className="flex-1">
                {parse(response)}
                <div className="flex flex-col pt-5 gap-4">
                  <h2 className="font-bold">Một số câu liên quan</h2>
                  {response2 ? <p>{parse(response2)}</p> : <Skeleton active />}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ChatInput;
