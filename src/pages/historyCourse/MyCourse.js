import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function MyCourse({ setOpenMyCourse }) {
  const myCourseEl = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        myCourseEl.current &&
        !myCourseEl.current.contains(event.target) &&
        !event.target.classList.contains("btn-myCourse")
      ) {
        setOpenMyCourse(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myCourseEl]);

  return (
    <div
      ref={myCourseEl}
      className=" my-course fixed z-[7777] w-[37rem] h-[57rem] xl:right-[1rem] bg-[#FFFFFF] top-[6rem] shadow-desc overflow-y-auto md:relative md:w-[90%] md:mx-auto md:h-full md:right-0 md:mb-[4rem]"
    >
      <div className="tablet:hidden w-full ml-5 mt-3">
        <h1 className=" relative  text-[2rem] animate-charcter">
          Khóa học đã tham gia
        </h1>
      </div>
      <div className="">
        {Array(7)
          .fill(null)
          .map((item, index) => (
            <Link
              onClick={() => {
                setOpenMyCourse(false);
              }}
              to={`/courses/n1`}
              key={index}
              className="flex mx-3 my-[2rem] border hover:bg-[#edebeb] cursor-pointer p-[2rem]"
            >
              <div className="">
                <img
                  className="w-[80%]"
                  src="https://w.ladicdn.com/s450x400/60de77f2a8872c0012f2639a/n1-20211014074403.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-around">
                <strong>N1</strong>
                <p>học cách đây 10 ngày</p>
                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default MyCourse;
