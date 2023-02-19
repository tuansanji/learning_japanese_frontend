import React from "react";
import ListLesson from "./ListLesson";

import "./main.scss";

function ViewlearnPage() {
  return (
    <div className="course-page flex">
      <div className="course-page__video flex flex-col items-center justify-center">
        <video className="w-[80%] " controls>
          <source
            src="https://l7311524.lsv.jp/MyCode/videoplayback.mp4?fbclid=IwAR12dY4tGiUJErLKxX7P9az5xwuuCBacYixVgcIV3FlguoG_n9ersqUxvJc"
            type="video/mp4"
          />
        </video>
        <div className="mt-10">
          <p className="text-[3rem] text-[red]">TIÊU ĐỀ BÀI HỌC</p>
        </div>
      </div>
      <div className="mt-[50px]">
        <p className="text-[2rem] mb-[3rem] text-[#3d45d8]">
          Nội Dung Khóa Học
        </p>

        <ListLesson></ListLesson>
      </div>
    </div>
  );
}

export default ViewlearnPage;
