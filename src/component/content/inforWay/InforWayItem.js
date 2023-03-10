import React from "react";

function InforWayItem({
  title,
  content,
  curriculum,
  highlight,
  colorBg,
  colorTitle,
}) {
  return (
    <div className="flex flex-col md:w-full justify-center items-center my-[2rem] md:my-[0.5rem] ">
      <div className=" rotate-3 m-auto relative origin-bottom-left font-sans text-[2.4rem] left-3 font-normal text-black ">
        <span className="absolute left-[-9px] z-[2]">
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
              fill="#F27712"
              stroke="black"
            ></circle>
          </svg>
        </span>
        <div
          className={`
           static h-[5.6rem] rotate-[-3deg] font-sans text-[3rem] sm:text-[2rem] ssm:text-[1.6rem] font-bold py-[1.5rem] pl-[3rem] pr-[4rem] top-[-3px] left-[8px] z-0 border-transparent border border-r-0 flex items-center before:border-b-[2.7rem] 
        before:border-t-[2.7rem] 
        before:content-[''] before:w-full     before:h-full before:absolute before:left-0 before:top-0 before:z-[-1] before:border-r-transparent before:border-r-[25px]   before:border-t-${colorBg}   before:border-b-${colorBg}
          `}
        >
          {title}
        </div>
      </div>
      <div
        className={`${colorBg}  py-[3rem] sm:py-[1rem] px-[6rem] sm:px-[3rem]  sm:text-[1.4rem] w-[1107px] xl:w-[90%] mt-[6rem] sm:mt-[2.5rem] rounded-2xl text-[1.6rem]  font-[Quicksand,Arial,sans-serif] font-normal flex md:flex-col`}
      >
        <div className=" w-[calc((100%-2%)/3)] md:w-full">
          <div
            className={`text-[2rem] md:text-[1.6rem] md:mb-[0.5rem] font-bold mb-[1rem] ${colorTitle}`}
          >
            Nội dung
          </div>
          <ul className="list-disc text-black">
            {content.map((item, index) => (
              <li
                className="list-disc left-4   list-inside text-black"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className=" w-[calc((100%-2%)/3)] md:w-full">
          <div
            className={`text-[2rem] font-bold mb-[1rem] md:text-[1.6rem] md:mb-[0.5rem] ${colorTitle}`}
          >
            Giáo trình
          </div>
          <ul className="list-disc text-black">
            {curriculum.map((item, index) => (
              <li
                className="list-disc left-4   list-inside text-black"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className=" w-[calc((100%-2%)/3)] md:w-full">
          <div
            className={`text-[2rem] font-bold mb-[1rem] md:text-[1.6rem] md:mb-[0.5rem] ${colorTitle}`}
          >
            Nội bật
          </div>
          <ul className="list-disc text-black">
            {highlight.map((item, index) => (
              <li
                className="list-disc left-4   list-inside text-black"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InforWayItem;
