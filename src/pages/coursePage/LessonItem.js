import React from "react";
import { useParams, Link } from "react-router-dom";

function LessonItem({ lesson }) {
  const params = useParams();
  const { level, way, stage } = params;
  return (
    <section className="laptop:w-[25%] md:w-[33%] sm:w-[80%] sm:mx-auto px-3 ">
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgTmhrrutVqwexs_wy804mrY69q8T-YmCPwg&usqp=CAU"
              alt=""
              className="h-full"
            />
          </Link>
        </div>
        <p className="mt-[1rem] text-[#19060a] text-[2.2rem] lg:text-[2rem] md:text-[1.6rem] sm:text-[1.2rem] leading-[1.4] font-bold capitalize ">
          {lesson}
        </p>
      </div>
    </section>
  );
}

export default LessonItem;
