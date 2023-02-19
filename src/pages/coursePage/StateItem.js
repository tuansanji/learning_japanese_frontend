import React from "react";
import { Link } from "react-router-dom";

function StateItem() {
  return (
    <div
      aria-label="card-item-v2"
      className="flex flex-col w-full p-5 bg-white shadow-sm rounded-lg relative hover:bottom-[2rem]"
    >
      <div className="relative flex-shrink-0 mb-5 h-[150px]">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute z-10 px-4 py-2 bg-white rounded-lg text-cyan-500 right-5 top-5"></div>
      </div>
      <div className="flex items-center justify-between flex-1 gap-x-5">
        <div className="flex flex-col">
          <h2 className="mb-3 text-2xl font-bold">
            <span className="text-[orange] ">12</span> Bài học
          </h2>
          <div className="flex items-center gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-cyan-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-400">Thời lượng</span>
            <span className="text-[red]"> 12 tiếng</span>
          </div>
          <div className="flex items-center gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-cyan-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-400">Giá</span>
            <span className="text-[red]"> 20</span>
          </div>
        </div>
        <div className="flex items-center p-3 px bg-gray-300 gap-x-1 rounded-xl hover:bg-green-500 hover:text-[#fff]">
          <Link to="/course/n1/state-1/lesson-1">HỌC NGAY</Link>
        </div>
      </div>
    </div>
  );
}

export default StateItem;
