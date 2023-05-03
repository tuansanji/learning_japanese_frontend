import React, { useEffect, useState } from "react";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllLesson } from "../../redux/slice/mockTestSlice";
function MockTest() {
  const dispatch = useDispatch();
  const listLesson = useSelector((state) => state.mockTest?.list);
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/mockTest/lesson`)
      .then((res) => {
        dispatch(getAllLesson(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (listLesson) {
      let arrGroup = [];
      let arrLevel = [];
      listLesson.forEach((lesson) => {
        arrGroup.push({ level: lesson.level, lesson: lesson.lesson });
        arrLevel.push(lesson.level);
      });
      const result = Object.values(
        arrGroup.reduce((acc, cur) => {
          if (!acc[cur.level]) {
            acc[cur.level] = { level: cur.level, lesson: [cur.lesson] };
          } else if (!acc[cur.level].lesson.includes(cur.lesson)) {
            acc[cur.level].lesson.push(cur.lesson);
          }
          return acc;
        }, {})
      ).map(({ level, lesson }) => ({ level, lesson }));

      setLesson(result);
    }
  }, [listLesson]);

  return (
    <div className="w-full h-full bg-[#F5F5F5]">
      <div className="flex flex-col gap-[8rem] md:gap-5 w-[80%] md:w-full mx-auto p-6 min-h-[80vh]">
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-[3rem] font-semibold ssm:text-[2rem]">
            Đề thi JLPT các năm
          </h2>
          <p className="text-center text-[3rem] md:text-[2rem] animate-charcter">
            Cập nhật liên tục và chính xác các đề thi Tiếng nhật
          </p>
        </div>
        {lesson &&
          lesson.map((item) => (
            <div
              className={`w-full grid grid-cols-3 md:grid-cols-2  ssm:grid-cols-[unset]  ssm:grid-flow-col	ssm:auto-cols-[80%] overflow-x-auto gap-5 h-full `}
              key={uuid()}
            >
              {item.lesson.map((lesson, index) => (
                <div
                  key={uuid()}
                  className="mock_test h-[16rem] flex flex-col gap-5 p-5 "
                >
                  <div className="icon_level">{`N${item.level[1]}`}</div>
                  <h1>
                    <strong>月 日本語能力試験-{`N${item.level[1]}`}</strong>
                  </h1>
                  <span className="text-[#7a7a7a] font-semibold">
                    Giai đoạn : {lesson}
                  </span>
                  <span className="text-[#636363] font-semibold">
                    {/* Câu hỏi: {Math.floor(Math.random() * 200) + 100}++ */}
                    <span> Câu hỏi: </span>
                    {listLesson
                      .filter(
                        (q) => q.lesson === lesson && q.level === item.level
                      )
                      .reduce((acc, curr) => acc + curr.question, 0)}
                  </span>
                  <Link to={`/courses/mockTest/${item.level}/${lesson}`}>
                    {" "}
                    <button className="inline-flex w-[10rem] absolute bottom-4 right-4 items-center justify-center gap-2 font-sans font-semibold tracking-wide text-white bg-[#E66030] rounded-lg h-[40px] hover:bg-blue-600 ">
                      <TouchAppIcon style={{ color: "white" }} /> Thi ngay
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MockTest;
