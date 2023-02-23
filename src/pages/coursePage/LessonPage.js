import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NameItem from "./NameItem";
import { getLessonCourse } from "../../redux/apiRequest";
import Loading from "../../component/Loading";
function LessonPages() {
  const params = useParams();
  const [lessonList, setLessonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { level, way, stage, lesson } = params;
  useEffect(() => {
    getLessonCourse(level, way, stage, lesson)
      .then((lesson) => {
        setLessonList(lesson);
        setLoading(false);
      })
      .catch(() => {
        console.log("get lesson course failed");
      });
  }, [lesson]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-[40px] mt-[10rem] mx-auto justify-center ">
          {lessonList &&
            lessonList.map((lesson) => {
              return (
                <NameItem
                  key={lesson._id}
                  name={lesson.name}
                  upload={new Date(lesson.updatedAt).getFullYear()}
                />
              );
            })}
        </div>
      )}
    </>
  );
}

export default LessonPages;
