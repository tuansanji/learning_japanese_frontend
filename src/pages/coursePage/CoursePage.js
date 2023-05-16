import React, { memo } from "react";
import CourseItemPage from "./CourseItemPage";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
function CoursePage() {
  return (
    <div className="">
      <CourseItemPage
        level="n1"
        img="https://jlpt.site/files/img/n1-20211014074403.png"
        lesson="192"
        state="137"
        hour="1300"
        hourLearn="40"
        title={[
          "– Sử dụng tiếng Nhật tự nhiên như người bản xứ",
          "– Không gặp trở ngại nào trong giao tiếp ",
          "– Có thể tự tin chọn công việc mình yêu thích với mức lương không thua kém người Nhật",
        ]}
      />
      <CourseItemPage
        level="n2"
        img="https://jlpt.site/files/img/n2-20211014074403.png"
        lesson="161"
        state="141"
        hour="1455"
        hourLearn="80"
        title={[
          "– Có thể xem phim không cần phụ đề",
          "– Có thể làm biên dịch, phiên dịch",
          "– Có thể giao tiếp thoải mái và tự tin với người bản xứ",
        ]}
      />{" "}
      <CourseItemPage
        level="n3"
        img="https://jlpt.site/files/img/n3-20211014074403.png"
        lesson="137"
        state="128"
        hour="1253"
        hourLearn="90"
        title={[
          "– Có thể làm phiên dịch cơ bản",
          "– Xem phim, nghe tin tức nắm được ý chính",
          "– Có thể làm việc với tư cách kỹ sư tại nhà máy",
        ]}
      />{" "}
      <CourseItemPage
        level="n4"
        img="https://jlpt.site/files/img/n4-20211014074403.png"
        lesson="25"
        state="145"
        hour="36"
        hourLearn="45"
        title={[
          "– Tự tin giao tiếp tại những nơi công cộng",
          "– Có thể làm việc tại nhà hàng, công xưởng, viện dưỡng lão, đăng ký học tại một số trường Nhật ngữ.",
          "– Xem được phim có thoại ko quá khó",
        ]}
      />{" "}
      <CourseItemPage
        level="n5"
        img="https://jlpt.site/files/img/n5-20211014074403.png"
        lesson="25"
        state="159"
        hour="45"
        hourLearn="15"
        title={[
          "– Giao tiếp cơ bản",
          "– Xem được phim hoạt hình đơn giản",
          "– Có thể làm việc tại một số nhà máy của Nhật không yêu cầu tiếng quá cao",
        ]}
      />
      <div className=" w-[960px] h-[200px] md:h-[300px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]  ">
        <div className="flex gap-[1rem] h-[100%]  p-5 sm:p-0   overflow-hidden">
          <div className="flex flex-1  justify-center items-center flex-col gap-3  movies__course">
            <div className="flex flex-row md:flex-col gap-5 h-full  mx-auto w-full p-[2rem] leading-4 shadow-desc text-[1.6rem]">
              <div className="flex items-center justify-center flex-1">
                <Link className="" to={`/movies`}>
                  <Button
                    variant="contained"
                    className="h-[6rem]  hover:right-2 relative md:w-[300px]  shadow-2xl"
                    color="primary"
                    style={{ fontSize: "1.4rem", textTransform: "capitalize" }}
                  >
                    Học Tiếng Nhật Qua Phim
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* phần bài thi */}
      <div className=" w-[960px] h-[200px] md:h-[300px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]  ">
        <div className="flex gap-[1rem] h-[100%]  p-5 sm:p-0  bg-[#ded7e1] overflow-hidden">
          <div className="overflow-hidden rounded-2xl shadow-desc md:hidden ">
            <img
              src={
                "https://trungtamnhatngu.edu.vn/uploads/blog/2018_10/ky-thi-nang-luc-tieng-nhat-jlpt.png"
              }
              alt=""
              className="object-cover h-full overflow-hidden"
            />
          </div>

          <div className="flex flex-1  justify-center items-center flex-col gap-3 bg-[#fff]">
            <div className="flex flex-row md:flex-col gap-5 h-full  mx-auto w-full p-[2rem] leading-4 shadow-desc text-[1.6rem]">
              <div className="">
                <span className="text-[#333] font-medium leading-10">
                  » Đề thi JLPT các năm.
                </span>
                <br />
                <span className="text-[#333] font-medium leading-10">
                  » Đề thi chuẩn.
                </span>
                <br />
                <span className="text-[#333] font-medium leading-10">
                  » Cập nhật liên tục và chính xác đề thi các năm.
                </span>
                <br />{" "}
                <span className="text-[#333] font-medium leading-10">
                  » Mẫu đề thi chuẩn được cập nhật liên tục.
                </span>
                <br />{" "}
                <span className="text-[#333] font-medium leading-10">
                  » Kho đề thi tiếng Nhật hoàn toàn miễn phí.
                </span>
                <br />{" "}
              </div>
              <div className="flex items-center justify-center flex-1">
                <Link className="" to={`/courses/mockTest`}>
                  <Button
                    variant="contained"
                    className="h-[4rem]  hover:h-[4.5rem] md:w-[300px]  shadow-2xl"
                    color="primary"
                    style={{ fontSize: "1.4rem", textTransform: "capitalize" }}
                  >
                    Vào thi ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CoursePage);
