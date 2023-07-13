import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Search from "antd/es/input/Search";
import axios from "axios";

import InforWay from "../../component/content/inforWay/InforWay";
import Loading from "../../component/SupportTab/Loading";
import { getCourse, getLevelCourse } from "../../redux/apiRequest";
import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";

function LevelPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [wayList, setWayList] = useState([]);
  const [buyCourse, setBuyCourse] = useState(false);
  const [lessonBefore, setLessonBefore] = useState(null);
  const [isUserTest, setIsUserTest] = useState(true);
  const [editTip, setEditTip] = useState(false);
  const [countTip, setCountTip] = useState(1);
  const [tipMsg, setTipMsg] = useState("");
  const isLoading = useSelector(
    (state) => state.courses?.[params.level]?.isFetching
  );
  const allCourse = useSelector((state) => state.courses?.[params.level]);

  const user = useSelector((state) => {
    return state.auth?.login?.currentUser;
  });

  //lấy thông báo từ admin
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tip/tipAdmin`)
      .then((res) => setTipMsg(res.data.message));
  }, [user, countTip]);

  // cho người dùng test 2 ngày
  useEffect(() => {
    if (!localStorage.getItem("userTest")) {
      let currentTime = Date.now();
      let twoDaysInMilliseconds = 4 * 24 * 60 * 60 * 1000;
      localStorage.setItem(
        "userTest",
        JSON.stringify({
          status: true,
          time: currentTime + twoDaysInMilliseconds,
        })
      );
      setIsUserTest(true);
    } else {
      if (JSON.parse(localStorage.getItem("userTest")).status) {
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
      } else {
        setIsUserTest(false);
      }
    }
  }, []);

  // phần xác định ng dùng đã mua khóa học đó hay chưa
  useEffect(() => {
    if (user && user.courses) {
      if (Object.keys(user.courses).includes(params?.level)) {
        setBuyCourse(true);
      } else {
        setBuyCourse(false);
      }
    }
  }, [user, params.level]);

  //lấy danh sách chặng
  useEffect(() => {
    getCourse(dispatch, params.level);
    getLevelCourse(dispatch, params.level)
      .then((arr) => setWayList([...new Set(arr)]))
      .catch((err) => console.log(err));
  }, [params.level]);

  //lấy danh sách chặng và set bài học đầu tiên của mỗi chặng vào local storage
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
        if (localStorage.getItem(wayList[i])) {
          if (
            JSON.parse(localStorage.getItem(wayList[i])).level !== params.level
          ) {
            localStorage.setItem(
              wayList[i],
              JSON.stringify(
                allCourse.allCourse.find((course) => course.way === wayList[i])
              )
            );
          }
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
  //chỉnh sửa tip msg
  const handleSubmit = (value) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/tip/tipAdmin`,
        {
          message: value,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(toastSuccess(res.data));
        setCountTip((prev) => prev + 1);
        setEditTip(false);
      })
      .catch((err) => {
        dispatch(toastErr(err.response.data));
      });
  };
  return (
    <div className="bg-no-repeat bg-cover waypages">
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
                      ? `/courses/${params.level}/${wayList[1]
                          .split(" ")
                          .join("+")}`
                      : `/courses/${params.level}`
                  }
                >
                  <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-white bg-blue-500 rounded-2xl h-[55px] text-[1.6rem] ssm:text-[1.2rem] hover:opacity-75 active:opacity-30">
                    Học thử miễn phí{" "}
                    <span className="relative flex items-center pl-3 ">
                      <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
                    </span>
                  </button>
                </Link>
                <Link to={`/courses/buy/${params.level}`}>
                  <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-blue-500 border border-blue-500 rounded-2xl h-[55px] text-[1.6rem] hover:opacity-75 active:opacity-30 ssm:text-[1.2rem] ">
                    Mua khóa học (29k / Tháng)
                    <span className="relative flex items-center pl-3 ">
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
                <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-white bg-blue-500 rounded-2xl h-[55px] text-[1.6rem] ssm:text-[1.2rem] hover:opacity-75 active:opacity-30 ">
                  Đi tới bài học gần đây nhất
                  <span className="relative flex items-center pl-3 ">
                    <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
                  </span>
                </button>
              </Link>
            )}
            {/* <Link
              to={
                lessonBefore &&
                `/courses/${lessonBefore?.level}/${lessonBefore?.way
                  .split(" ")
                  .join("+")}`
              }
            >
              <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-white bg-blue-500 rounded-2xl h-[55px] text-[1.6rem] ssm:text-[1.2rem] hover:opacity-75 active:opacity-30">
                Đi tới bài học gần đây nhất
                <span className="relative flex items-center pl-3 ">
                  <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
                </span>
              </button>
            </Link> */}
          </div>
        </div>
      </div>{" "}
      <div className="min-h-[4rem]  md:p-5 font-bold bg-[#d6cdfb] flex justify-center items-center md:text-[1.5rem] text-[1.8rem]">
        {user && user.isAdmin && editTip ? (
          <>
            <Search
              defaultValue={tipMsg}
              width={400}
              placeholder="Chỉnh sử thông báo chung.."
              allowClear
              enterButton={
                <button
                  className={`p-[12px] ml-[2px] rounded-sm bg-blue-500 text-white 
                
                  `}
                >
                  Chỉnh sửa
                </button>
              }
              size="large"
              onSearch={handleSubmit}
              onBlur={() => {
                setEditTip(false);
              }}
            />
          </>
        ) : (
          <p className="flex items-center gap-5 px-4 py-2">
            {tipMsg || "Có vấn đề gì mọi người chat trực tiếp vào fanpage nha!"}
            {user && user.isAdmin && (
              <button
                className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[30px]"
                onClick={() => setEditTip(true)}
              >
                Edit
              </button>
            )}
          </p>
        )}
      </div>
      <div className="min-h-[4rem]  md:p-5 font-bold bg-[#cdfbe1] flex justify-center items-center md:text-[1.5rem] text-[1.8rem] text-red-600">
        <p className=" gap-5 px-4 py-2">
          Ủng hộ cho bọn em một ít kinh phí duy trì web
          <Link
            to="/donate"
            className="text-blue-500 font-bold pl-1 hover:text-green-500"
          >
            Tại đây
          </Link>
          . Dù là
          <span className="text-blue-500 font-bold"> 1k </span>
          <span className="text-blue-500 font-bold">2k</span> cũng cám ơn mọi
          người 😊. Sự ủng hộ của các bạn là động lực để nhóm em tiếp tục phát
          triển trang web ạ ❤️
        </p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        // <div
        //   className={`flex flex-wrap  py-[6rem] ssm:py-[1rem] mx-auto menu_way ${
        //     !isUserTest && !buyCourse ? "opacity-20" : ""
        //   }`}
        // >
        <div
          className={`flex flex-wrap  py-[6rem] ssm:py-[1rem] mx-auto menu_way `}
        >
          {wayList &&
            wayList.map((way, index) => (
              <section
                key={index}
                className="w-[25%] lg:w-[28rem] md:w-[24rem] sm:w-[50%] px-[2.5rem] ssm:px-[1.5rem] mt-[3rem] "
              >
                <div className="relative mb-8">
                  {/* <div
                    className={`shadow-2xl   w-full  overflow-hidden rounded-[13px] 
                    transition-all relative ${
                      isUserTest || buyCourse
                        ? "hover:bottom-6"
                        : "hover:bottom-0"
                    }`}
                  > */}
                  {/* <Link
                      to={`${
                        !buyCourse && !isUserTest
                          ? `/courses/${params.level}`
                          : `/courses/${params.level}/${way
                              .split(" ")
                              .join("+")}`
                      }`}
                    > */}
                  <div
                    className={`shadow-2xl   w-full  overflow-hidden rounded-[13px] 
                    transition-all relative hover:bottom-6
                       
                    `}
                  >
                    <Link
                      to={`/courses/${params.level}/${way
                        .split(" ")
                        .join("+")}`}
                    >
                      <div className="relative">
                        <img
                          src="https://jlpt.site/files/img/hoc-tieng-nhat-moi-ngay.jpg"
                          alt=""
                          className="w-full h-full align-middle"
                        />
                        <Button
                          type="default"
                          className="mx-auto bg-red-500 text-white font-semibold text-[1.6rem] leading-6 absolute right-2 top-2"
                        >
                          Học ngay
                        </Button>
                      </div>

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
          BẠN PHẢI BIẾT MÌNH CẦN PHẢI HỌC ĐẾN TRÌNH ĐỘ NÀO VÀ PHẢI HỌC BAO LÂU.
        </h1>
      </div>
      <InforWay />
      {/* <div
        class="fb-comments"
        data-href="https://www.facebook.com/profile.php?id=100090524688743"
        data-width="500"
        data-numposts="10"
      ></div> */}
    </div>
  );
}

export default LevelPage;
