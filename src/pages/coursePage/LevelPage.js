import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCourse,
  getLevelCourse,
  getWayCourse,
} from "../../redux/apiRequest";
import axios from "axios";

function LevelPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [wayList, setWayList] = useState([]);
  // const wayList = useSelector((state) => state.courses?.[params.level]);
  useEffect(() => {
    const handleGetLevel = async () => {
      const way = await axios.get(
        `${process.env.BACKEND_URL}/courses/${params.level}`
      );
      let arr = [];
      await way.data.forEach((level) => {
        level && arr.push(level.way);
      });
      setWayList([...new Set(arr)]);
    };
    handleGetLevel();
  }, []);

  return (
    <div className="">
      <div className=" flex w-[80%] mx-auto gap-6 mt-[10rem] ">
        {wayList &&
          wayList.map((way, index) => (
            <section key={index} className="w-[25%] px-3 ">
              <div className="mb-8 relative">
                <div
                  className=" w-full  overflow-hidden rounded-[13px] hover:bottom-6
             transition-all relative"
                >
                  <Link
                    to={`/courses/${params.level}/${way.split(" ").join("+")}`}
                  >
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                      alt=""
                      className="h-full"
                    />
                  </Link>
                </div>
                <p className="mt-[1rem] text-[#19060a] text-[2.2rem] leading-[1.4] font-bold capitalize">
                  {way}
                </p>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}

export default LevelPage;
