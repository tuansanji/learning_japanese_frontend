import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toastErr, toastSuccess } from "../../../../redux/slice/toastSlice";
function MockTest({ mockTest, setMockTest }) {
  const dispatch = useDispatch();
  const [lessonTest, setLessonTest] = useState({
    level: "",
    name: "",
    lesson: "",
    time: 0,
    audio: "",
    html: "",
    question: 0,
  });
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const handlePostMockTest = () => {
    if (
      lessonTest.level === "" ||
      lessonTest.name === "" ||
      lessonTest.lesson === "" ||
      lessonTest.html === ""
    ) {
      dispatch(toastErr("Điền đây đủ đi mày"));
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/mockTest/lesson`,
          lessonTest,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          dispatch(toastSuccess(res.data));
        })
        .catch((err) => {
          dispatch(toastErr(err.response.data));
        });
    }
  };
  return (
    <div>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity ease-out duration-300 pointer-events-none  ${
          mockTest ? "opacity-1 z-[1111]" : "opacity-0 z-[-9999]"
        }`}
        id="overlay"
      >
        <div className="flex bg-white rounded-xl overflow-hidden shadow-sm pointer-events-auto  w-[70%] h-[90%] absolute">
          <CloseIcon
            onClick={() => {
              setMockTest(false);
            }}
            className="absolute right-0 top-[0] hover:bg-neutral-400 cursor-pointer"
            style={{ fontSize: "4rem" }}
          />

          <div className=" flex flex-col gap-7 px-[4rem] py-[2rem] w-full h-full">
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="name"
              >
                Name :
              </label>
              <input
                value={lessonTest.name}
                onChange={(e) => {
                  setLessonTest({
                    ...lessonTest,
                    name: e.target.value,
                  });
                }}
                id="name"
                type="text"
                placeholder="Điền tên bài học..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="level"
              >
                Level :
              </label>
              <input
                value={lessonTest.level}
                onChange={(e) => {
                  setLessonTest({
                    ...lessonTest,
                    level: e.target.value,
                  });
                }}
                id="level"
                type="text"
                placeholder="Điền level bài học..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="lesson"
              >
                lesson :
              </label>
              <input
                value={lessonTest.lesson}
                onChange={(e) => {
                  setLessonTest({
                    ...lessonTest,
                    lesson: e.target.value,
                  });
                }}
                id="lesson"
                type="text"
                placeholder="Điền tên bài học..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="time"
              >
                time :
              </label>
              <input
                value={lessonTest.time}
                onChange={(e) => {
                  setLessonTest({
                    ...lessonTest,
                    time: e.target.value,
                  });
                }}
                id="time"
                type="text"
                placeholder="Điền thời gian bài test..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="audio"
              >
                audio :
              </label>
              <input
                value={lessonTest.audio}
                onChange={(e) => {
                  setLessonTest({
                    ...lessonTest,
                    audio: e.target.value,
                  });
                }}
                id="audio"
                type="text"
                placeholder="Điền file audio..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="html"
              >
                html :
              </label>
              <input
                value={lessonTest.html}
                onChange={(e) => {
                  setLessonTest({
                    ...lessonTest,
                    html: e.target.value,
                  });
                }}
                id="html"
                type="text"
                placeholder="Điền file html..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="question"
              >
                question :
              </label>
              <input
                value={lessonTest.question}
                onChange={(e) => {
                  setLessonTest({
                    ...lessonTest,
                    question: e.target.value,
                  });
                }}
                id="question"
                type="text"
                placeholder="Điền tổng số câu hỏi..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
          </div>
          <div className="w-[500px] bg-slate-50 flex flex-col p-[2rem] ">
            <div
              className="flex items-center justify-around  w-full border-b-2  pb-[3rem]"
              aria-label="button-combination"
            >
              <button
                onClick={() => {
                  handlePostMockTest();
                }}
                className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 hover:opacity-60 rounded-lg h-[60px]"
              >
                POST
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-blue-500 border border-blue-500 hover:bg-gray-300 rounded-lg h-[60px]">
                RESET
              </button>
            </div>
            <div className=" mt-10 shadow-desc p-4">
              <div className=" flex flex-col gap-5">
                <img src="https://jlpt.site/files/img/mocktest1.png" alt="" />

                <span className="text-[#222222]">
                  » Giai đoạn{" "}
                  <span className="font-bold text-red-600">: Lesson</span>
                </span>
                <span className="text-[#222222]">» 2 cái còn lại kệ</span>

                <img src="https://jlpt.site/files/img/mocktest2.png" alt="" />
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[#222222]">
                  » Nghe không hiều{" "}
                  <span className="font-bold text-red-600">: Name</span>
                </span>
                <span className="text-[#222222]">
                  » Câu hỏi{" "}
                  <span className="font-bold text-red-600">: Question</span>
                </span>
                <span className="text-[#222222]">
                  » Thời gian làm{" "}
                  <span className="font-bold text-red-600">: Time</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockTest;
