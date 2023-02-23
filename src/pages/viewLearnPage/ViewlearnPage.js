import { useState, useEffect } from "react";
import ListLesson from "./ListLesson";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

import "./main.scss";
import { getCurrentLesson, getLessonCourse } from "../../redux/apiRequest";
import Loading from "../../component/Loading";
import FullWidthTabs from "./supportMenu";
import ScrollableTabsButtonPrevent from "./supportMenu";

function ViewlearnPage() {
  const params = useParams();
  const { level, way, stage, lesson, name } = params;
  const [learn, setLearn] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentLesson(level, way, stage, lesson, name)
      .then((lesson) => {
        setLearn(lesson[0]);
        setLoading(false);
      })
      .catch(() => {
        console.log("get current lesson failed");
      });
  }, [name]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="course-page flex w-full md:flex-col justify-center md:items-center  ">
          {learn && (
            <div className="course-page__video flex flex-col items-center  laptop:w-[60%]  lg:w-[50%] md:w-full">
              <ReactPlayer
                width="100%"
                height="500px"
                url={learn.pathVideo}
                playing={true}
                controls={true}
              />

              <div className="mt-10">
                <p className="animate-charcter text-[3rem] ">{learn.name}</p>
              </div>
            </div>
          )}
          <div className="mt-[50px] w-[500px] md:w-[90%] bg-[red] h-full ">
            {/* <ListLesson></ListLesson> */}
            <ScrollableTabsButtonPrevent />
          </div>
        </div>
      )}
    </>
  );
}

export default ViewlearnPage;
