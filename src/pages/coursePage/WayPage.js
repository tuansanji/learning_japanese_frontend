import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import axios from "axios";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import Loading from "../../component/SupportTab/Loading";
import MusicPage from "../musicPage.js/MusicPage";
import ScrollableTabsButtonAuto from "./Suport2";
import {
  getCurrentIndex,
  getLessonCurrent,
} from "../../redux/slice/courseSlice";
import { getWayCourse } from "../../redux/apiRequest";
import PDFViewer from "./CanvasPdf";

import HomeWork from "./homeWork";

import ErrorPage from "./ErrorPage";

function WayPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(true);
  const [stageList, setStageList] = useState([]);
  const [userTest, setUserTest] = useState(true);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLessonList, setCurrentLessonList] = useState([]);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);
  const [documentLesson, setDocumentLesson] = useState("");
  const [isUserTest, setIsUserTest] = useState(true);
  const [menuMusic, setMenuMusic2] = useState(false);
  const [audioOrVideo, setAudioOrVideo] = useState(false);
  const [code, setCode] = useState("");

  const prevBtn = useRef();
  const nextBtn = useRef();
  const video = useRef();
  const indexUserTest = 4;

  const lessonCurrent = useSelector(
    (state) => state.courses.lessonCurrent?.lessonCurrent
  );
  const stageCourseList = useSelector(
    (state) => state.courses?.listStageCurrent
  );
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });

  // kiểm tra số khóa học đã mua của user
  useEffect(() => {
    if (user) {
      if (user.courses.includes(params.level)) {
        setUserTest(false);
      }
    }
  }, [user]);

  // kiêm tra xem là video hay audio
  useEffect(() => {
    if (lessonCurrent) {
      if (lessonCurrent.pathVideo === "" && lessonCurrent.audio !== "") {
        setAudioOrVideo(true);
      } else if (lessonCurrent.pathVideo === "" && lessonCurrent.audio === "") {
        setAudioOrVideo(false);
      } else if (lessonCurrent.pathVideo !== "") {
        setAudioOrVideo(false);
      }
    }
  }, [lessonCurrent]);

  useEffect(() => {
    const now = new Date();
    const secretKey = process.env.REACT_APP_SECRETKEY;
    const code = btoa(
      (now.getUTCMinutes() ^ now.getUTCSeconds() ^ 0xffff).toString() +
        secretKey
    );
    setCode(code);
  }, []);
  // cho người dùng test 2 ngày
  useEffect(() => {
    if (!localStorage.getItem("userTest")) {
      let currentTime = Date.now();
      let twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
      localStorage.setItem(
        "userTest",
        JSON.stringify({
          status: true,
          time: currentTime + twoDaysInMilliseconds,
        })
      );
      setIsUserTest(true);
    } else {
      if (JSON.parse(localStorage.getItem("userTest")).status) {
        let currentTime = Date.now();
        if (currentTime >= JSON.parse(localStorage.getItem("userTest")).time) {
          localStorage.setItem(
            "userTest",
            JSON.stringify({
              status: false,
              time: Date.now(),
            })
          );
        }
      } else {
        setIsUserTest(false);
      }
    }
  }, []);
  //dữ liệu lần đầu vào
  const handleResetAudio = useCallback(
    (courses) => {
      if (stageCourseList && stageCourseList.length > 0) {
        dispatch(
          getLessonCurrent({
            state: "audio",
            data: courses,
          })
        );
        dispatch(
          getCurrentIndex({
            state: "audioIndex",
            index:
              JSON.parse(
                localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
              ) || 0,
          })
        );
      }
    },
    [stageCourseList, audioOrVideo]
  );
  //dữ liệu lần đầu vào
  const handleResetVideo = useCallback(
    (courses) => {
      if (stageCourseList && stageCourseList.length > 0) {
        dispatch(
          getLessonCurrent({
            state: "video",
            data: courses,
          })
        );
        dispatch(
          getCurrentIndex({
            state: "videoIndex",
            index:
              JSON.parse(
                localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
              ) || 0,
          })
        );
      }
    },
    [stageCourseList, audioOrVideo]
  );

  useEffect(() => {
    if (lessonCurrent && stageCourseList) {
      let currentStage =
        localStorage.getItem(params.way.split("+").join(" ")) &&
        stageCourseList.filter(
          (course) =>
            course.lesson ===
            JSON.parse(localStorage.getItem(params.way.split("+").join(" ")))
              .lesson
        );
      const result = currentStage.filter(
        (item) =>
          item._id ===
          JSON.parse(localStorage.getItem(params.way.split("+").join(" ")))._id
      );
      let index = currentStage.indexOf(result[0]);
      localStorage.setItem(
        audioOrVideo ? "audioIndex" : "videoIndex",
        JSON.stringify(index)
      );
    }
  }, [params.way, stageCourseList]);

  // thay đổi trong localstorage mỗi lần lessonCurrent thay đổi
  useEffect(() => {
    if (
      lessonCurrent &&
      lessonCurrent.way === params.way.split("+").join(" ") &&
      lessonCurrent.level === params.level
    ) {
      let index =
        JSON.parse(
          localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
        ) || 0;
      localStorage.setItem(
        params.way.split("+").join(" "),
        JSON.stringify({ ...lessonCurrent, currentIndex: index })
      );
    }
  }, [lessonCurrent]);

  // set document
  useEffect(() => {
    if (lessonCurrent) {
      if (lessonCurrent.pdf !== "") {
        setDocumentLesson("pdf");
      } else {
        if (lessonCurrent.doc !== "") {
          setDocumentLesson("doc");
        }
      }
    }
  }, [lessonCurrent]);

  // thực hiện xử lí lần đầu và cấc lần tiếp theo vào
  useEffect(() => {
    getWayCourse(dispatch, params.level, params.way)
      .then((stage) => {
        setStageList([...new Set(stage)]);
        setLoading(false);
        if (!localStorage.getItem(params.way.split("+").join(" "))) return;
        if (
          JSON.parse(localStorage.getItem(params.way.split("+").join(" ")))
            .audio !== ""
        ) {
          localStorage.getItem("audio") &&
          JSON.parse(localStorage.getItem("audio")).way ===
            params.way.split("+").join(" ") &&
          JSON.parse(localStorage.getItem("audio")).level === params.level
            ? dispatch(
                getLessonCurrent({
                  state: "audio",
                  data: JSON.parse(localStorage.getItem("audio")),
                })
              )
            : handleResetAudio(
                JSON.parse(
                  localStorage.getItem(params.way.split("+").join(" "))
                )
              );
        } else {
          localStorage.getItem("video") &&
          JSON.parse(localStorage.getItem("video")).way ===
            params.way.split("+").join(" ") &&
          JSON.parse(localStorage.getItem("video")).level === params.level
            ? dispatch(
                getLessonCurrent({
                  state: "video",
                  data: JSON.parse(localStorage.getItem("video")),
                })
              )
            : handleResetVideo(
                JSON.parse(
                  localStorage.getItem(params.way.split("+").join(" "))
                )
              );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.way, params.level]);

  //lọc list lesson hiện tại
  useEffect(() => {
    if (lessonCurrent && stageCourseList) {
      let lessonList = stageCourseList.filter(
        (stage) =>
          stage.stage === lessonCurrent.stage &&
          stage.lesson === lessonCurrent.lesson
      );
      setCurrentLessonList(lessonList);
    }
  }, [stageCourseList, lessonCurrent]);

  //ẩn footer và back to top
  useEffect(() => {
    const footer = document.querySelector("#footer");
    const btnBackToTop = document.querySelector("#btn_BackToTop");
    const btnMsg = document.querySelector("#btn-msg");
    const messenger = document.querySelector("#fb-root");
    // fb-customer-chat
    footer.style.display = "none";
    if (messenger) messenger.style.display = "none";
    btnBackToTop.style.display = "none";
    if (btnMsg) btnMsg.style.display = "none";

    return () => {
      footer.style.display = "block";
      if (messenger) messenger.style.display = "block";
      btnBackToTop.style.display = "block";
      if (btnMsg) btnMsg.style.display = "block";
    };
  }, []);
  const handlePrevLesson = () => {
    let currentIndex = JSON.parse(
      localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
    );

    if (currentIndex > 0) {
      dispatch(
        getCurrentIndex({
          state: audioOrVideo ? "audioIndex" : "videoIndex",
          index: currentIndex - 1,
        })
      );
      let newIndex = JSON.parse(
        localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
      );
      dispatch(
        getLessonCurrent({
          state: audioOrVideo ? "audio" : "video",
          data: currentLessonList.sort((a, b) => a.order - b.order)[newIndex],
        })
      );
    }

    const activeElement = document.querySelector(".content_2 .active");
    if (activeElement)
      activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  //  xác đình đã học xong bái hay chưa và thêm nó vào localStorage. sau này sẽ thêm nó vào db của user
  let isPosted = false;

  const handleProgress = useCallback(
    (state) => {
      const playedSeconds = state.playedSeconds;
      video.current = playedSeconds;

      if (
        !isPosted &&
        isVideoReady &&
        (playedSeconds / videoDuration) * 100 >= 80
      ) {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/user/historyLearn`,
            {
              username: user.username,
              level: lessonCurrent.level,
              idCourse: lessonCurrent._id,
            },
            {
              headers: {
                token: `Bearer ${user.accessToken}`,
              },
            }
          )
          .then((response) => {
            isPosted = true;
          });

        let arr = JSON.parse(localStorage.getItem("arrVideoFinished")) || [];

        localStorage.setItem(
          "arrVideoFinished",
          JSON.stringify([...new Set([...arr, lessonCurrent._id])])
        );
      }
    },
    [lessonCurrent]
  );

  const handleReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);
  const handleDuration = useCallback((duration) => {
    setVideoDuration(duration);
  }, []);
  //next bài học
  const handleNextLesson = useCallback(() => {
    let currentIndex = JSON.parse(
      localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
    );
    if (
      currentIndex <
      (userTest && !isUserTest
        ? indexUserTest - 1
        : currentLessonList.length - 1)
    ) {
      dispatch(
        getCurrentIndex({
          state: audioOrVideo ? "audioIndex" : "videoIndex",
          index: currentIndex + 1,
        })
      );
      let newIndex = JSON.parse(
        localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
      );
      dispatch(
        getLessonCurrent({
          state: audioOrVideo ? "audio" : "video",
          data: currentLessonList.sort((a, b) => a.order - b.order)[newIndex],
        })
      );
    }
    if (userTest && !isUserTest) {
      if (currentIndex < indexUserTest - 1) {
        const activeElement = document.querySelector(".content_2 .active");
        if (activeElement)
          activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      const activeElement = document.querySelector(".content_2 .active");
      if (activeElement)
        activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // }
  }, [currentLessonList, userTest, isUserTest]);

  // phần thêm thời gian cho video
  useEffect(() => {
    if (
      (lessonCurrent && lessonCurrent.timeLine === null) ||
      (lessonCurrent && lessonCurrent.timeLine === undefined) ||
      (lessonCurrent && lessonCurrent.timeLine === 0)
    ) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/courses/timeLine`, {
          id: lessonCurrent._id,
          timeLine: Number(videoDuration).toFixed(0),
        })
        .then((res) => {
          return;
        })
        .catch((err) => {
          return;
        });
    }
  }, [lessonCurrent]);
  // phần thêm views cho video
  const handlePlay = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/courses/views`, {
      id: lessonCurrent._id,
    });
  };
  return (
    <>
      <div className="flex w-full course-page md:flex-col md:items-center ">
        {loading && <Loading />}
        <div
          className={`course-page__video flex flex-col items-center  ${
            openMenu ? "laptop:w-[75%] " : "w-full"
          } 
        overflow-y-auto h-full fixed left-0 lg:w-[100%] md:w-full top-[6rem]`}
        >
          {lessonCurrent && lessonCurrent !== null && !audioOrVideo ? (
            <div className="h-[70%] md:h-[600px] sm:h-[220px] w-full relative">
              <ReactPlayer
                width="100%"
                height="100%"
                className="react_player"
                url={
                  lessonCurrent.pathVideo !== ""
                    ? `${process.env.REACT_APP_VIDEO_URL}${lessonCurrent.pathVideo}${process.env.REACT_APP_SUB_VIDEO_URL}=${code}`
                    : ""
                }
                onProgress={handleProgress}
                onPlay={handlePlay}
                onReady={handleReady}
                onDuration={handleDuration}
                playing
                controls={true}
                ref={video}
                playsinline={true}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
              <div>\</div>
            </div>
          ) : (
            <MusicPage
              openMenu={openMenu}
              lessonCurrent={lessonCurrent}
              currentLessonList={currentLessonList}
              setMenuMusic2={setMenuMusic2}
            />
          )}
          <div
            className={`${menuMusic ? "pt-[15rem]" : "py-4"} flex flex-col `}
          >
            <p className="animate-charcter text-[3rem] md:text-[2rem] text-center ">
              {lessonCurrent &&
                `${lessonCurrent.name} - ${lessonCurrent.stage}`}
            </p>
            {user && user.isAdmin && lessonCurrent && (
              <span>lượt xem: {lessonCurrent?.views || 0}</span>
            )}
          </div>

          <div
            className={`w-full flex flex-col min-h-[20rem] mb-[6rem]  md:pt-0 ${
              menuMusic ? "pt-[1rem]" : "pt-[1rem]"
            }`}
          >
            <div
              className="flex pl-[4rem] md:pl-0 md:justify-center py-[2rem] md:py-[1rem] pt-0 items-center gap-[3rem] border-b-[1px] border-dashed border-b-[#333] "
              aria-label="button-combination"
            >
              <button
                disabled={lessonCurrent && !lessonCurrent.pdf}
                onClick={() => {
                  setDocumentLesson("pdf");
                }}
                className={`shadow-2xl inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide ${
                  documentLesson === "pdf"
                    ? "text-white bg-blue-500"
                    : " text-blue-500 border border-blue-500 "
                } rounded-lg h-[40px]  ${
                  lessonCurrent && !lessonCurrent.pdf && "opacity-30"
                }`}
              >
                Tài liệu
              </button>
              <button
                disabled={lessonCurrent && !lessonCurrent.doc}
                onClick={() => {
                  setDocumentLesson("doc");
                }}
                className={`shadow-2xl inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide ${
                  documentLesson === "pdf"
                    ? "  text-blue-500 border border-blue-500"
                    : "text-white bg-blue-500  "
                } rounded-lg h-[40px]  ${
                  lessonCurrent && !lessonCurrent.doc && "opacity-30"
                }`}
              >
                Bài tập
              </button>
              <button
                className="inline-flex items-center justify-center px-8 py-4 gap-2 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg h-[40px]"
                onClick={() => {
                  setError(!err);
                }}
              >
                Báo lỗi
                <ContactSupportIcon
                  className="r-[1rem] absalute"
                  style={{ fontSize: "2rem" }}
                />
              </button>

              {err && (
                <ErrorPage setError={setError} lessonCurrent={lessonCurrent} />
              )}
            </div>
            <div className="w-full">
              {lessonCurrent &&
                lessonCurrent.pdf &&
                documentLesson === "pdf" && (
                  <PDFViewer
                    lessonCurrent={lessonCurrent && lessonCurrent}
                    url={lessonCurrent && lessonCurrent.pdf}
                  />
                )}

              {lessonCurrent &&
                lessonCurrent.doc &&
                documentLesson === "doc" && (
                  <HomeWork url={lessonCurrent && lessonCurrent.doc} />
                )}
            </div>
          </div>
        </div>
        <ScrollableTabsButtonAuto
          isUserTest={isUserTest}
          userTest={userTest}
          stage={stageList}
          openMenu={openMenu}
          audioOrVideo={audioOrVideo}
          setAudioOrVideo={setAudioOrVideo}
          setOpenMenu={setOpenMenu}
        />
        <div className="menu_sub z-[9999] tablet:justify-center">
          <button
            ref={prevBtn}
            disabled={
              !lessonCurrent ||
              (lessonCurrent &&
                JSON.parse(
                  localStorage.getItem(
                    audioOrVideo ? "audioIndex" : "videoIndex"
                  )
                ) === 0)
            }
            className={`btn_control md:!text-[1.2rem] ssm:!text-[1rem] 
    ${
      lessonCurrent &&
      JSON.parse(
        localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
      ) === 0 &&
      "opacity-40"
    }`}
            onClick={() => {
              handlePrevLesson();
              // setDocumentLesson("pdf")
            }}
          >
            <ArrowBackIosIcon /> bài trước
          </button>
          <button
            ref={nextBtn}
            disabled={
              !lessonCurrent ||
              (lessonCurrent && !isUserTest
                ? JSON.parse(
                    localStorage.getItem(
                      audioOrVideo ? "audioIndex" : "videoIndex"
                    )
                  ) ===
                  (userTest ? indexUserTest - 1 : currentLessonList.length - 1)
                : JSON.parse(
                    localStorage.getItem(
                      audioOrVideo ? "audioIndex" : "videoIndex"
                    )
                  ) ===
                  currentLessonList.length - 1)
            }
            onClick={handleNextLesson}
            className={`btn_control md:!text-[1.2rem] ssm:!text-[1rem]

          ${
            lessonCurrent &&
            JSON.parse(
              localStorage.getItem(audioOrVideo ? "audioIndex" : "videoIndex")
            ) ===
              currentLessonList.length - 1 &&
            "opacity-40"
          }
          next`}
          >
            bài tiếp theo <ArrowForwardIosIcon />
          </button>
          <div className="infor">
            <p className="animate-charcter text-[2rem] mr-[1rem] md:text-[1.4rem] sm:hidden max-w-[40rem] overflow-ellipsis max-h-[4rem]">
              {` ${
                lessonCurrent &&
                Number(
                  JSON.parse(
                    localStorage.getItem(
                      audioOrVideo ? "audioIndex" : "videoIndex"
                    )
                  )
                ) + 1
              }. 
            ${lessonCurrent && lessonCurrent.name}`}
            </p>
            <span className="font-medium smm:hidden">Chọn bài</span>
            <button
              className="btn "
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              <SyncAltIcon className="" style={{ fontSize: "3rem" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(WayPage);
