import React from "react";
import { useParams, Link } from "react-router-dom";

function LessonItem({ lesson }) {
  const params = useParams();
  const { level, way, stage } = params;
  return (
    <section className="w-[25%] px-3 ">
      <div className="mb-8 relative">
        <div
          className=" w-full  overflow-hidden rounded-[13px] hover:bottom-6
     transition-all relative"
        >
          <Link
            to={`/courses/${level}/${way}/${stage}/${lesson
              .split(" ")
              .join("+")}`}
          >
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
              alt=""
              className="h-full"
            />
          </Link>
        </div>
        <p className="mt-[1rem] text-[#19060a] text-[2.2rem] leading-[1.4] font-bold capitalize">
          {lesson}
        </p>
      </div>
    </section>
  );
}

export default LessonItem;
