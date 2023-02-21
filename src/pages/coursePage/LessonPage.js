import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NameItem from "./NameItem";
function LessonPages() {
  const params = useParams();
  const [lessonList, setLessonList] = useState([]);
  const { level, way, stage, lesson } = params;
  useEffect(() => {
    const handleGetLesson = async () => {
      const lessonListDB = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/courses/${level}/${way}/${stage}/${lesson}`
      );
      setLessonList(lessonListDB.data);
    };
    handleGetLesson();
  }, []);

  return (
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
  );
}

export default LessonPages;
