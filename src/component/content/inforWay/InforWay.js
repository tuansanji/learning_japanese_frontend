import React from "react";
import InforWayItem from "./InforWayItem";
import img1 from "../../../assets/img/books.svg";
import img2 from "../../../assets/img/message-bubble.svg";
import img3 from "../../../assets/img/running-mori.svg";
function InforWay() {
  const n1Way = [
    {
      way: "way1",
      title: "Giai đoạn 1: Học tiếng Nhật nhập môn",
      content: ["800 từ vựng", "100 chữ Hán", "70 mẫu ngữ pháp"],
      curriculum: [
        "Tiếng Nhật có 2 bảng chữ cái cơ bản là Hiragana và Katakana.i",
        "3 video + test + giáo trình",
      ],
      highlight: [
        "Giao tiếp cơ bản",
        "Xem được phim hoạt hình đơn giản",
        "Có thể làm việc tại một số nhà máy của Nhật không yêu cầu tiếng quá cao.",
      ],
      colorBg: "bg-[#E8FFD4]",
      colorTitle: "text-[#50AB44]",
    },
    {
      way: "way2",
      title: "Giai đoạn 2: Chinh phục trình độ tiếng Nhật sơ cấp (N5, N4)",
      content: [
        "Chữ Hán",
        "Từ Vựng",
        "Ngữ pháp",
        "Kỹ năng đọc + dịch câu ngắn",
      ],
      curriculum: [
        "Tự tin giao tiếp tại những nơi công cộng",
        "Có thể làm việc tại nhà hàng, công xưởng, viện dưỡng lão, đăng ký học tại một số trường Nhật ngữ.",
        "Xem được phim có thoại ko quá khó",
      ],
      highlight: [
        "Có thể làm phiên dịch cơ bản",
        "Xem phim, nghe tin tức nắm được ý chính",
        "Có thể làm việc với tư cách kỹ sư tại nhà máy.",
      ],
      colorBg: "bg-[#FFF7DA]",
      colorTitle: "text-[#FB7645]",
    },
    {
      way: "way3",
      title: "Giai đoạn 3: Tăng tốc tới trình độ tiếng Nhật trung cấp (N3)",
      content: [
        "Chuyên sâu Đọc Hiểu",
        "Chuyên sâu Nghe Hiểu",
        "Củng cố kiến thức Chữ hán -Từ vựng - Ngữ pháp",
      ],
      curriculum: [
        "Trang bị phần lý thuyết kỹ càng trước khi luyện đề",
        "Luyện kỹ năng làm từng dạng đề chữ hán, từ vựng, ngữ pháp, đọc, nghe",
      ],
      highlight: [
        "Có thể làm phiên dịch cơ bản",
        "Xem phim, nghe tin tức nắm được ý chính",
        "Có thể giao tiếp thoải mái và tự tin với người bản xứ",
      ],
      colorBg: "bg-[#C7E1FF]",
      colorTitle: "text-[#0E65E5]",
    },
    {
      way: "way4",
      title: "Giai đoạn 4: Sẵn sàng tiến tới đỉnh cao tiếng Nhật (N2, N1)",
      content: ["Kỹ năng làm đề tổng hợp", "Luyện đề thi JLPT quá khứ"],
      curriculum: ["Bộ đề thi thật các năm bản đẹp"],
      highlight: [
        "Sử dụng tiếng Nhật tự nhiên như người bản xứ",
        "Không gặp trở ngại nào trong giao tiếp",
        "Có thể tự tin chọn công việc mình yêu thích với mức lương không thua kém người Nhật",
      ],
      colorBg: "bg-[#E5D9FF]",
      colorTitle: "text-[#9683E1]",
    },
  ];

  return (
    <div className="list_way bg-center bg-cover bg-[#ffff] rounded-[3rem] w-[90%] mx-auto flex items-center justify-center flex-col py-[6rem] md:py-[2rem] relative">
      <img
        src={img1}
        className=" absolute right-0 bottom-[-6rem] ssm:bottom-[-3rem] w-[20rem] md:w-[10rem]"
        alt=""
      />
      <img
        src={img2}
        className=" absolute right-0 top-[-7rem] ssm:top-[-3rem]  w-[15rem]  md:w-[10rem] ssm:w-[5rem]"
        alt=""
      />
      <img
        src={img3}
        className=" absolute top-[50%] left-[-7rem]   md:w-[10rem] ssm:left-[0] z-50 ssm:w-[5rem]"
        alt=""
      />
      {n1Way &&
        n1Way.map((way, index) => {
          return (
            <InforWayItem
              key={index}
              title={way.title}
              content={way.content}
              curriculum={way.curriculum}
              highlight={way.highlight}
              colorBg={way.colorBg}
              colorTitle={way.colorTitle}
            />
          );
        })}
    </div>
  );
}

export default InforWay;
