import React from "react";
import InforWayItem from "./InforWayItem";
import img1 from "../../../assets/img/books.svg";
import img2 from "../../../assets/img/message-bubble.svg";
import img3 from "../../../assets/img/running-mori.svg";
function InforWay() {
  const n1Way = [
    {
      way: "way1",
      title: "Chặng 1: Chữa mất gốc căn bản",
      content: [
        "Tổng ôn Ngữ pháp N2",
        "Trang bị kỹ năng dịch câu",
        "Hướng dẫn phương pháp học hiệu quả",
      ],
      curriculum: [
        "Chữa mất gốc căn bản Dũng Mori",
        "3 video + test + giáo trình",
      ],
      highlight: [
        "Củng cố lại kiến thức căn bản của N2",
        "Trang bị kỹ năng dịch câu cơ bản",
        "Hướng dẫn chuẩn bị bài, học và ôn bài hiệu quả.",
      ],
      colorBg: "bg-[#E8FFD4]",
      colorTitle: "text-[#50AB44]",
    },
    {
      way: "way2",
      title: "Chặng 2: Kiến thức nền tảng N1",
      content: [
        "Chữ Hán",
        "Từ Vựng",
        "Ngữ pháp",
        "Kỹ năng đọc + dịch câu ngắn",
      ],
      curriculum: [
        "Bộ giáo trình Chữ hán, Từ vựng, Ngữ pháp độc quyền Dũng Mori",
      ],
      highlight: [
        "Cách học Chữ Hán “Học 1 nhớ 3” dễ nhớ",
        "Test từ vựng liên tục theo lộ trình học",
        "Luyện kỹ năng đặt câu, đọc, dịch câu ngắn theo ngữ pháp.",
      ],
      colorBg: "bg-[#FFF7DA]",
      colorTitle: "text-[#FB7645]",
    },
    {
      way: "way3",
      title: "Chặng 3: Đọc hiểu - nghe hiểu - củng cố kiến thức N1",
      content: [
        "Chuyên sâu Đọc Hiểu",
        "Chuyên sâu Nghe Hiểu",
        "Củng cố kiến thức Chữ hán -Từ vựng - Ngữ pháp",
      ],
      curriculum: [
        "Đọc hiểu + Nghe hiểu Shinkanzen",
        "Sách luyện đề Pawa Doriru + 20 ngày",
      ],
      highlight: [
        "Trang bị phần lý thuyết kỹ càng trước khi luyện đề",
        "Luyện kỹ năng làm từng dạng đề chữ hán, từ vựng, ngữ pháp, đọc, nghe",
        "Luyện đề trực tuyến trên web/app Dũng mori, xem ngay kết quả, xem lại lịch sử thi và bảng xếp hạng thành tích",
        "ủng cố lại kiến thức ở chặng 2",
      ],
      colorBg: "bg-[#C7E1FF]",
      colorTitle: "text-[#0E65E5]",
    },
    {
      way: "way4",
      title: "Chặng 4: Luyện kĩ năng làm đề - Tổng ôn tập",
      content: ["TKỹ năng làm đề tổng hợp", "Luyện đề thi JLPT quá khứ"],
      curriculum: ["Bộ đề thi thật các năm bản đẹp"],
      highlight: [
        "Luyện kỹ năng làm đề, phân bổ thời gian hợp lý cho từng phần",
        "Làm quen với đề thi thật",
        "Thi đua thành tích trên bảng xếp hạng",
        "Hướng dẫn mẹo làm bài nhanh cùng chữa đề chi tiết trên livestream trong nhóm kín",
        "Làm đề, thi thử liên tục",
        "Giải đáp thắc mắc 24/7",
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
