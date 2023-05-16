import React, { useEffect, useMemo, useState } from "react";
import "./moviePage.scss";
import axios from "axios";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
const MoviePage = () => {
  const [listFilm, setListFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listGenre, setListGenre] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [numShown, setNumShown] = useState(8);

  //get all film
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/all`).then((res) => {
      setListFilm(res.data);
      setLoading(false);
    });
  }, []);
  // tạo chức năng load more đơn giản, sau có thời gian sẽ chỉnh pagination ở backend
  function handleLoadMore() {
    setNumShown(numShown + 10);
  }
  // hỗ trợ việc giải mảng ra chỉ duy nhất môt mảng
  function flattenArray(arr) {
    var flatArr = [];
    arr.forEach(function (element) {
      if (Array.isArray(element)) {
        flatArr = flatArr.concat(flattenArray(element));
      } else {
        flatArr.push(element);
      }
    });
    return flatArr;
  }
  //lấy danh sách thể loại film
  useEffect(() => {
    if (listFilm) {
      const arr = [];
      listFilm.forEach((film) => {
        arr.push(film.movieGenre);
      });
      setListGenre([...new Set(flattenArray(arr))]);
    }
  }, [listFilm]);
  // tạo một con số củ thể để lấy film tiêu biêu
  const numberVideo = useMemo(() => {
    if (listFilm) {
      return Math.floor(Math.random() * listFilm.length);
    }
  }, [listFilm]);

  return (
    <div className="movie__container">
      {!loading && listFilm ? (
        <div className="right">
          <div className="heading  h-[350px] md:h-[250px] sm:h-[200px] ">
            <div className="head-content  flex flex-col gap-6 sm:gap-3  justify-between p-[2rem] md:py-[4px]">
              <p className=" text-[2.4rem] capitalize sm:text-[1.4rem]">
                Phim nổi bật
              </p>
              <div className="rating">
                <span className="material-icons text-[red] text-[2rem] sm:margin-0 sm:text-[1.6rem]">
                  Tên phim : {listFilm && listFilm[numberVideo].title}
                </span>
              </div>
              <p className="md:max-h-[120px] max-h-[200px] overflow-hidden md:text-ellipsis ">
                {listFilm && listFilm[numberVideo].description}
              </p>
              <Link
                to={`/movies/video?videoId=${listFilm[numberVideo]._id}`}
                className="btn btn-main"
              >
                Xem ngay
              </Link>
            </div>
            <div
              className={`img-container h-full`}
              data-value={listFilm[numberVideo].part}
            >
              <img src={listFilm[numberVideo].avatar} alt="" />
            </div>
          </div>
          {listFilm &&
            listGenre &&
            listGenre.map((gender) => (
              <>
                <div className="trending pb-[3rem] sm:pb-[1.5rem] sm:!mt-[20px]">
                  <p className="title__film sm:!text-[2.3rem] pb-8 sm:pb-3 capitalize text-blue-500">
                    {gender}
                  </p>

                  <div
                    className={`px-6 grid grid-cols-4 md:grid-cols-2  ssm:grid-cols-[unset]  ssm:grid-flow-col	ssm:auto-cols-[40%] md:overflow-x-auto gap-9  `}
                  >
                    {listFilm &&
                      listFilm
                        .filter((film) => {
                          const arr = film.movieGenre.filter(
                            (item) =>
                              item.toLowerCase().trim() ===
                              gender.toLowerCase().trim()
                          );

                          return arr.length > 0 && film;
                        })
                        .slice(0, numShown)
                        .map((item, index) => (
                          <Link
                            key={index}
                            to={`/movies/video?videoId=${item._id}`}
                          >
                            <div className="list" data-value={item.part}>
                              <img
                                className="sm:!h-[165px]"
                                src={item.avatar}
                                alt=""
                              />
                              <div className="sub__list">
                                <span className="font-bold text-[#ccc] sm:text-[1.3rem] text-center">
                                  Tên phim :{" "}
                                  <span className="text-[#46E1FF]">
                                    {item.title}
                                  </span>
                                </span>
                                <span className="font-bold text-[#ccc]">
                                  {" "}
                                  Ngôn ngữ : {item.language}
                                </span>
                                <span className="font-bold text-[#ccc]">
                                  {" "}
                                  {item.view} lượt xem
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>
                {numShown <
                  listFilm.filter((film) => film.movieGenre.includes(gender))
                    .length && (
                  <button
                    onClick={handleLoadMore}
                    className="font-bold underline text-[#ccc] pb-[2rem] sm:pb-1 ml-5"
                  >
                    Load More
                  </button>
                )}
              </>
            ))}
        </div>
      ) : (
        <>
          <Skeleton active></Skeleton>
        </>
      )}
    </div>
  );
};

export default MoviePage;
