import React from "react";
import momo from "../../assets/img/momo.jpg";
import viettin from "../../assets/img/viettin.jpg";
function Donate() {
  return (
    <div className="relative flex flex-col ssm:flex-col-reverse items-center bg-[#000836] py-[3rem] min-h-[400px]">
      <div className="flex justify-center ssm:flex-col  ssm:h-full gap-[8rem] md:gap-[3rem] w-[90%] h-[400px] md:h-[300px] sm:h-[250px] mx-auto mb-[1rem]">
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
      <div className="text-[2rem] ssm:text-[1.6rem] flex flex-col mt-7 mx-auto w-[90%] mb-[1rem] p-[2rem] leading-4 shadow-desc bg-slate-100 ">
        <span className="font-bold leading-5">
          <span className="text-black">&nbsp;Lưu ý:</span>
        </span>
        <br />
        <span className="text-[red] leading-7">
          » Dù là <span className="text-blue-500 font-bold">1k</span>{" "}
          <span className="text-blue-500 font-bold">2k</span> cũng cám ơn mọi
          người 😊. Sự ủng hộ của các bạn là động lực để nhóm em tiếp tục phát
          triển trang web ạ ❤️
        </span>
        <br />
        <span className="text-[red] leading-7">
          » Mọi thắc mắc xin vui lòng liên hệ với nhóm em qua Fanpage
          <a
            className="text-blue-500 cursor-pointer ml-4 hover:text-green-400 font-bold text-[1.8rem]"
            href="https://www.facebook.com/profile.php?id=100090524688743"
            alt="facebook"
          >
            tại đây
          </a>
        </span>
      </div>
    </div>
  );
}

export default Donate;
