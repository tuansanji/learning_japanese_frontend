import React, { useEffect, useRef, useState } from "react";
import LoopIcon from "@material-ui/icons/Loop";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import gsap from "gsap";
import music from "../../assets/music/1234.mp3";
import {
  getCurrentIndex,
  getLessonCurrent,
} from "../../redux/slice/courseSlice";
import { useDispatch } from "react-redux";
import Loading from "../../component/SupportTab/Loading";
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
  const dispatch = useDispatch();
  const handlePlayAndPause = () => {
    if (play) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlay(!play);
  };

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
  const handleLoadedData = () => {
    setLoading(false);
    setDuration(audioRef.current.duration);
    if (play) audioRef.current.play();
  };
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

  //
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
  };
  //phát lại một bài hát
  const handleRepeatOne = () => {
    setRepeatOne(!repeatOne);
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

  return (
    <div>
      <div className="bg-[#EEF1F7] h-[80vh] w-[800px]">
        <div className="fixed z-[8888] inset-0">{loading && <Loading />}</div>
        <div className=" w-full flex flex-col justify-center items-center gap-[3rem]">
          <header className="items-center pt-[6rem] flex flex-col justify-center">
            <h4 className="font-bold text-[1.6rem] ">Now playing:</h4>
            <h2 className="text-[3rem] animate-charcter">
              {lessonCurrent.name}
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

          <div className="flex gap-10 bg-[#f0e6e6] px-[3rem] py-[1rem] rounded-2xl">
            <div
              onClick={handleRepeat}
              className="cursor-pointer  active:opacity-20 rounded-[50%] hover:bg-slate-100   p-5 "
            >
              <LoopIcon
                style={{ fontSize: "4rem", color: `${repeat ? "red" : ""}` }}
              />
            </div>
            <div
              className="  p-5  cursor-pointer  active:opacity-20 rounded-[50%] hover:bg-slate-100 "
              onClick={handlePrevLesson}
            >
              <SkipPreviousIcon style={{ fontSize: "4rem" }} />
            </div>
            <div
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
            </div>
            <div
              className="  p-5  cursor-pointer  active:opacity-20 rounded-[50%] hover:bg-slate-100 "
              onClick={handleNextLesson}
            >
              <SkipNextIcon style={{ fontSize: "4rem" }} />
            </div>
            <div
              onClick={handleRepeatOne}
              className="p-5  cursor-pointer  active:opacity-20 rounded-[50%] hover:bg-slate-100  "
            >
              <RepeatOneIcon
                style={{ fontSize: "4rem", color: `${repeatOne ? "red" : ""}` }}
              />
            </div>
          </div>

          <div className="relative w-full flex justify-center">
            <span className="absolute left-[10%] text-red-600 font-bold">
              {audioRef.current &&
                audioRef.current.currentTime != null &&
                `
  ${(audioRef.current.currentTime / 60).toFixed(2).split(".")[0]}:${
                  (audioRef.current.currentTime / 60).toFixed(2).split(".")[1]
                }
  `}
            </span>
            <span className="absolute right-[10%] font-bold">
              {duration &&
                `
              ${(duration / 60).toFixed(2).split(".")[0]}:${
                  (duration / 60).toFixed(2).split(".")[1]
                }
              
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
            src={lessonCurrent.audio}
            onLoadedData={handleLoadedData}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onEnded={() => setPlay(false)}
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
