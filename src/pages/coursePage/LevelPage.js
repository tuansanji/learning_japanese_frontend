import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import InforWay from "../../component/content/inforWay/InforWay";
import Loading from "../../component/SupportTab/Loading";
import { getCourse, getLevelCourse } from "../../redux/apiRequest";
import axios from "axios";

function LevelPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [wayList, setWayList] = useState([]);
  const [buyCourse, setBuyCourse] = useState(false);
  const [lessonBefore, setLessonBefore] = useState({});
  const isLoading = useSelector(
    (state) => state.courses[params.level].isFetching
  );
  const allCourse = useSelector((state) => state.courses[params.level]);

  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  useEffect(() => {
    if (user && user.courses) {
      if (user.courses.includes(params.level)) {
        setBuyCourse(true);
      }
    }
  }, [user]);

  useEffect(() => {
    getCourse(dispatch, params.level);
    getLevelCourse(dispatch, params.level)
      .then((arr) => setWayList([...new Set(arr)]))
      .catch((err) => console.log(err));
  }, [params.level]);

  useEffect(() => {
    if (wayList && wayList.length > 0) {
      for (let i = 0; i < wayList.length; i++) {
        if (!localStorage.getItem(wayList[i])) {
          localStorage.setItem(
            wayList[i],
            JSON.stringify(
              allCourse.allCourse.find((course) => course.way === wayList[i])
            )
          );
        }
      }
    }
  }, [wayList]);
  useEffect(() => {
    if (localStorage.getItem("video") || localStorage.getItem("audio")) {
      setLessonBefore(
        JSON.parse(localStorage.getItem("video")) ||
          JSON.parse(localStorage.getItem("audio"))
      );
    } else {
      if (allCourse) {
        setLessonBefore(allCourse[0]);
      }
    }
  }, [allCourse]);
  return (
    <div className=" waypages  bg-no-repeat bg-cover">
      <div className="trial_study w-full ssm:px-[1rem] h-[600px] sm:h-[500px] ssm:h-[450px] bg-[rgb(13,16,24)] flex flex-col justify-center items-center md:px-[2rem] ">
        <h1 className="text-center max-w-[1000px] my-0 mx-auto text-[6.4rem] md:text-[4rem] ssm:text-[3rem] font-bold leading-[1.2] text-[#fff] ">
          Cách dễ nhất để học <strong>TIẾNG NHẬT</strong> cho người mới bắt đầu!
        </h1>
        <p className="text-center max-w-[780px] mt-[32px] mx-auto text-[#7f8e9e] text-[2rem] ">
          Với lộ trình được <strong>cá nhân hóa</strong> và hệ thống bài giảng
          lên tới <strong>hàng nghìn </strong>
          video/bài test, khóa học cam kết cung cấp đầy đủ kiến thức theo từng
          level khác nhau.
        </p>
        <div className="flex pt-[5rem] md:pt-[3rem]">
          <div
            className="flex items-center gap-x-7"
            aria-label="button-combination"
          >
            {!buyCourse ? (
              <>
                <Link
                  to={
                    wayList && wayList.length > 1
                      ? `/courses/${params.level}/${wayList[1]}`
                      : `/courses/${params.level}`
                  }
                >
                  <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-white bg-blue-500 rounded-2xl h-[55px] text-[1.6rem] ssm:text-[1.2rem] hover:opacity-75 active:opacity-30">
                    Học thử miễn phí{" "}
                    <span className="flex items-center pl-3 relative ">
                      <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
                    </span>
                  </button>
                </Link>
                <Link to={`/courses/buy/${params.level}`}>
                  <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-blue-500 border border-blue-500 rounded-2xl h-[55px] text-[1.6rem] hover:opacity-75 active:opacity-30 ssm:text-[1.2rem] ">
                    Mua khóa học{" "}
                    <span className="flex items-center pl-3 relative ">
                      <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <Link
                to={
                  lessonBefore &&
                  `/courses/${lessonBefore.level}/${lessonBefore.way
                    .split(" ")
                    .join("+")}`
                }
              >
                <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-white bg-blue-500 rounded-2xl h-[55px] text-[1.6rem] ssm:text-[1.2rem] hover:opacity-75 active:opacity-30">
                  Đi tới bài học gần đây nhất
                  <span className="flex items-center pl-3 relative ">
                    <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`flex flex-wrap  py-[6rem] ssm:py-[1rem] mx-auto menu_way ${
            !buyCourse ? "opacity-20" : ""
          }`}
        >
          {wayList &&
            wayList.map((way, index) => (
              <section
                key={index}
                className="w-[25%] lg:w-[28rem] md:w-[24rem] sm:w-[50%] px-[2.5rem] mt-[3rem] "
              >
                <div className="mb-8 relative">
                  <div
                    className={`shadow-2xl   w-full  overflow-hidden rounded-[13px] 
                    transition-all relative ${
                      buyCourse ? "hover:bottom-6" : "hover:bottom-0"
                    }`}
                  >
                    <Link
                      to={`${
                        !buyCourse
                          ? `/courses/${params.level}`
                          : `/courses/${params.level}/${way
                              .split(" ")
                              .join("+")}`
                      }`}
                    >
                      <img
                        src="https://thanhgiang.net/wp-content/uploads/2019/01/hoc-tieng-nhat-moi-ngay.jpg"
                        alt=""
                        className="h-full w-full align-middle"
                      />

                      <p
                        className="
                                  text-center border-b-2 border-[#333] leading-[1.4] mt-4 text-[2.5rem] sm:text-[2rem] ssm:text-[1.6rem] pb-2
                      font-bold capitalize animate-charcter"
                      >
                        {way}
                      </p>
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          {wayList.length < 1 && (
            <p className="text-[3rem] text-[#333]">
              Khóa học đang được cập nhật. Bạn có thể tham khảo các khóa học
              khác
            </p>
          )}
        </div>
      )}
      <div className="mb-[6rem] md:mb-[2rem]">
        <h1 className="animate-charcter text-[3rem] sm:text-[2.2rem] w-full text-center font-extrabold border-t-2 border-[#333] pt-[5rem] sm:pt-[2rem]">
          LỘ TRÌNH 4 CHẶNG BÀI BẢN
        </h1>
      </div>
      <InforWay />
    </div>
  );
}

export default LevelPage;
