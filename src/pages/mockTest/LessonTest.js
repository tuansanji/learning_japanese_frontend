import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function LessonTest() {
  const params = useParams();
  const listLesson = useSelector((state) => state.mockTest?.list);
  const [listName, setListName] = useState([]);

  // lấy danh sách bài thi  và chuyển đổi dữ liệu nó cho phù hợp với ui hiện ra
  useEffect(() => {
    if (listLesson) {
      let arr = [];
      listLesson.forEach((item) => {
        if (item.level === params.level && item.lesson === params.lesson) {
          arr.push(item);
        }
      });
      const items = arr.map((name, index) => ({
        key: index,
        title: (
          <span className="font-semibold text-black  capitalize">{`${name.name}`}</span>
        ),
        description: (
          <div className="flex gap-[8rem] md:gap-8 ssm:gap-1 items-center">
            <span className="text-[#9ba3ab] text-[1.5rem] md:flex-1 font-medium">
              Câu hỏi: {name.question || 30}
            </span>
            <time className="text-[#9ba3ab] text-[1.5rem] md:flex-1 font-medium">
              <span className="ssm:hidden">Thời gian:</span> {name.time || 25}{" "}
              phút
            </time>
            <Link
              to={`/courses/mockTest/${params.level}/${params.lesson}/${name._id}`}
            >
              <button className="ml-10 sm:ml-0 rounded-lg font-medium shadow-md bg-blue-100 text-blue-500 px-6 py-3 hover:bg-blue-600 hover:text-[white]">
                Làm ngay
              </button>
            </Link>
          </div>
        ),
      }));
      setListName(items);
    }
  }, [listLesson]);

  return (
    <div className="bg-[#ffffff] pb-[10rem]">
      <div className="h-[15rem] md:h-[12rem] w-full bg-[#002147] flex flex-col justify-around items-center">
        <h1 className=" text-[3rem] md:text-[2rem] text-[#33FF00] font-bold">
          2023年 日本語能力試験 {params.lesson}
        </h1>
        <div className="flex gap-5">
          <span className="px-10 rounded-3xl py-4 border border-[#fff] font-semibold text-white">
            Cấp độ {`N${params.level[1]}`}
          </span>
          <span className="px-10 rounded-3xl py-4 border border-[#fff] font-semibold text-white">
            Số lượng bài : {listName.length}
          </span>
        </div>
      </div>
      <div className="bg-[#ffffff] h-[50rem] rounded-sm p-6 shadow w-[60%] md:w-full mx-auto mt-5">
        <div className="">
          <Steps direction="vertical" items={listName} />
        </div>
      </div>
    </div>
  );
}

export default LessonTest;
