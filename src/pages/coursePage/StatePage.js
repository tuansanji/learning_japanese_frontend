import React from "react";
import { Button, Table } from "antd";
import { useState } from "react";
import ViewlearnPage from "../viewLearnPage/ViewlearnPage";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Teacher",
    dataIndex: "teacher",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: `${i}`,
    id: (
      <div className="h-full w-full bg-[orange] text-center rounded-xl">
        {i}
      </div>
    ),
    name: (
      <div className="h-full w-full bg-green-400 p-[1rem] hover:bg-[orange]">
        <Link
          className="w-full inline-block  h-full hover:text-[#fff] "
          to="/course/n1/state-1/lesson-1/v1"
        >
          {`1 - Kanji mới- 井 丼 囲 ${i} `}
        </Link>
      </div>
    ),
    teacher: "Dungmori",
    time: `1h`,
  });
}
function StatePage() {
  return (
    <div>
      <div>
        <div className="py-4 ">
          <p className="text-center text-[3rem] text-[red]">N1 - Giai Đoạn 1</p>
        </div>
        <Table
          //   rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
}

export default StatePage;
