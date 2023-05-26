import React from "react";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CourseItemPage({ img, title, level }) {
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  return (
    <div className=" w-[960px] h-[145px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]">
      <div className="flex gap-[5rem] h-[100%] px-[5rem] sm:px-[3rem] sm:pr-0 sm:gap-[2rem] bg-[#ded7e1] overflow-hidden">
        <div className="max-w-[30rem] justify-center items-center flex">
          <img src={img} alt="" />
        </div>
        <div className=" flex flex-col justify-center items-start flex-1  text-[1.7rem] xl:text-[1.3rem] sm:hidden ">
          {title.map((item, index) => (
            <p className=" text-[#333] " key={index}>
              {" "}
              {item}
            </p>
          ))}
        </div>
        <div className="flex flex-2 justify-center items-center flex-col gap-3 sm:w-[80%] ">
          {/* mở thẻ p thì nhở để pt2 cho thẻ link */}
          <Link className="" to={`/courses/${level}`}>
            <Button
              variant="contained"
              className="h-[4rem] text-[2rem] hover:h-[4.5rem] md:w-[100px]"
              color="secondary"
            >
              Xem chi tiết khóa học
            </Button>
          </Link>
          {/* <p
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
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default CourseItemPage;
