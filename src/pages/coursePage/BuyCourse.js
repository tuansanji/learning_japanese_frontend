import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
function BuyCourse() {
  return (
    <div className="relative flex flex-col items-center bg-[#000836] py-[3rem] min-h-[400px]">
      <div
        className="flex
      ssm:flex-col-reverse
      justify-around mt-7 mx-auto w-[90%] mb-[1rem] p-[2rem] leading-4 shadow-desc bg-slate-100 "
      >
        <div className="flex flex-col justify-around">
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
              Tại Đây
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
            » Nếu lỡ không đính kèm thông tin thì xin vui lòng gửi kèm biên lai
            để chúng tôi xử lí.
          </span>
          <br />

          <span className="text-[#222222] leading-7">
            » Bạn cũng có thể liên hệ với chúng tôi qua messenger facebook ở góc
            dưới trái màn hình.
          </span>
        </div>
        <Result
          icon={<SmileOutlined />}
          extra={false}
          // title={<strong className="text-red-500">20k/tháng🔥 (ưu đãi đến )</strong>}
          title={
            <p className="flex flex-col items-center gap-3 sm:justify-center">
              <p className="flex  items-center gap-3 sm:justify-center">
                <span className="text-[1.4rem] sm:text-[1.3rem]  line-through">
                  50.000đ
                </span>
                <span className="text-[#f47425] text-[1.8rem] sm:text-[1.4rem]  font-semibold">
                  29.000đ/tháng
                </span>
              </p>
              <span className="text-[1.6rem] sm:text-[1.3rem] mr-2">
                ( Ưu đãi đến 20/7/2023 )
              </span>
            </p>
          }
        />
      </div>
    </div>
  );
}

export default BuyCourse;
