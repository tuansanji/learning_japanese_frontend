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
        <div className=" flex w-[80%] mx-auto gap-6 mt-[10rem] ">
          {wayList &&
            wayList.map((way, index) => (
              <section
                key={index}
                className="laptop:w-[25%] md:w-[33%] sm:w-[80%] sm:mx-auto px-3 "
              >
                <div className="mb-8 relative">
                  <div
                    className=" w-full  overflow-hidden rounded-[13px] hover:bottom-6
       transition-all relative"
                  >
                    <Link
                      to={`/courses/${params.level}/${way
                        .split(" ")
                        .join("+")}`}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Japan_mourning_flag.svg/220px-Japan_mourning_flag.svg.png"
                        alt=""
                        className="h-full w-full align-middle"
                      />
                      <p className="absolute bottom-[3rem] right-[3rem] lg:right-[2rem] mt-[1rem] text-[4.2rem] xl:text-[3.5rem] md:text-[2.5rem] leading-[1.4] font-bold capitalize animate-charcter">
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
