import React, { useEffect } from "react";
import axios from "axios";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getStageCourse } from "../../redux/apiRequest";

import LessonItem from "./LessonItem";
import Loading from "../../component/Loading";

function StagePage() {
  const dispatch = useDispatch([]);
  const params = useParams();
  const [stageList, setStageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { level, way, stage } = params;

  useEffect(() => {
    getStageCourse(dispatch, level, way, stage)
      .then((stage) => {
        setStageList([...new Set(stage)]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("get stage failed");
      });
  }, [stage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex items-center   flex-row flex-wrap w-[90%] mx-auto mt-[10rem]">
          {stageList &&
            stageList.map((lesson, index) => (
              <LessonItem key={index} lesson={lesson} />
            ))}
        </div>
      )}
    </>
  );
}

export default StagePage;
