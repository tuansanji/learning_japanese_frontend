import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getWayCourse } from "../../redux/apiRequest";
import axios from "axios";

function WayPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [stageList, setStageList] = useState([]);
  useEffect(() => {
    const handleGetWay = async () => {
      const stage = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/courses/${params.level}/${params.way}`
      );
      let arr = [];
      await stage.data.forEach((way) => {
        way && arr.push(way.stage);
      });
      setStageList([...new Set(arr)]);
    };
    handleGetWay();
    // getWayCourse(dispatch, params.level, params.way);
  }, []);

  return (
    <div className="flex w-[80%] gap-5 mx-auto mt-[10rem]">
      {stageList &&
        stageList.map((stage, index) => (
          <section key={index} className="w-[25%] px-3 ">
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
                    src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                    alt=""
                    className="h-full"
                  />
                </Link>
              </div>
              <p className="mt-[1rem] text-[#19060a] text-[2.2rem] leading-[1.4] font-bold capitalize">
                {stage}
              </p>
            </div>
          </section>
        ))}
    </div>
  );
}

export default WayPage;
