import React from "react";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import { guidePages } from "../../data/guidePages/guidePages";

function GuidePage() {
  const params = useParams();

  return (
    <div className="relative p-[2rem] ssm:p-0    w-full flex flex-col">
      <div className="flex gap-[5px] ssm:gap-[1px] ssm:text-[1.2rem]">
        <Link to="/">
          <span className="hover:text-[blue]">Trang chủ</span>
        </Link>
        <span> &gt; </span>{" "}
        <Link to="/guide">
          {" "}
          <span className="hover:text-[blue]">Hướng dẫn</span>{" "}
        </Link>{" "}
        &gt;
        <span className="text-[red]">
          {params.question.split("-").join(" ")}
        </span>
      </div>
      {guidePages
        .filter((guide) => guide.link === params.question.split("-").join(" "))
        .map((item, index) => (
          <div key={index} className="p-[6rem] md:p-[3rem] sm:p-[1rem] pt-7 ">
            <h1 className="text-[3.5rem] md:text-[2.5rem]  sm:text-[2rem] ssm:text-[1.7rem] text-[#333] font-bold pb-[2rem] ">
              {item.title}
            </h1>
            {item.img && <img src={item.img} alt="" />}
            <div className="my-[3rem] flex flex-col gap-[2rem] md:my-[2rem]">
              {item.content.map((content, index) => (
                <div
                  key={index}
                  className=" flex flex-col gap-[2rem] md:gap-[1rem]"
                >
                  <h2 className="font-semibold text-[2rem] sm:text-[1.6rem] ">
                    <span>{index + 1}-</span>
                    {content.part}
                  </h2>
                  <p className="text-[1.6rem] sm:text-[1.5rem]">
                    {content.desc}
                  </p>
                  {content.img && (
                    <img
                      className="w-[80%] mx-auto md:w-full"
                      src={content.img}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default GuidePage;
