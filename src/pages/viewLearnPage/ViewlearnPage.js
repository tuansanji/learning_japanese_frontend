import { useState, useEffect } from "react";
import ListLesson from "./ListLesson";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

import "./main.scss";
import { getLessonCourse } from "../../redux/apiRequest";

function ViewlearnPage() {
  const params = useParams();
  const { level, way, stage, lesson, name } = params;
  const dispatch = useDispatch();
  const [learn, setLearn] = useState([]);

  useEffect(() => {
    const handleGetName = async () => {
      const learnList = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/courses/${level}/${way}/${stage}/${lesson}/${name}`
      );
      setLearn(learnList.data[0]);
    };
    handleGetName();
  }, []);

  return (
    <div className="course-page flex">
      {learn && (
        <div className="course-page__video flex flex-col items-center justify-center">
          <ReactPlayer url={learn.pathVideo} playing={true} controls={true} />
          <video className="w-[80%] " controls>
            <source src={learn.pathVideo} type="video/mp4" />
          </video>
          <div className="mt-10">
            <p className="text-[3rem] text-[red]">{learn.name}</p>
          </div>
        </div>
      )}
      <div className="mt-[50px]">
        <p className="text-[2rem] mb-[3rem] text-[#3d45d8]">
          Nội Dung Khóa Học
        </p>

        {/* <ListLesson></ListLesson> */}
      </div>
    </div>
  );
}

export default ViewlearnPage;
