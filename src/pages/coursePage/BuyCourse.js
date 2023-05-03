import React from "react";

function BuyCourse() {
  return (
    <div className="relative flex flex-col items-center bg-[#000836] py-[3rem] h-[400px]">
      <div className="flex flex-col mt-7 mx-auto w-[90%] mb-[1rem] p-[2rem] leading-4 shadow-desc bg-slate-100 ">
        <span className="font-bold leading-5">
          <span className="text-black">&nbsp;Lưu ý:</span>
        </span>
        <br />
        <span className="text-[red] leading-7">
          » Để mua khóa học xin vui lòng liên hệ với chúng tôi qua Fanpage
          <a
            className="text-blue-500 cursor-pointer ml-4 hover:text-green-400 font-bold text-[1.8rem]"
            href="https://www.facebook.com/profile.php?id=100090524688743"
            alt="facebook"
          >
            tại đây
          </a>
        </span>
        <br />
        <span className="text-[red] leading-7">
          » Nội dung chuyển khoản ghi rõ: Email hoặc tài khoản - Khóa học muốn
          mua. Ví dụ: nguyenvanAgmail.com - n3
        </span>
        <br />

        <span className="text-[#222222] leading-7">
          » Lưu ý : Bỏ ký tự đặc biệt @ trong địa chỉ mail vì 1 số ngân hàng
          không giao dịch được.
        </span>
        <br />
        <span className="text-[#222222] leading-7">
          » Chuyển thành thành công vui lòng nhắn admin với các phương thức ở
          cuối trang hoặc nháy vào nút tin nhắn ngay góc phải dưới màn hình.
        </span>
        <br />

        <span className="text-[#222222] leading-7">
          » Nếu lỡ không đính kèm thông tin thì xin vui lòng gửi kèm biên lai để
          chúng tôi xử lí.
        </span>
        <br />

        <span className="text-[#222222] leading-7">
          » Bạn cũng có thể liên hệ với chúng tôi qua messenger facebook ở góc
          dưới trái màn hình.
        </span>
      </div>
    </div>
  );
}

export default BuyCourse;
