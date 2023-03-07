import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import InforWay from "../../component/content/inforWay/InforWay";
import Loading from "../../component/SupportTab/Loading";
import { getCourse, getLevelCourse } from "../../redux/apiRequest";

function LevelPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [wayList, setWayList] = useState([]);
  const isloading = useSelector(
    (state) => state.courses[params.level].isFetching
  );

  useEffect(() => {
    getCourse(dispatch, params.level);
    getLevelCourse(dispatch, params.level)
      .then((arr) => setWayList([...new Set(arr)]))
      .catch((err) => console.log(err));
  }, [params.level]);

  return (
    <div className=" waypages  bg-no-repeat bg-cover">
      <div className="minhtuan w-full h-[600px] bg-[rgb(13,16,24)] flex flex-col justify-center items-center">
        <h1>
          Cách dễ nhất để học <strong>TIẾNG NHẬT</strong> cho người mới bắt đầu!
        </h1>
        <p>
          Với lộ trình được <strong>cá nhân hóa</strong> và hệ thống bài giảng
          lên tới <strong>hàng nghìn </strong>
          video/bài test, khóa học cam kết cung cấp đầy đủ kiến thức theo từng
          level khác nhau.
        </p>
        <div className="flex pt-[5rem]">
          <div
            className="flex items-center gap-x-7"
            aria-label="button-combination"
          >
            <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-white bg-blue-500 rounded-2xl h-[55px] text-[1.6rem] hover:opacity-75 active:opacity-30">
              Học thử miễn phí{" "}
              <span className="flex items-center pl-3 relative ">
                <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
              </span>
            </button>
            <button className="way_button inline-flex items-center justify-center px-8 py-4 font-sans font-bold tracking-wide text-blue-500 border border-blue-500 rounded-2xl h-[55px] text-[1.6rem] hover:opacity-75 active:opacity-30  ">
              Mua khóa học{" "}
              <span className="flex items-center pl-3 relative ">
                <ArrowForwardIosIcon style={{ fontSize: "2rem" }} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {isloading ? (
        <Loading />
      ) : (
        <div className=" flex flex-wrap  py-[6rem] mx-auto hongay ">
          {wayList &&
            wayList.map((way, index) => (
              <section
                key={index}
                className="w-[25%] lg:w-[28rem] md:w-[24rem] sm:w-[50%] px-[2.5rem] mt-[3rem] "
              >
                <div className="mb-8 relative">
                  <div
                    className="shadow-2xl   w-full  overflow-hidden rounded-[13px] hover:bottom-6
       transition-all relative"
                  >
                    <Link
                      to={`/courses/${params.level}/${way
                        .split(" ")
                        .join("+")}`}
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
            <p className="text-[4rem] text-[blue]">
              Khóa học đang được cập nhật. Bạn có thể tham khảo các khóa học
              khác
            </p>
          )}
        </div>
      )}
      <div className="mb-[6rem]">
        <h1 className="animate-charcter text-[3rem] w-full text-center font-extrabold border-t-2 border-[#333] pt-[5rem]">
          LỘ TRÌNH 4 CHẶNG BÀI BẢN
        </h1>
      </div>
      <InforWay />
    </div>
  );
}

export default LevelPage;
