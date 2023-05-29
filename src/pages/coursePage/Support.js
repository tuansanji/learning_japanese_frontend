import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LockIcon from "@material-ui/icons/Lock";
import { v4 as uuid } from "uuid";
import {
  getCurrentIndex,
  getLessonCurrent,
} from "../../redux/slice/courseSlice";
import { useCallback, useEffect, memo, useState, useMemo } from "react";
function Support({
  userTest,
  listCurrent,
  stageCourse,
  setOpenMenu,
  isUserTest,
  value,
  audioOrVideo,
  setAudioOrVideo,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //phần lựa chọn bài
  const handleGetLesson = (lesson, index) => {
    if (lesson) {
      if (lesson.pathVideo === "" && lesson.audio !== "") {
        dispatch(
          getLessonCurrent({
            state: "audio",
            data: lesson,
          })
        );
        dispatch(
          getCurrentIndex({
            state: "audioIndex",
            index: index,
          })
        );
      } else if (lesson.pathVideo === "" && lesson.audio === "") {
        dispatch(
          getLessonCurrent({
            state: "video",
            data: lesson,
          })
        );
        dispatch(
          getCurrentIndex({
            state: "videoIndex",
            index: index,
          })
        );
      } else if (lesson.pathVideo !== "") {
        dispatch(
          getLessonCurrent({
            state: "video",
            data: lesson,
          })
        );
        dispatch(
          getCurrentIndex({
            state: "videoIndex",
            index: index,
          })
        );
      }
    }
  };
  //phần icon lên xuống khi bật hiện list
  const handleOpenMenuSub = useCallback((e) => {
    const element = e.target.closest(".content_1");
    const icon = element.querySelector("span.icon");
    icon.classList.toggle("up");
    element.nextElementSibling.classList.toggle("hidden");
  }, []);

  // xác định bài cho lần đầu tiên vào
  useEffect(() => {
    if (
      stageCourse &&
      Array.isArray(stageCourse) &&
      stageCourse.length > 0 &&
      audioOrVideo
    ) {
      localStorage.getItem("audioIndex") &&
        dispatch(
          getCurrentIndex({
            state: "audioIndex",
            index: JSON.parse(localStorage.getItem("audioIndex")),
          })
        );
    } else {
      localStorage.getItem("videoIndex") &&
        dispatch(
          getCurrentIndex({
            state: "videoIndex",
            index: JSON.parse(localStorage.getItem("videoIndex")),
          })
        );
    }
    //phần UI menu bài học
    const activeElement = document.querySelector(".content_2 .active");
    setTimeout(() => {
      if (activeElement) {
        const content2Element = activeElement.closest(".content_2");
        if (content2Element) {
          activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
          content2Element.classList.remove("hidden");
        }
      }
    }, 100);
  }, []);

  // xác định  bài cho các lần tiếp theo
  useEffect(() => {
    if (
      stageCourse &&
      Array.isArray(stageCourse) &&
      stageCourse.length > 0 &&
      audioOrVideo
    ) {
      localStorage.getItem("audioIndex") &&
        dispatch(
          getCurrentIndex({
            state: "audioIndex",
            index: JSON.parse(localStorage.getItem("audioIndex")),
          })
        );
    } else {
      localStorage.getItem("videoIndex") &&
        dispatch(
          getCurrentIndex({
            state: "videoIndex",
            index: JSON.parse(localStorage.getItem("videoIndex")),
          })
        );
    }

    //phần UI menu bài học
    const content2Elements = document.querySelectorAll(".content_2");
    content2Elements.forEach((content2) => {
      const activeElement = content2.querySelector(".content_2 .active");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        content2.classList.remove("hidden");
      } else {
        content2.classList.add("hidden");
      }
    });
  }, [listCurrent, stageCourse]);

  // set khi màn hình tablet phone thì nháy bài học thì list bài học sẽ tự đóng
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // phần đóng mở menu
  useEffect(() => {
    if (
      windowWidth < 800 &&
      JSON.parse(localStorage.getItem("videoIndex")) === 0
    ) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }, []);

  // console.log(listCurrent.sort(compareChapters));
  return (
    <div className="wrapper  bg-[#FFFFFF] h-[74vh] top-0 bottom-0 mt-0 w-full z-[99] border-l-[1px] border-[#e7e7e7]">
      <div className="children bg-[#ffff] flex flex-col h-full w-full">
        <div className="title bg-[#FFFFFF] items-center flex justify-between py-[12px] px-[16px]">
          <h1 className="font-bold text-[2rem] leading-[22.4px] font-[system-family] ">
            Nội dung khóa học
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto content ">
          {listCurrent &&
            listCurrent.map((item, index) => (
              <section key={index}>
                <div
                  className="content_1 bg-[#f7f8fa] cursor-pointer border-b border-[#dedfe0] flex flex-col flex-wrap justify-between py-[8px] px-[12px] sticky top-0 z-[2]  hover:bg-[#ecf0f7]"
                  onClick={(e) => {
                    handleOpenMenuSub(e);
                  }}
                >
                  <h3 className="text-[#000000] text-[1.6rem] font-bold m-0">{`${
                    index + 1
                  }. ${item}`}</h3>
                  <span className="text-[#29303b] text-[1.2rem] font-normal mt-1">
                    {
                      stageCourse.filter((stage) => stage.lesson === item)
                        .length
                    }
                    . bài học
                  </span>
                  <span className="icon text-[#333] text-[2.7rem] absolute right-[1.5rem] items-center justify-center flex">
                    <KeyboardArrowDownIcon style={{ fontSize: "3rem" }} />
                    <KeyboardArrowUpIcon style={{ fontSize: "3rem" }} />
                  </span>
                </div>
                <div className="content_2 ">
                  {stageCourse &&
                    stageCourse
                      .filter((stage) => stage.lesson === item)
                      .sort((a, b) => a.order - b.order)
                      .map((lesson, index) => {
                        // if (!userTest || isUserTest) {
                        if (user) {
                          return (
                            <div
                              key={lesson._id}
                              onClick={(e) => {
                                handleGetLesson(lesson, index);
                                if (windowWidth < 800) {
                                  setOpenMenu(false);
                                }
                              }}
                              className={`item ${
                                JSON.parse(
                                  localStorage.getItem(
                                    audioOrVideo ? "audio" : "video"
                                  )
                                ) &&
                                lesson._id ===
                                  JSON.parse(
                                    localStorage.getItem(
                                      audioOrVideo ? "audio" : "video"
                                    )
                                  )._id
                                  ? "active"
                                  : ""
                              } ${
                                JSON.parse(
                                  localStorage.getItem("arrVideoFinished")
                                ) &&
                                JSON.parse(
                                  localStorage.getItem("arrVideoFinished")
                                ).includes(lesson._id)
                                  ? "learn"
                                  : ""
                              } bg-[#FFFFFF] hover:bg-slate-200 flex flex-row py-[10px] pr-0 pl-[2px] relative `}
                            >
                              <div className="relative flex-1 cursor-pointer ml-7">
                                <h3 className="text-[#333] text-[1.4rem] font-normal leading-[1.4] relative top-[-2px]">
                                  {index + 1}. {lesson.name}
                                </h3>
                                <p className="flex items-center gap-2 text-[1.1rem] mb-0">
                                  <PlayCircleFilledIcon />
                                  <span>
                                    {lesson.timeLine &&
                                      `${Math.floor(lesson.timeLine / 60)}:${
                                        lesson.timeLine % 60 < 10 ? "0" : ""
                                      }${lesson.timeLine % 60}
                            `}
                                  </span>
                                </p>
                              </div>
                              <div
                                className="icon  items-center learn_icon flex justify-center mr-[1.2rem] w-[3.6rem]
"
                              >
                                <CheckCircleIcon style={{ fontSize: "2rem" }} />
                              </div>
                            </div>
                          );
                        } else {
                          if (index < 4) {
                            return (
                              <div
                                key={lesson._id}
                                onClick={(e) => {
                                  handleGetLesson(lesson, index);
                                  if (windowWidth < 800) {
                                    setOpenMenu(false);
                                  }
                                }}
                                className={`item ${
                                  JSON.parse(
                                    localStorage.getItem(
                                      audioOrVideo ? "audio" : "video"
                                    )
                                  ) &&
                                  lesson._id ===
                                    JSON.parse(
                                      localStorage.getItem(
                                        audioOrVideo ? "audio" : "video"
                                      )
                                    )._id
                                    ? "active"
                                    : ""
                                } ${
                                  JSON.parse(
                                    localStorage.getItem("arrVideoFinished")
                                  ) &&
                                  JSON.parse(
                                    localStorage.getItem("arrVideoFinished")
                                  ).includes(lesson._id)
                                    ? "learn"
                                    : ""
                                } bg-[#FFFFFF] hover:bg-slate-200 flex flex-row py-[10px] pr-0 pl-[2px] relative `}
                              >
                                <div className="relative flex-1 cursor-pointer ml-7">
                                  <h3 className="text-[#333] text-[1.4rem] font-normal leading-[1.4] relative top-[-2px]">
                                    {index + 1}. {lesson.name}
                                  </h3>
                                  <p className="flex items-center gap-2 text-[1.1rem] mb-0">
                                    <PlayCircleFilledIcon />
                                    <span>
                                      {lesson.timeLine &&
                                        `${Math.floor(lesson.timeLine / 60)}:${
                                          lesson.timeLine % 60 < 10 ? "0" : ""
                                        }${lesson.timeLine % 60}
                              `}
                                    </span>
                                  </p>
                                </div>
                                <div
                                  className="icon  items-center learn_icon flex justify-center mr-[1.2rem] w-[3.6rem]
"
                                >
                                  <CheckCircleIcon
                                    style={{ fontSize: "2rem" }}
                                  />
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={uuid()}
                                className="bg-[#FFFFFF] hover:bg-slate-200 flex flex-row py-[10px] pr-0 pl-[2px] relative "
                              >
                                <div className="relative flex-1 ml-7">
                                  <h3 className="text-[#333] text-[1.4rem] font-normal leading-[1.4] relative top-[-2px]">
                                    {index + 1}. Nội dung bị ẩn
                                  </h3>
                                  <p className="flex items-center gap-2 text-[1.1rem] mb-0">
                                    <PlayCircleFilledIcon />
                                    <span>đăng nhập để xem</span>
                                  </p>
                                </div>
                                <div
                                  className="icon  items-center learn_icon flex justify-center mr-[1.2rem] w-[3.6rem]
"
                                >
                                  <LockIcon
                                    style={{ fontSize: "2rem", color: "red" }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        }
                      })}
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Support;
