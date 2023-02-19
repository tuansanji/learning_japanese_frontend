import React from "react";
import StateItem from "./StateItem";

function CourseStatePage() {
  return (
    <div className="">
      <div className="m-[3rem]">
        <p className="text-[4rem] py-[3rem] text-center font-bold text-[red]">
          Giai Đoạn 1
        </p>
        <div className="grid grid-cols-4 gap-10">
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
        </div>
      </div>
      <div className="m-[3rem]">
        <p className="text-[4rem] py-[3rem] text-center font-bold text-[red]">
          Giai đoạn 2
        </p>
        <div className="grid grid-cols-4 gap-10">
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
        </div>
      </div>
      <div className="m-[3rem]">
        <p className="text-[4rem] py-[3rem] text-center font-bold text-[red]">
          Giai đoạn 3
        </p>
        <div className="grid grid-cols-4 gap-10">
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
          <StateItem />
        </div>
      </div>
    </div>
  );
}

export default CourseStatePage;
