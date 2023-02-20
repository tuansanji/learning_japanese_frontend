import React, { useEffect } from "react";
import axios from "axios";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getStageCourse } from "../../redux/apiRequest";

import LessonItem from "./LessonItem";

function StagePage() {
  const dispatch = useDispatch([]);
  const params = useParams();
  const [stageList, setStageList] = useState([]);
  const { level, way, stage } = params;

  useEffect(() => {
    const handleGetStage = async () => {
      const stageList = await axios.get(
        `${process.env.BACKEND_URL}/courses/${level}/${way}/${stage}`
      );

      let arr = [];
      await stageList.data.forEach((way) => way && arr.push(way.lesson));
      setStageList([...new Set(arr)]);
    };
    handleGetStage();
    // getStageCourse(dispatch, level, way, stage);
  }, []);

  return (
    <div className="flex w-[80%] gap-5 mx-auto mt-[10rem]">
      {stageList &&
        stageList.map((lesson, index) => (
          <LessonItem key={index} lesson={lesson} />
        ))}
    </div>
  );
}

export default StagePage;
