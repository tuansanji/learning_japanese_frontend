import React from "react";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CourseItemPage({ img, lesson, hour, state, hourLearn, title, level }) {
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  return (
    <div className=" w-[960px] h-[145px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]">
      <div className="flex gap-[5rem] h-[100%] px-[5rem] sm:px-[3rem] sm:pr-0 sm:gap-[2rem] bg-[#ded7e1] overflow-hidden">
        <div className=" justify-center items-center flex">
          <img src={img} alt="" />
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-1  flex-1  text-[1.8rem] xl:text-[1.3rem] sm:hidden">
          <div className="w-[100%] h-[100%] m-auto items-center flex  md:flex md:justify-center ">
            <span className="text-[red] mr-5">{lesson}</span> bài học
          </div>
          <div className="w-[100%] h-[100%]  m-auto items-center flex  md:flex md:justify-center ">
            <span className="text-[red] mr-5">{state}</span> bài giảng
          </div>
          <div className="w-[100%] h-[100%]  m-auto items-center flex  md:flex md:justify-center ">
            <span className="text-[red] mr-5">{hour}</span> giờ học
          </div>
          <div className="w-[100%] h-[100%]  m-auto items-center flex  md:flex md:justify-center  ">
            <span className="text-[red] mr-5">{hourLearn}</span> giờ luyện thi
          </div>
        </div>
        <div className="flex flex-2 justify-center items-center flex-col gap-3 sm:w-[80%] ">
          <Link className="pt-[2rem]" to={`/courses/${level}`}>
            <Button
              variant="contained"
              className="h-[4rem] text-[2rem] hover:h-[4.5rem] md:w-[100px]"
              color="secondary"
            >
              Xem chi tiết khóa học
            </Button>
          </Link>
          <p
            className={`${user && user.userTest ? "hidden" : "flex"}  ${
              user && user.courses && user.courses.includes(level)
                ? "hidden"
                : "flex"
            } items-center justify-center  sm:mt-1  `}
          >
            <span className="text-[1.4rem] sm:text-[1.3rem] mr-2 line-through">
              399.000đ
            </span>
            <span className="text-[#f47425] text-[1.6rem] sm:text-[1.4rem]font-semibold">
              139.000đ
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseItemPage;
