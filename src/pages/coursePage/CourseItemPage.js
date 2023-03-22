import React from "react";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

function CourseItemPage({ img, lesson, hour, state, hourLearn, title, level }) {
  return (
    <div className=" w-[960px] h-[145px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]">
      <div className="flex gap-[5rem] h-[100%] px-[5rem] bg-[#ded7e1] overflow-hidden">
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
        <div className="flex flex-2 justify-center items-center flex-col gap-10 sm:w-[80%]">
          <Link to={`/courses/${level}`}>
            <Button
              variant="contained"
              className="h-[4rem] text-[2rem] hover:h-[4.5rem] md:w-[100px]"
              color="secondary"
            >
              Xem chi tiết khóa học
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseItemPage;
