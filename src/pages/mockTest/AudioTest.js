import React, { useEffect, useRef, useState } from "react";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Col, Row, Statistic } from "antd";
import { useDispatch } from "react-redux";
import { toastSuccess } from "../../redux/slice/toastSlice";

const { Countdown } = Statistic;

function AudioTest({ audio, timeLine }) {
  const audioRef = useRef();
  const dispatch = useDispatch();
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0);

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
  }, [audioRef.current]);

  useEffect(() => {
    timeLine
      ? setTime(Date.now() + timeLine * 60 * 1000)
      : setTime(Date.now() + 30 * 60 * 1000);
  }, []);
  const handlePlayAndPause = () => {
    if (audioRef && !isPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlay(!isPlay);
  };
  const handleSeek = (e) => {
    const seekTime = Number((e.target.value / 100) * audioRef.current.duration);
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
    if (!isPlay) {
      setIsPlay(true);
      audioRef.current.play();
    }
  };
  //load data
  const handleLoadedData = () => {
    setLoading(false);

    setDuration(audioRef.current.duration);
  };
  const onFinish = () => {
    dispatch(toastSuccess("Bạn đã hết thời gian làm bài"));
  };
  const onChange = (val) => {
    if (typeof val === "number" && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log("changed!");
    }
  };

  return (
    <div className="fixed flex items-center gap-10 bg-[#ccc] p-8 z-[1111] h-[4rem] w-full">
      {/* {loading && (
        <div className="fixed left-0 right-0 z-[8888] top-[30%] w-full flex justify-center items-center">
          <Loading />
        </div>
      )} */}
      <div className="w-[70%] md:w-full  flex gap-4">
        <time className="font-semibold">
          {audioRef.current &&
            `${Math.floor(audioRef.current.currentTime.toFixed(0) / 60)}:${
              audioRef.current.currentTime.toFixed(0) % 60 < 10 ? "0" : ""
            }${audioRef.current.currentTime.toFixed(0) % 60}
                              `}
        </time>
        <input
          id="progress"
          className="w-full  transition-all"
          value={progress}
          step="1"
          min="0"
          max="100"
          type="range"
          onChange={handleSeek}
        />
        <time className="font-semibold">
          {duration &&
            `${Math.floor(duration.toFixed(0) / 60)}:${
              duration.toFixed(0) % 60 < 10 ? "0" : ""
            }${duration.toFixed(0) % 60}
                              `}
        </time>
        <audio
          ref={audioRef}
          id="audio"
          src={audio && audio}
          onLoadedData={handleLoadedData}
        ></audio>
      </div>

      <div className="py-2">
        <button
          onClick={handlePlayAndPause}
          className="rounded-[50%] shadow-desc "
        >
          {isPlay ? (
            <PauseIcon className="" style={{ fontSize: "4rem" }} />
          ) : (
            <PlayArrowIcon style={{ fontSize: "4rem" }} />
          )}
        </button>
      </div>
      <div className="flex flex-row flex-1   items-center gap-4 xl:absolute xl:right-1 xl:bottom-[-100%]">
        <p className="font-semibold md:hidden">Thời gian còn lại:</p>
        <Row gutter={16}>
          <Col span={12}>
            <Countdown
              title=""
              valueStyle={{ color: "red" }}
              value={time}
              onFinish={onFinish}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AudioTest;
