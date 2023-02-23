import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWayCourse } from "../../redux/apiRequest";

import Loading from "../../component/Loading";

function WayPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [stageList, setStageList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getWayCourse(dispatch, params.level, params.way)
      .then((stage) => {
        setStageList([...new Set(stage)]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.way]);

  return (
    <div
      className="
  "
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-[80%] gap-5 mx-auto mt-[10rem] flex-wrap ssm:flex-col">
          {stageList &&
            stageList.map((stage, index) => (
              <section
                key={index}
                className="laptop:w-[25%] lg:w-[33%] md:w-[33%] sm:w-[80%] ssm:w-[90%]  sm:mx-auto px-3 "
              >
                <div className="mb-8 relative">
                  <div
                    className=" w-full  overflow-hidden rounded-[13px] hover:bottom-6 
        transition-all relative"
                  >
                    <Link
                      to={`/courses/${params.level}/${params.way}/${stage
                        .split(" ")
                        .join("+")}`}
                    >
                      <img
                        src="https://jes.edu.vn/wp-content/uploads/2017/12/hoc-tieng-nhat-kho-khong.jpg"
                        alt=""
                        className="h-full"
                      />
                    </Link>
                  </div>
                  <div className="line">
                    <h2 className="lineUp">{stage}</h2>
                  </div>
                </div>
              </section>
            ))}
        </div>
      )}
    </div>
  );
}

export default WayPage;
