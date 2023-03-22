import { useState } from "react";
import axios from "axios";
import { Input } from "antd";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const handleSendEmail = () => {
    console.log(123);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`, {
        email: email,
      })
      .then((response) => {
        setMsg(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setMsg(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className=" flex w-[50%] xl:w-[70%]  md:w-[90%] sm:w-full mx-auto h-[350px] mt-[4rem] bg-slate-100 flex-col ">
      <div className="w-full bg-[rgb(151,73,245)]  h-[5rem] flex items-center justify-center">
        <h1 className="text-[2.5rem] text-[white]">Quên mật khẩu</h1>
      </div>

      <div
        className="flex gap-x-5 mx-auto mt-10 w-[60%] md:w-[90%] "
        aria-label="simple-form"
      >
        <Input.Search
          className="bg-red-700 rounded-2xl form_input "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder="Enter your email"
          enterButton="Send"
          size="large"
          loading={loading}
          onSearch={handleSendEmail}
          onClick={() => {
            if (!inputFocused) {
              handleSendEmail();
            }
          }}
        />
      </div>
      <div className="h-[4rem] w-full flex justify-center items-center mt-5">
        <p className="text-[red] text-[1.6rem] font-bold">{msg}</p>
      </div>

      <div className="flex flex-col mt-7 mx-auto w-[90%] mb-[1rem] p-[2rem] leading-4 shadow-desc ">
        <span className="font-bold leading-5">
          <span className="text-black">&nbsp;Lưu ý:</span>
        </span>
        <br />
        <span className="text-[#222222] leading-7">
          » Địa chỉ email của bạn được bảo mật.
        </span>
        <br />
        <span className="text-[#222222] leading-7">
          » Vui lòng nhập đúng địa chỉ email bạn đã đăng kí.
        </span>
        <br />
        <span className="text-[#222222] leading-7">
          » Nếu không thấy tin nhắn đến. Hãy thử vào mục tin nhắn rác kiểm tra.
          thử
        </span>
        <br />
        <span className="text-[#222222] leading-7">
          » Nếu vẫn không thấy thông báo lấy lại mật khẩu. Vui lòng liên hệ
          admin bằng thông tin dưới cuối trang.
        </span>
      </div>
    </div>
  );
}

export default ForgotPassword;
