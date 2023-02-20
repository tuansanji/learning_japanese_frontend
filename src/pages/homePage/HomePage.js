import React, { useEffect } from "react";
import axios from "axios";

import Introduce from "../../component/content/Introduce/Introduce";
import { courseHomePage } from "../../data/courseHomePage/courseHomePage";
import CoursePage from "../coursePage/CoursePage";

function HomePage() {
  return (
    <>
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
          <div className="divider"></div>
        </div>
      ))}
    </>
  );
}

export default HomePage;
