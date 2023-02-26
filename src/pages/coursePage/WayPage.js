import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWayCourse } from "../../redux/apiRequest";
import ReactPlayer from "react-player";
import Loading from "../../component/Loading";
import ScrollableTabsButtonAuto from "./Suport2";
import { getLessonCurrent } from "../../redux/slice/courseSlice";
import { Document, Page } from "react-pdf";
// import pdf from "../../assets/pdf/baimot.pdf";
function WayPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const [stageList, setStageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const lessonCurrent = useSelector(
    (state) => state.courses.lessonCurrent?.lessonCurrent
  );
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
      <ScrollableTabsButtonAuto stage={stageList} />
    </div>
  );
}

export default WayPage;
