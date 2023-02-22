import React from "react";
import { useParams } from "react-router-dom";

function GuidePage() {
  const params = useParams();
  return (
    <div className="h-[50vh]  w-full flex items-center justify-center">
      <h1>
        đây là trang hướng dẫn - dữ liệu sẽ được lấy ở database sau này - mục :
        <span className="text-[3rem] text-[red]"> {params.question}</span>
      </h1>
    </div>
  );
}

export default GuidePage;
