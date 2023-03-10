import React, { useEffect, useRef, useState } from "react";
import LoopIcon from "@material-ui/icons/Loop";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import gsap from "gsap";
import music from "../../assets/music/1234.mp3";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  getCurrentIndex,
  getLessonCurrent,
} from "../../redux/slice/courseSlice";
import { useDispatch } from "react-redux";
import Loading from "../../component/SupportTab/Loading";
import axios from "axios";
function MusicPage({ lessonCurrent, currentLessonList }) {
  const [play, setPlay] = useState(false);
  const cdRef = useRef(null);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuMusic, setMenuMusic] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const cdMove = gsap.to(cdRef.current, {
      rotation: "360",
      duration: 7,
      repeat: -1,
      ease: "none",
    });
    //đều là trong giai đoạn test còn chưa hoàn thiện
    if (play) {
      cdMove.play();
    } else {
      cdMove.pause();
    }
    return () => {
      cdMove.pause();
    };
  }, [play]);

  //thêm thời gian video

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercent = (currentTime / duration) * 100;

      if (progressPercent > 0) {
        setProgress(progressPercent);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    // Set isLoading to true when component mounts or the audio src changes
    if (lessonCurrent) {
      setLoading(true);

      const audio = new Audio(lessonCurrent.audio);

      audio.addEventListener("loadeddata", () => {
        // Set isLoading to false when audio has finished loading
        setLoading(false);
      });

      // Clean up event listener on component unmount
      return () => {
        audio.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [lessonCurrent]);
  //xử lí input bài hát
  const handleSeek = (e) => {
    const seekTime = Number((e.target.value / 100) * audioRef.current.duration);
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
    if (!play) {
      setPlay(true);
      audioRef.current.play();
    }
  };
  // phát lại bài hát
  const handleRepeat = () => {
    setRepeat(!repeat);
    setRepeatOne(false);
  };
  //phát lại một bài hát
  const handleRepeatOne = () => {
    setRepeatOne(!repeatOne);
    setRepeat(false);
  };
  //tạm dừng và tiếp tục
  const handlePlayAndPause = () => {
    if (play) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlay(!play);
  };
  //next bài hát
  const handleNextLesson = () => {
    let currentIndex = JSON.parse(localStorage.getItem("index"));

    if (currentIndex < currentLessonList.length - 1) {
      dispatch(getCurrentIndex(currentIndex + 1));
      let newIndex = JSON.parse(localStorage.getItem("index"));
      dispatch(getLessonCurrent(currentLessonList[newIndex]));
      audioRef.current.play();
      setPlay(true);
      const activeElement = document.querySelector(".content_2 .active");
      activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  //lùi bài hát
  const handlePrevLesson = () => {
    let currentIndex = JSON.parse(localStorage.getItem("index"));
    if (currentIndex > 0) {
      dispatch(getCurrentIndex(currentIndex - 1));
      let newIndex = JSON.parse(localStorage.getItem("index"));
      dispatch(getLessonCurrent(currentLessonList[newIndex]));
      audioRef.current.play();
      setPlay(true);
      const activeElement = document.querySelector(".content_2 .active");
      activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  //xử lí video kết thúc( xử lí repeat )
  const handleEndVideo = () => {
    if (!repeatOne) {
      if (repeat) {
        let currentIndex = JSON.parse(localStorage.getItem("index"));
        if (currentIndex === currentLessonList.length - 1) {
          dispatch(getCurrentIndex(0));
          let newIndex = JSON.parse(localStorage.getItem("index"));
          dispatch(getLessonCurrent(currentLessonList[newIndex]));
          audioRef.current.play();
          setPlay(true);
          const activeElement = document.querySelector(".content_2 .active");
          activeElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        handleNextLesson();
      }
    } else if (repeatOne) {
      setProgress(0);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setPlay(true);
    }
  };

  //load data
  const handleLoadedData = () => {
    setLoading(false);
    setDuration(audioRef.current.duration);
    if (play) audioRef.current.play();
  };

  // thêm thời gian video
  useEffect(() => {
    if (lessonCurrent || lessonCurrent !== null) {
      if (
        lessonCurrent.timeLine === undefined ||
        lessonCurrent.timeLine === 0
      ) {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/courses/timeLine`, {
            id: lessonCurrent._id,
            timeLine: Number(duration).toFixed(0),
          })
          .then((res) => {
            return;
          })
          .catch((err) => {
            return;
          });
      }
    }
  }, [duration]);

  return (
    <div>
      <div
        className={`bg-[#EEF1F7] md:w-full md:h-[63vh]  ${
          menuMusic ? "h-[20vh] fixed  w-[73%] left-0" : "h-[80vh] w-[800px] "
        }`}
      >
        {loading && (
          <div className="fixed z-[8888] top-[30%] w-[100vh] ">
            <Loading />
          </div>
        )}

        <div
          className={` w-full md:w-[90%] mx-auto flex flex-col justify-center items-center relative ${
            menuMusic ? "gap-[0.1rem] " : "gap-[3rem]"
          }`}
        >
          <span
            className="absolute top-[-1rem] right-[3rem] cursor-pointer "
            onClick={() => {
              setMenuMusic(!menuMusic);
            }}
          >
            <ArrowDropDownIcon style={{ fontSize: "50px" }} />
          </span>

          <div className={`${menuMusic ? "hidden" : "flex"}  flex-col gap-7 `}>
            <header className="items-center pt-[6rem] md:pt-[2rem] flex flex-col justify-center">
              <h4 className="font-bold text-[1.6rem] ">Now playing:</h4>
              <h2 className="text-[3rem] animate-charcter">
                {lessonCurrent && lessonCurrent.name}
              </h2>
            </header>

            <div
              ref={cdRef}
              id="cdThumb"
              className="w-[20rem] h-[20rem] rounded-[50%] overflow-hidden"
            >
              <img
                className=" "
                src="https://raonhanh365.vn/pictures/detail/2022/08/16/1693332637108959744.jpg"
                alt=""
              />
            </div>
          </div>

          <div
            className={`flex flex-row gap-10 sm:gap-6 bg-[#f0e6e6] px-[3rem] py-[1rem] rounded-2xl`}
          >
            <button
              onClick={handleRepeat}
              className="cursor-pointer  active:opacity-20 rounded-[50%] hover:bg-slate-100   p-5 "
            >
              <LoopIcon
                style={{ fontSize: "4rem", color: `${repeat ? "red" : ""}` }}
              />
            </button>
            <button
              className={`  p-5   rounded-[50%]            
            ${
              localStorage.getItem("index") &&
              JSON.parse(localStorage.getItem("index")) === 0
                ? "opacity-30"
                : `hover:bg-slate-100 active:opacity-20 cursor-pointer`
            } 
              `}
              onClick={handlePrevLesson}
            >
              <SkipPreviousIcon style={{ fontSize: "4rem" }} />
            </button>
            <button
              className="p-5    cursor-pointer  active:opacity-20  hover:opacity-70 rounded-[50%] bg-[red] overflow-hidden"
              onClick={() => {
                handlePlayAndPause();
              }}
            >
              {play ? (
                <PauseIcon className="" style={{ fontSize: "4rem" }} />
              ) : (
                <PlayArrowIcon style={{ fontSize: "4rem" }} />
              )}
            </button>
            <button
              className={` p-5 rounded-[50%]      
            ${
              localStorage.getItem("index") &&
              JSON.parse(localStorage.getItem("index")) ===
                currentLessonList.length - 1
                ? "opacity-30"
                : `hover:bg-slate-100 active:opacity-20 cursor-pointer`
            }
              `}
              onClick={handleNextLesson}
            >
              <SkipNextIcon style={{ fontSize: "4rem" }} />
            </button>
            <button
              onClick={handleRepeatOne}
              className="p-5  cursor-pointer  active:opacity-20 rounded-[50%] hover:bg-slate-100  "
            >
              <RepeatOneIcon
                style={{ fontSize: "4rem", color: `${repeatOne ? "red" : ""}` }}
              />
            </button>
          </div>

          <div className="relative w-full flex justify-center">
            <span className="absolute left-[10%] text-red-600 font-bold">
              {audioRef.current &&
                audioRef.current !== null &&
                `${Math.floor(audioRef.current.currentTime.toFixed(0) / 60)}:${
                  audioRef.current.currentTime.toFixed(0) % 60 < 10 ? "0" : ""
                }${audioRef.current.currentTime.toFixed(0) % 60}
                              `}
            </span>
            <span className="absolute right-[10%] font-bold">
              {duration &&
                `${Math.floor(duration.toFixed(0) / 60)}:${
                  duration.toFixed(0) % 60 < 10 ? "0" : ""
                }${duration.toFixed(0) % 60}
                              `}
            </span>

            <input
              id="progress"
              className="w-[90%] mt-10 transition-all"
              type="range"
              value={progress}
              onChange={handleSeek}
              step="1"
              min="0"
              max="100"
            />
          </div>
          <audio
            id="audio"
            ref={audioRef}
            src={lessonCurrent && lessonCurrent.audio}
            onLoadedData={handleLoadedData}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onEnded={() => {
              handleEndVideo();
            }}
          ></audio>
        </div>
      </div>
    </div>
  );
}

export default MusicPage;
// const [pausedTime, setPausedTime] = useState(0);

// useEffect(() => {
//   const cdMove = gsap.to(cdRef.current, {
//     rotation: "360",
//     duration: 7,
//     repeat: -1,
//     ease: "none",
//   });

//   if (play) {
//     cdMove.play();
//   } else {
//     cdMove.pause();
//     setPausedTime(cdMove.time());
//   }

//   return () => {
//     cdMove.pause();
//     cdMove.time(0);
//     cdMove._targets.forEach(
//       (target) => (target.style.transform = "rotate(0deg)")
//     );
//   };
// }, [play]);

// useEffect(() => {
//   if (!play && pausedTime) {
//     const cdMove = gsap.to(cdRef.current, {
//       rotation: "360",
//       duration: 7,
//       repeat: -1,
//       ease: "none",
//     });
//     cdMove.pause();
//     cdMove.time(pausedTime);
//   }
// }, [play, pausedTime]);
