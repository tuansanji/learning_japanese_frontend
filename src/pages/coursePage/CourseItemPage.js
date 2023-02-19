import React from "react";
import { Link } from "react-router-dom";

function CourseItemPage({ img, lesson, hour, state, hourLearn, title, level }) {
  return (
    <div className=" w-[960px] h-[145px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] ">
      <div className="flex gap-[5rem] h-[100%] px-[5rem]">
        <div className="flex-2 justify-center items-center flex">
          <img src={img} alt="" />
        </div>
        <div className="grid gap-4 grid-cols-2 flex-1  text-[1.8rem]">
          <div className="w-[100%] h-[100%] m-auto items-center flex  ">
            <span className="text-[red] mr-5">{lesson}</span> bài học
          </div>
          <div className="w-[100%] h-[100%]  m-auto items-center flex ">
            <span className="text-[red] mr-5">{state}</span> bài giảng
          </div>
          <div className="w-[100%] h-[100%]  m-auto items-center flex  ">
            <span className="text-[red] mr-5">{hour}</span> giờ học
          </div>
          <div className="w-[100%] h-[100%]  m-auto items-center flex  ">
            <span className="text-[red] mr-5">{hourLearn}</span> giờ luyện thi
          </div>
        </div>
        <div className="flex flex-2 justify-center items-center flex-col gap-10">
          <div className="text-[1.6rem] w-[200px] text-center text-[blue] font-serif">
            {title}
          </div>
          <Link
            to={`/course/${level}`}
            className="w-[90%] bg-green-400 p-4 rounded-[10px] text-[#fff] hover:w-[100%] hover:h-[30%] hover:text-[#333] hover:text-[1.4rem] transition-all text-center"
          >
            xem chi tiết khóa học
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseItemPage;
