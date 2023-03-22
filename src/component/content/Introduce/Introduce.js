import React from "react";
import { Link } from "react-router-dom";

import "./introduce.scss";

function Introduce({ address, title, titleSub, description, isBtn, img }) {
  return (
    <div className="introduce  laptop:w-[80%] lg:w-[90%] px-[15px] mx-auto">
      <div className={`row flex  mt-[60px] mx-[-15px] ${address}`}>
        <div className="tablet:w-[50%] tablet:float-left relative px-[15px] sm:w-[100%]">
          <div className=" animate-title flex relative rotate-0 origin-bottom-left">
            <svg
              width="17"
              height="82"
              viewBox="0 0 17 82"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66699 7.04883L10.5573 81.2806"
                stroke="black"
                strokeWidth="3"
              ></path>
              <circle
                cx="6.6674"
                cy="7.04928"
                r="5.69447"
                transform="rotate(-3 6.6674 7.04928)"
                fill="#96D962"
                stroke="black"
              ></circle>
            </svg>
            <div className="introduce_title h-14 rotate-[-3deg]">
              <strong>{title}</strong>
            </div>
          </div>
          <div className="mt-[1rem]">
            <p className="text-[18px] font-bold text-[red]">{titleSub}</p>
            <p className="text-[14px]">{description}</p>
            <ul className="flex mt-10">
              <li className="pt-4 pr-4  border-r-2 border-[#293142]">
                <Link
                  to="/courses"
                  className="tab_inner p-[1rem]  bg-[#96D962] cursor-default"
                >
                  jlpt
                </Link>
              </li>
              <li className="pl-4 pt-4 p-[1rem] border-r-2 border-[#293142]">
                <Link
                  to="/courses"
                  className="tab_inner hover:bg-[#96D962]  cursor-default"
                >
                  kaiwa
                </Link>
              </li>
              <li className="pt-4 pl-4 p-[1rem]  border-r-0 border-[#293142]">
                <Link
                  to="/courses"
                  className="tab_inner hover:bg-[#96D962] cursor-default"
                >
                  eju
                </Link>
              </li>
            </ul>
            <div className="block">
              <div className="flex mt-[3rem]  items-center flex-wrap">
                <div className="text-[14px] mr-[1.4rem] font-sans">
                  <Link
                    to="/courses/n1"
                    className="mt-[3rem]  py-1 px-2   sm:px-[3px]  border border-[#41A336] text-[#41A336] tab_link "
                  >
                    N1
                  </Link>
                  <Link
                    to="/courses/n2"
                    className="mt-[3rem] border  py-1 px-2   sm:px-[3px] border-[#41A336] text-[#41A336] tab_link "
                  >
                    N2
                  </Link>
                  <Link
                    to="/courses/n3"
                    className="mt-[3rem] border py-1 px-2   sm:px-[3px] border-[#41A336] text-[#41A336] tab_link "
                  >
                    N3
                  </Link>
                  <Link
                    to="/courses/n4"
                    className="mt-[3rem] border  py-1 px-2   sm:px-[3px]  border-[#41A336] text-[#41A336] tab_link "
                  >
                    N4
                  </Link>
                  <Link
                    to="/courses/n5"
                    className="mt-[3rem] border py-1 px-2   sm:px-[3px]  border-[#41A336] text-[#41A336] tab_link "
                  >
                    N5
                  </Link>
                </div>
              </div>
            </div>
            <div className="">
              {isBtn && (
                <a href="/courses" className="tab_btn ">
                  Xem chi tiết
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="tablet:w-[50%] sm:hidden tablet:float-left relative px-[15px]">
          <div className="preview">
            <div className="preview_inside xl:h-[100%] ">
              <img
                src={img}
                alt=""
                className="block h-[100%] w-[100%] object-cover align-middle border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
