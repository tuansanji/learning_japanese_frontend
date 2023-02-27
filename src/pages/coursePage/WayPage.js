import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStageCourse, getWayCourse } from "../../redux/apiRequest";
import ReactPlayer from "react-player";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Loading from "../../component/Loading";
import ScrollableTabsButtonAuto from "./Suport2";
import {
  getCurrentIndex,
  getLessonCurrent,
} from "../../redux/slice/courseSlice";
import { Document, Page } from "react-pdf";
import MenuIcon from "@material-ui/icons/Menu";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
function WayPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(true);
  const [stageList, setStageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentLessonList, setcurrentLessonList] = useState([]);
  const prevBtn = useRef();
  const nextBtn = useRef();

  const lessonCurrent = useSelector(
    (state) => state.courses.lessonCurrent?.lessonCurrent
  );

  const stageCourseList = useSelector(
    (state) => state.courses?.listStageCurrent
  );
  useEffect(() => {
    if (stageCourseList) {
      let lessonList = stageCourseList.filter(
        (stage) =>
          stage.stage === lessonCurrent.stage &&
          stage.lesson === lessonCurrent.lesson
      );
      setcurrentLessonList(lessonList);
    }
  }, [stageCourseList, lessonCurrent]);

  const handlePrevLesson = () => {
    let currentIndex = JSON.parse(localStorage.getItem("index"));
    if (currentIndex > 0) {
      dispatch(getCurrentIndex(currentIndex - 1));
      let newIndex = JSON.parse(localStorage.getItem("index"));
      dispatch(getLessonCurrent(currentLessonList[newIndex]));
      const activeElement = document.querySelector(".content_2 .active");
      activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleNextLesson = () => {
    let currentIndex = JSON.parse(localStorage.getItem("index"));

    if (currentIndex < currentLessonList.length - 1) {
      dispatch(getCurrentIndex(currentIndex + 1));
      let newIndex = JSON.parse(localStorage.getItem("index"));
      dispatch(getLessonCurrent(currentLessonList[newIndex]));
      const activeElement = document.querySelector(".content_2 .active");
      activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    getWayCourse(dispatch, params.level, params.way)
      .then((stage) => {
        setStageList([...new Set(stage)]);
        setLoading(false);
        getLessonCurrent(JSON.parse(localStorage.getItem("lesson"))) &&
          dispatch(
            getLessonCurrent(JSON.parse(localStorage.getItem("lesson")))
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.way, params.level]);

  return (
    <div className="course-page flex w-full md:flex-col justify-center md:items-center  ">
      <div className="course-page__video flex flex-col items-center  laptop:w-[60%]  lg:w-[50%] md:w-full">
        {loading ? (
          <Loading />
        ) : (
          <ReactPlayer
            width="100%"
            height="500px"
            url={lessonCurrent && lessonCurrent.pathVideo}
            playing={true}
            controls={true}
          />
        )}

        <div className="mt-10">
          <p className="animate-charcter text-[3rem] ">
            {lessonCurrent && lessonCurrent.name}
          </p>
        </div>
        <div className="w-full">
          <embed
            src={process.env.PUBLIC_URL + "/baimot.pdf"}
            width="100%"
            height="1000"
            type="application/pdf"
          />
        </div>
      </div>
      <div>
        {/* <Document
          file={process.env.PUBLIC_URL + "/baimot.pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document> */}
        {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}
      </div>
      <div className=" h-full w-[30%] md:hidden"></div>
      <ScrollableTabsButtonAuto stage={stageList} openMenu={openMenu} />
      <div className="menu_sub z-[9999]">
        <button
          ref={prevBtn}
          disabled={JSON.parse(localStorage.getItem("index")) === 0}
          className={`prev 
          
          
    ${JSON.parse(localStorage.getItem("index")) === 0 && "opacity-40"}`}
          onClick={() => {
            handlePrevLesson();
          }}
        >
          <ArrowBackIosIcon /> bài trước
        </button>
        <button
          ref={nextBtn}
          onClick={handleNextLesson}
          className={`prev 
          
          
          ${
            JSON.parse(localStorage.getItem("index")) ===
              currentLessonList.length - 1 && "opacity-40"
          } next`}
        >
          bài tiếp theo <ArrowForwardIosIcon />
        </button>
        <div className="infor">
          <p className="animate-charcter text-[2rem] mr-[1rem]">
            {` ${Number(localStorage.getItem("index")) + 1}. 
            ${lessonCurrent && lessonCurrent.name} `}
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
