import React from "react";
import CourseItemPage from "./CourseItemPage";

function CoursePage() {
  return (
    <div className="">
      <CourseItemPage
        level="n1"
        img="https://jlpt.site/files/img/n1-20211014074403.png"
        lesson="192"
        state="137"
        hour="1300"
        hourLearn="40"
        title="6 tháng"
      />
      <CourseItemPage
        level="n2"
        img="https://jlpt.site/files/img/n2-20211014074403.png"
        lesson="161"
        state="141"
        hour="1455"
        hourLearn="80"
        title="6 tháng"
      />{" "}
      <CourseItemPage
        level="n3"
        img="https://jlpt.site/files/img/n3-20211014074403.png"
        lesson="137"
        state="128"
        hour="1253"
        hourLearn="90"
        title="6 tháng"
      />{" "}
      <CourseItemPage
        level="n4"
        img="https://jlpt.site/files/img/n4-20211014074403.png"
        lesson="25"
        state="145"
        hour="36"
        hourLearn="45"
        title="6 tháng"
      />{" "}
      <CourseItemPage
        level="n5"
        img="https://jlpt.site/files/img/n5-20211014074403.png"
        lesson="25"
        state="159"
        hour="45"
        hourLearn="15"
        title="Khóa ZOOM ONLINE VIP"
      />
    </div>
  );
}

export default CoursePage;
