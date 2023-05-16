import { Button, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import ReactPlayer from "react-player";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Loading from "../../component/SupportTab/Loading";

function VideoView() {
  const [movieCurrent, setMovieCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [listFilm, setListFilm] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuVideo, setMenuVideo] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);

  // lấy danh sách phim để làm menu
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/all`).then((res) => {
      setListFilm(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const now = new Date();
    const secretKey = process.env.REACT_APP_SECRETKEY;
    const code = btoa(
      (now.getUTCMinutes() ^ now.getUTCSeconds() ^ 0xffff).toString() +
        secretKey
    );
    setCode(code);
  }, []);

  //xét lại params khi thay đổi video
  useEffect(() => {
    if (movieCurrent) {
      setSearchParams({
        videoId: movieCurrent._id,
      });
    }
  }, [movieCurrent]);
  // lấy dữ liệu bài học lần đầu qua params
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/movies/${searchParams.get(
          "videoId"
        )}`
      )
      .then((res) => {
        setMovieCurrent(res.data);
        setLoading(false);
      });
  }, []);
  //ẩnn footer
  useEffect(() => {
    const footer = document.querySelector("#footer");
    footer.style.display = "none";
    return () => {
      footer.style.display = "block";
    };
  }, []);
  //xác định vìeo hiện tại
  const handleCurrentVideo = (film) => {
    if (listFilm) {
      const currentFilm = listFilm.filter((item) => item._id === film._id);
      if (currentFilm) {
        setMovieCurrent(currentFilm[0]);
      }
    }
  };
  // scroll bài học
  useEffect(() => {
    const activeElement = document.querySelector(".video__item.active");
    if (activeElement)
      activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [movieCurrent]);

  //xet điện thoại hay máy tính để làm menu
  useEffect(() => {
    if (window.innerWidth < 500) {
      setMenuVideo(false);
      setMobile(true);
    } else {
      setMenuVideo(true);
      setMobile(false);
    }
  }, [window.innerWidth]);
  // thêm lượt xem
  const handlePlay = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies/views`, {
      id: searchParams.get("videoId"),
    });
  };
  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };
  // phần thêm thời gian cho video
  useEffect(() => {
    if (
      (movieCurrent && movieCurrent.time === null) ||
      (movieCurrent && movieCurrent.time === undefined) ||
      (movieCurrent && movieCurrent.time === 0)
    ) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/movies/time`, {
          id: movieCurrent._id,
          time: Number(videoDuration).toFixed(0),
        })
        .then((res) => {
          return;
        })
        .catch((err) => {
          return;
        });
    }
  }, [movieCurrent]);
  return (
    <>
      {!loading && movieCurrent ? (
        <div className="bg-[#111] flex fixed inset-0  top-[65px] ">
          <div className="flex-1 absolute overflow-y-auto p-[2rem] top-0 left-0 bottom-0 right-[400px]  sm:right-0 video__main ">
            <Button
              className={`bg-[white]  mb-5 hidden sm:block`}
              onClick={() => {
                setMenuVideo(!menuVideo);
              }}
            >
              Danh sách phim (nháy chọn video để ẩn danh sách)
            </Button>
            <div className="react__player min-h-[450px] sm:min-h-[200px] relative">
              <ReactPlayer
                width="100%"
                height="100%"
                className="react_player"
                url={
                  movieCurrent.path !== ""
                    ? `${process.env.REACT_APP_VIDEO_URL}${movieCurrent.path}${process.env.REACT_APP_SUB_VIDEO_URL}=${code}`
                    : ""
                }
                // onProgress={handleProgress}
                // onReady={handleReady}
                onDuration={handleDuration}
                onPlay={handlePlay}
                playing={true}
                controls={true}
                playsinline={true}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            </div>
            <div className="pt-[3rem] flex flex-col gap-5 pb-10">
              <p>
                <span className="font-bold text-[#fff]">Tên phim : </span>
                <span className="text-[red]">{movieCurrent.title}</span>
              </p>
              <p>
                <span className="font-bold text-[#fff]">Tập : </span>
                <span className="text-[#46E1FF]">{movieCurrent.part}</span>
              </p>
              <p>
                <span className="font-bold text-[#fff]">Lượt xem : </span>
                <span className="text-[#ccc]">{movieCurrent.view}</span>
              </p>{" "}
              <p>
                <span className="font-bold text-[#fff]">Ngôn ngữ : </span>
                <span className="text-[#ccc]">{movieCurrent.language}</span>
              </p>
              <p>
                <span className="font-bold text-[#fff]">Thời gian : </span>
                <span className="text-[#ccc]">{`
                ${Math.floor(movieCurrent.time / 3600)} giờ ${Math.floor(
                  (movieCurrent.time % 3600) / 60
                )} phút
                              `}</span>
              </p>
              <p>
                <span className="font-bold text-[#fff]">Thể loại : </span>
                <span className="text-[#46E1FF]">
                  {movieCurrent.movieGenre.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </span>
              </p>
              <p>
                <span className="font-bold text-[#fff]">Mô tả : </span>
                <span className="text-[#ccc]">{movieCurrent.description}</span>
              </p>
            </div>
          </div>
          <div
            className={`flex-shrink-0 w-[400px] sm:w-full absolute top-0 bottom-0 overflow-y-auto  ${
              menuVideo ? "right-0" : "right-[100%]"
            } transition-all`}
          >
            {listFilm ? (
              listFilm.map((film, index) => (
                <div
                  key={index}
                  className={`video__item ${
                    film._id === movieCurrent._id
                      ? "bg-[#e3cfcf] active"
                      : "bg-[#111]"
                  }`}
                  onClick={() => {
                    mobile && setMenuVideo(false);
                    movieCurrent._id !== film._id && handleCurrentVideo(film);
                  }}
                >
                  <span className="language">{film.language}</span>
                  <div className="img" data-value={film.part}>
                    <img src={film.avatar} alt="" />
                  </div>
                  <div className="content flex flex-col justify-between">
                    <span className="name">Tên phim : {film.title}</span>
                    <span className="genre">
                      Thể loại :
                      {film.movieGenre.map((item, index) => (
                        <span key={index}> {item}</span>
                      ))}
                    </span>
                    <span className="view"> {film.view} lượt xem</span>
                  </div>
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>
        </div>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}

export default VideoView;
