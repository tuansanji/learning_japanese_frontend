import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Input, Modal, Skeleton } from "antd";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import CHATICON from "../assets/img/open-book.svg";
import Loading from "../component/SupportTab/Loading";

const { Search } = Input;
const ChatInput = ({ openChatBox, setOpenChatBox }) => {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  // phần gửi câu hỏi
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
      setQuestion2("");
      setLoading(true);
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_TKGPT,
      });
      const openai = new OpenAIApi(configuration);
      // 2 mẫu câu hỏi vs từ ng dùng nhập vào
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
          max_tokens: 1000, //  tham số max_tokens
          n: 1,
          stream: false,
        });
        setLoading(false);
        setQuestion1(
          completion.data.choices[0].text.substring(3).replace(/\n/g, "<br>")
        );

        setQuestion2("");
      } catch (error) {
        if (error.response) {
          setLoading(false);
          setQuestion1(
            `<strong style="color:red">Do không đủ kinh phí duy trì key nên chức năng này sẽ tạm dừng. Mong mọi người thông cảm! Mọi người có thể ủng hộ cho bọn em một ít kinh phí <a href="/donate" className="text-blue-500">Tại đây</a>. Dù là <span className="text-blue-500 font-bold">1k</span>
            <span className="text-blue-500 font-bold">2k</span> cũng cám ơn mọi
            người 😊. Sự ủng hộ của các bạn là động lực để nhóm em tiếp tục phát
            triển trang web ạ ❤️</strong>`
          );
          setQuestion2("");
        } else {
          setLoading(false);
          setQuestion1(
            `<strong style="color:red">Do không đủ kinh phí duy trì key nên chức năng này sẽ tạm dừng. Mong mọi người thông cảm! Mọi người có thể ủng hộ cho bọn em một ít kinh phí <a href="/donate" className="text-blue-500">Tại đây</a>. Dù là <span className="text-blue-500 font-bold">1k</span>
            <span className="text-blue-500 font-bold">2k</span> cũng cám ơn mọi
            người 😊. Sự ủng hộ của các bạn là động lực để nhóm em tiếp tục phát
            triển trang web ạ ❤️</strong>`
          );

          setQuestion2("");
        }
      }
    }
  };

  //từ ng dùng điền vào và tự động tạo thêm một câu liên quan để hiện thị ở tab "câu hỏi liên quan"
  useEffect(() => {
    if (question1) {
      setQuestion2("");
      (async () => {
        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_TKGPT,
        });
        const openai = new OpenAIApi(configuration);

        let base2 = `Thêm một số câu nói thêm về ${question1} đi `;

        try {
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: base2,
            temperature: 0.6,
            max_tokens: 1000, // Thêm tham số max_tokens tại đ
            n: 1,
            stream: false,
          });
          setQuestion2(
            completion.data.choices[0].text.substring(2).replace(/\n/g, "<br>")
          );
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            setQuestion2("");
          } else {
            console.log(error.message);
            setQuestion2("");
          }
        }
      })();
    }
  }, [question1]);

  const handleCancel = () => {
    setOpenChatBox(false);
  };
  return (
    <div className="page_gpt">
      {/* <Draggable> */}
      <div>
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
            {question1 && !loading && (
              <div className="flex-1">
                {parse(question1)}
                <div className="flex flex-col pt-5 gap-4">
                  <h2 className="font-bold">Một số câu liên quan</h2>
                  {question2 ? <p>{parse(question2)}</p> : <Skeleton active />}
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
