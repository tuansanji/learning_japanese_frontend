import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../../component/Loading";
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
    <div className="">
      {isloading ? (
        <Loading />
      ) : (
        <div className=" flex flex-wrap  mt-[6rem] mx-auto ">
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
    </div>
  );
}

export default LevelPage;
