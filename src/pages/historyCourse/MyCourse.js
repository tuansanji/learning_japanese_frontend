import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyCourse({ setOpenMyCourse }) {
  const [listLength, setListLength] = useState([]);
  const myCourseEl = useRef();
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });

  const testPercent = [124, 49, 59, 97, 62];
  const testLength = [200, 200, 200, 200, 200];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        myCourseEl.current &&
        !myCourseEl.current.contains(event.target) &&
        !event.target.classList.contains("btn-myCourse")
      ) {
        setOpenMyCourse(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myCourseEl]);

  //lấy số lượng khóa học
  useEffect(() => {
    if (user) {
      for (let i = 0; i < Object.keys(user.historyLearn).length; i++) {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/courses/length`, {
            level: Object.keys(user.historyLearn)[i].trim(),
          })
          .then((res) => {
            setListLength([...listLength, res.data]);
          });
      }
    }
  }, [user]);

  // lấy ảnh khóa học
  const handleImgCourse = (course) => {
    switch (course) {
      case "n1":
        return "https://w.ladicdn.com/s450x400/60de77f2a8872c0012f2639a/n1-20211014074403.png";
      case "n2":
        return "https://w.ladicdn.com/s450x400/60de77f2a8872c0012f2639a/n2-20211014074403.png";
      case "n3":
        return "https://w.ladicdn.com/s450x400/60de77f2a8872c0012f2639a/n3-20211014074403.png";
      case "n4":
        return "https://w.ladicdn.com/s450x400/60de77f2a8872c0012f2639a/n4-20211014074403.png";
      case "n5":
        return "https://w.ladicdn.com/s450x400/60de77f2a8872c0012f2639a/n5-20211014074403.png";
      default:
        return "https://media.istockphoto.com/id/876560704/vi/anh/fuji-nh%E1%BA%ADt-b%E1%BA%A3n-v%C3%A0o-m%C3%B9a-xu%C3%A2n.jpg?s=612x612&w=0&k=20&c=vUJZDgyLRA2RjqtEg055csPgdaqMNzrrs7clKcenpKY=";
    }
  };

  return (
    <div
      ref={myCourseEl}
      className=" my-course fixed md:z-[1000] z-[7777] w-[37rem] h-[57rem] xl:right-[1rem] bg-[#FFFFFF] top-[6rem] shadow-desc overflow-y-auto md:relative md:w-[90%] md:mx-auto md:h-full md:right-0 md:mb-[4rem]"
    >
      <div className="tablet:hidden w-full ml-5 mt-3">
        <h1 className=" relative  text-[2rem] animate-charcter">
          Khóa học đã tham gia
        </h1>
      </div>
      <div className="">
        {user && user?.courses.length > 0 ? (
          user?.courses.map((item, index) => (
            <Link
              onClick={() => {
                setOpenMyCourse(false);
              }}
              to={`/courses/${item.trim()}`}
              key={index}
              className="flex mx-3 my-[2rem] border hover:bg-[#edebeb] cursor-pointer p-[2rem]"
            >
              <div className="">
                <img
                  className="w-[80%]"
                  src={handleImgCourse(item.trim())}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-around">
                <strong>{item}</strong>
                <p>học cách đây 10 ngày</p>
                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600"
                    style={{
                      width: ` ${
                        // user && user.historyLearn[item]
                        user
                          ? `${(testPercent[index] / testLength[index]) * 100}%`
                          : // `${
                            //     (user.historyLearn[item].length /
                            //       listLength[index]) *
                            //     100
                            //   }%`

                            "0%"
                      } `,
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center mt-[6rem] text-[1.7  rem] font-bold">
            <p>Bạn chưa tham gia khóa học nào</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourse;
