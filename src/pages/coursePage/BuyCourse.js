import React from "react";
import { useParams } from "react-router-dom";
import momo from "../../assets/img/momo.jpg";
import viettin from "../../assets/img/viettin.jpg";

function BuyCourse() {
  const params = useParams();

  return (
    <div className="relative flex flex-col items-center bg-[#000836] py-[3rem]">
      <div className="flex justify-center ssm:flex-col ssm:h-full gap-[8rem] md:gap-[3rem] w-[90%] h-[400px] md:h-[300px] sm:h-[250px] mx-auto mb-[1rem]">
        <img
          className="h-full rounded-2xl ssm:w-[80%] ssm:mx-auto "
          src={momo}
          alt=""
        />
        <img
          className="h-full rounded-2xl ssm:w-[80%] ssm:mx-auto"
          src={viettin}
          alt=""
        />
      </div>

      <div className="flex flex-col mt-7 mx-auto w-[90%] mb-[1rem] p-[2rem] leading-4 shadow-desc bg-slate-100 ">
        {/* <form
          method="POST"
          action={`${process.env.REACT_APP_BACKEND_URL}/user/paypal`}
          className="w-[20rem] bg-[red] h-[4rem]"
        >
          <button type="submit" className="">
            thanh toán{" "}
          </button>
        </form> */}
        <span className="font-bold leading-5">
          <span className="text-black">&nbsp;Lưu ý:</span>
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
      </div>
    </div>
  );
}

export default BuyCourse;
