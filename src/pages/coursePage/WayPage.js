import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import axios from "axios";
import Hls from "hls.js";
import Dash from "dashjs";
import Loading from "../../component/SupportTab/Loading";
import MusicPage from "../musicPage.js/MusicPage";
import ScrollableTabsButtonAuto from "./Suport2";
import {
  getCurrentIndex,
  getLessonCurrent,
} from "../../redux/slice/courseSlice";
import { getWayCourse } from "../../redux/apiRequest";
import PDFViewer from "./CanvasPdf";
import baimot from "../../assets/pdf/baimot.pdf";
import HomeWork from "./homeWork";

function WayPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(true);
  const [stageList, setStageList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentLessonList, setCurrentLessonList] = useState([]);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);
  const [documentLesson, setDocumentLesson] = useState("pdf");
  const prevBtn = useRef();
  const nextBtn = useRef();
  const video = useRef();

  const lessonCurrent = useSelector(
    (state) => state.courses.lessonCurrent?.lessonCurrent
  );

  const stageCourseList = useSelector(
    (state) => state.courses?.listStageCurrent
  );
  // hiện tại cứ vậy thôi. sau phải tìm cách fix với giá trị là stageCourseList[0]
  const handleResetAudio = () => {
    dispatch(
      getLessonCurrent({
        state: "audio",
        data: {
          audio: "http://118.27.25.228/Ljapanese/JLPT 1/問題1.mp3",
          author: "dũng mori",
          createdAt: "2023-03-08T13:16:38.025Z",
          lesson: "JLP1",
          level: "n1",
          name: "問題1",
          pathVideo: "",
          pdf: "",
          stage: "AUDIO",
          timeLine: 851,
          updatedAt: "2023-03-09T13:30:15.474Z",
          way: "chặng 3",
          __v: 0,
          _id: "64088ab603e176079214e70d",
        },
      })
    );
    dispatch(
      getCurrentIndex({
        state: "audioIndex",
        index: 0,
      })
    );
  };

  const handleResetVideo = () => {
    dispatch(
      getLessonCurrent({
        state: "video",
        data: {
          author: "dũng mori",
          createdAt: "2023-02-20T13:51:03.715Z",
          desc: "111",
          lesson: "từ vựng 1 đọc chữ hán",
          level: "n1",
          name: "bài một",
          pathVideo: "http://118.27.25.228/Ljapanese/PDF/N1/C1/TV/DCH/1.pdf",
          pdf: "http://118.27.25.228/Ljapanese/PDF/N1/C1/TV/DCH/1.pdf",
          stage: "từ vựng",
          timeLine: 0,
          updatedAt: "2023-03-09T07:58:03.377Z",
          way: "chặng 1",
          __v: 0,
          _id: "63f37ac7afa55c76b2709e6f",
        },
      })
    );
    dispatch(
      getCurrentIndex({
        state: "videoIndex",
        index: 0,
      })
    );
  };
  useEffect(() => {
    getWayCourse(dispatch, params.level, params.way)
      .then((stage) => {
        setStageList([...new Set(stage)]);
        setLoading(false);

        if (stage[0] === "AUDIO") {
          localStorage.getItem("audio")
            ? dispatch(
                getLessonCurrent({
                  state: "audio",
                  data: JSON.parse(localStorage.getItem("audio")),
                })
              )
            : handleResetAudio();
        } else {
          localStorage.getItem("video")
            ? dispatch(
                getLessonCurrent({
                  state: "video",
                  data: JSON.parse(localStorage.getItem("video")),
                })
              )
            : stageCourseList && handleResetVideo();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.way, params.level]);

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
    footer.style.display = "none";
    btnBackToTop.style.display = "none";
    btnMsg.style.display = "none";

    return () => {
      footer.style.display = "block";
      btnBackToTop.style.display = "block";
      btnMsg.style.display = "block";
    };
  }, []);
  const handlePrevLesson = () => {
    let currentIndex = JSON.parse(
      localStorage.getItem(
        lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
      )
    );

    if (currentIndex > 0) {
      dispatch(
        getCurrentIndex({
          state: lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex",
          index: currentIndex - 1,
        })
      );
      let newIndex = JSON.parse(
        localStorage.getItem(
          lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
        )
      );
      dispatch(
        getLessonCurrent({
          state: lessonCurrent.stage === "AUDIO" ? "audio" : "video",
          data: currentLessonList[newIndex],
        })
      );
    }

    const activeElement = document.querySelector(".content_2 .active");
    activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
  };

  //  xác đình đã học xong bái hay chưa và thêm nó vào localStorage. sau này sẽ thêm nó vào db của user
  const handleProgress = (state) => {
    const playedSeconds = state.playedSeconds;
    if (isVideoReady && (playedSeconds / videoDuration) * 100 >= 80) {
      let arr = JSON.parse(localStorage.getItem("arrVideoFinished")) || [];

      localStorage.setItem(
        "arrVideoFinished",
        JSON.stringify([...new Set([...arr, lessonCurrent._id])])
      );
    }
  };

  const handleReady = () => {
    setIsVideoReady(true);
  };
  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  //next bài học
  const handleNextLesson = () => {
    let currentIndex = JSON.parse(
      localStorage.getItem(
        lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
      )
    );
    if (currentIndex < currentLessonList.length - 1) {
      dispatch(
        getCurrentIndex({
          state: lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex",
          index: currentIndex + 1,
        })
      );
      let newIndex = JSON.parse(
        localStorage.getItem(
          lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
        )
      );
      dispatch(
        getLessonCurrent({
          state: lessonCurrent.stage === "AUDIO" ? "audio" : "video",
          data: currentLessonList[newIndex],
        })
      );
    }

    const activeElement = document.querySelector(".content_2 .active");
    activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
  };
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
  }, [lessonCurrent, videoDuration]);

  return (
    <div className="course-page flex w-full md:flex-col md:items-center  ">
      {loading && <Loading />}
      <div
        className={`course-page__video flex flex-col items-center  ${
          openMenu ? "laptop:w-[75%] " : "w-full"
        } 
        overflow-y-auto h-full fixed left-0 lg:w-[100%] md:w-full top-[6rem]`}
      >
        {/* {lessonCurrent &&
        lessonCurrent !== null &&
        lessonCurrent.stage !== "AUDIO" ? (
          <ReactPlayer
            width="100%"
            height="70%"
            url={
              lessonCurrent
                ? lessonCurrent.pathVideo
                : "https://youtu.be/KI6UWLiGUUQ"
            }
            onProgress={handleProgress}
            onReady={handleReady}
            onDuration={handleDuration}
            playing={true}
            controls={true}
            ref={video}
            playsinline={true}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload", // Chặn tải xuống.
                },
              },
            }}
          />
        ) : (
          <MusicPage
            openMenu={openMenu}
            lessonCurrent={lessonCurrent}
            currentLessonList={currentLessonList}
          />
        )} */}
        <div className="py-4">
          <p className="animate-charcter text-[3rem] md:text-[2rem]  ">
            {lessonCurrent && `${lessonCurrent.name} - ${lessonCurrent.stage}`}
          </p>
        </div>

        <div className="w-full flex flex-col min-h-[20rem] mb-[6rem] pt-[1rem] md:pt-0">
          <div
            className="flex pl-[4rem] py-[2rem] md:py-[1rem] pt-0 items-center gap-[3rem] border-b-[1px] border-dashed border-b-[#333] "
            aria-label="button-combination"
          >
            <button
              onClick={() => {
                setDocumentLesson("pdf");
              }}
              className={`shadow-2xl inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide ${
                documentLesson === "pdf"
                  ? "text-white bg-blue-500"
                  : " text-blue-500 border border-blue-500 "
              } rounded-lg h-[40px]`}
            >
              Tài liệu
            </button>
            <button
              onClick={() => {
                setDocumentLesson("doc");
              }}
              className={`shadow-2xl inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide ${
                documentLesson === "pdf"
                  ? "  text-blue-500 border border-blue-500"
                  : "text-white bg-blue-500  "
              } rounded-lg h-[40px]`}
            >
              Bài tập
            </button>
          </div>
          <div className="w-full flex flex-row overflow-x-hidden">
            <div
              className={`${
                documentLesson === "pdf" ? "left-0" : "left-[-100%]"
              } pdfAndHomeWork absolute w-full`}
            >
              {<PDFViewer url={lessonCurrent && lessonCurrent.pdf} />}
            </div>
            <div
              className={`${
                documentLesson === "doc" ? "left-[0]" : "left-[100%]"
              } pdfAndHomeWork absolute w-full `}
            >
              {<HomeWork url={lessonCurrent && lessonCurrent.doc} />}
            </div>
          </div>
        </div>
      </div>

      <ScrollableTabsButtonAuto
        stage={stageList}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <div className="menu_sub z-[9999] tablet:justify-center">
        <button
          ref={prevBtn}
          disabled={
            lessonCurrent &&
            JSON.parse(
              localStorage.getItem(
                lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
              )
            ) === 0
          }
          className={`btn_control md:!text-[1.2rem] ssm:!text-[1rem] 
    ${
      lessonCurrent &&
      JSON.parse(
        localStorage.getItem(
          lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
        )
      ) === 0 &&
      "opacity-40"
    }`}
          onClick={() => {
            handlePrevLesson();
          }}
        >
          <ArrowBackIosIcon /> bài trước
        </button>
        <button
          ref={nextBtn}
          disabled={
            lessonCurrent &&
            JSON.parse(
              localStorage.getItem(
                lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
              )
            ) ===
              currentLessonList.length - 1
          }
          onClick={handleNextLesson}
          className={`btn_control md:!text-[1.2rem] ssm:!text-[1rem]

          ${
            lessonCurrent &&
            JSON.parse(
              localStorage.getItem(
                lessonCurrent.stage === "AUDIO" ? "audioIndex" : "videoIndex"
              )
            ) ===
              currentLessonList.length - 1 &&
            "opacity-40"
          }
          next`}
        >
          bài tiếp theo <ArrowForwardIosIcon />
        </button>
        <div className="infor">
          <p className="animate-charcter text-[2rem] mr-[1rem] md:text-[1.4rem] sm:hidden">
            {` ${
              lessonCurrent &&
              Number(
                JSON.parse(
                  localStorage.getItem(
                    lessonCurrent.stage === "AUDIO"
                      ? "audioIndex"
                      : "videoIndex"
                  )
                )
              ) + 1
            }. 
            ${lessonCurrent && lessonCurrent.name}  `}
          </p>
          <button
            className="btn "
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <SyncAltIcon className=" " style={{ fontSize: "3rem" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WayPage;
