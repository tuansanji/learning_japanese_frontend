import React from "react";
import { Link } from "react-router-dom";

import { guidePages } from "../../data/guidePages/guidePages";
function GuidePages() {
  return (
    <div className="relative p-[2rem] mt-[3rem]  gap-[3rem] ssm:gap-[2rem] w-[80%] md:w-[90%] sm:w-full mx-auto flex flex-col">
      <div className="flex gap-[5px]">
        <Link to="/">
          <span className="hover:text-[blue]">Trang chủ</span>
        </Link>
        <span> &gt; </span> <span className="text-[red]">Hướng dẫn</span>{" "}
      </div>

      {guidePages?.map((guide, index) => (
        <div
          key={guide.img}
          className="flex gap-6 h-[15rem]  sm:border-b-2 border-[#333] sm:pb-[2rem] ssm:gap-3"
        >
          <div className=" w-[30%] md:w-[40%] sm:hidden h-full  shadow-desc ">
            <Link to={`/guide/${guide.link.split(" ").join("-")}`}>
              <img
                src={guide.img}
                className="h-full w-full  hover:opacity-70"
                alt=""
              />
            </Link>
          </div>
          <div className="w-full h-full overflow-hidden ">
            <Link to={`/guide/${guide.link.split(" ").join("-")}`}>
              <h1 className="text-[2rem] font-bold hover:text-[red]">
                {guide.link}
              </h1>
            </Link>
            <p className="overflow-ellipsis"> {guide.content[0].desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GuidePages;
