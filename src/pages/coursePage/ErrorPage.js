import React, { useState, memo, useCallback } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import TextArea from "antd/es/input/TextArea";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toastSuccess } from "../../redux/slice/toastSlice";
function ErrorPage({ setError, lessonCurrent }) {
  const [state, setState] = useState([]);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      setState([...state, value]);
    } else {
      setState(state.filter((item) => item !== value));
    }
  };
  const handleSendError = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/courses/errMsg`, {
        error: state,
        des: text,
        lesson: lessonCurrent,
      })
      .then((res) => {
        setError(false);
        dispatch(toastSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        // dispatch(toastErr(err.response.data));
      });
  };
  return (
    <div className="fixed z-[6666] top-1/2  w-[50rem] md:w-[90%] pb-10  shadow-desc bg-slate-50 translate-y-[-50%] translate-x-[-50%]  left-1/2 transition-all">
      <CloseIcon
        onClick={() => {
          setError(false);
        }}
        className="hover:text-[red]"
        style={{
          position: "absolute",
          fontSize: "3rem",
          right: "1rem",
          top: "1rem",
          cursor: "pointer",
        }}
      />
      <div className="flex flex-col justify-center w-full p-5 ">
        <h1 className="text-[red] text-[2rem]">
          Thông tin <ErrorIcon />
        </h1>
        <FormControlLabel
          className="flex gap-4 pl-12 mt-5"
          control={
            <input
              type="checkbox"
              onChange={handleChange}
              name="checkedA"
              value="lỗi video"
              className="text-gray-800 border-gray-400 rounded-md scale-[2]"
            />
          }
          label={
            <span className="text-gray-700 font-medium text-[2rem]">
              Lỗi Video - Audio
            </span>
          }
        />{" "}
        <FormControlLabel
          className="flex gap-4 pl-12 mt-5"
          control={
            <input
              type="checkbox"
              onChange={handleChange}
              name="checkedA"
              value="lỗi tài liệu"
              className="text-gray-800 border-gray-400 rounded-md scale-[2]"
            />
          }
          label={
            <span className="text-gray-700 font-medium text-[2rem]">
              Lỗi Tài Liệu
            </span>
          }
        />{" "}
        <FormControlLabel
          className="flex gap-4 pl-12 mt-5"
          control={
            <input
              type="checkbox"
              onChange={handleChange}
              name="checkedA"
              value="lỗi bài tập"
              className="text-gray-800 border-gray-400 rounded-md scale-[2]"
            />
          }
          label={
            <span className="text-gray-700 font-medium text-[2rem]">
              Lỗi Bài tập
            </span>
          }
        />{" "}
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-5 p-5">
        <TextArea
          className="max-h-[15rem] "
          placeholder="Điền lời nhắn với admin..."
          value={text}
          allowClear
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          disabled={state.length === 0 && text === "" && true}
          className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[50px] w-[50%] shadow-red-500 shadow-md ${
            state.length === 0 && text === "" && "opacity-70"
          }`}
          onClick={handleSendError}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
