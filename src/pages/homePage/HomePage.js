import React, { useEffect } from "react";

import Introduce from "../../component/content/Introduce/Introduce";
import { courseHomePage } from "../../data/courseHomePage/courseHomePage";
import CoursePage from "../coursePage/CoursePage";
import Time from "./Time";

function HomePage() {
  useEffect(() => {
    if (!localStorage.getItem("userTest")) {
      let currentTime = Date.now();
      let twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
      localStorage.setItem(
        "userTest",
        JSON.stringify({
          status: true,
          time: currentTime + twoDaysInMilliseconds,
        })
      );
    } else {
      let currentTime = Date.now();
      if (currentTime >= JSON.parse(localStorage.getItem("userTest")).time) {
        localStorage.setItem(
          "userTest",
          JSON.stringify({
            status: false,
            time: Date.now(),
          })
        );
      }
    }
  }, []);

  return (
    <>
      <div className="absolute  md:relative left-[2rem]">
        <Time />
      </div>
      <CoursePage />
      {courseHomePage.map((course, index) => (
        <div key={index}>
          <Introduce
            address={course.address}
            title={course.title}
            titleSub={course.titleSub}
            description={course.description}
            isBtn={course.isBtn}
            img={course.img}
          />
          <div className="divider w-[70%] mx-auto my-[10rem] md:my-[3rem] "></div>
        </div>
      ))}
    </>
  );
}

export default HomePage;
