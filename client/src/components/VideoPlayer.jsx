import React, { useRef, useEffect, useState } from "react";
import backgroundService from "../background/background";
import videoService from "../backend/videoService.js";

function VideoPlayer() {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(null);
  const [loading, setloading] = useState(true);
  const videoId = "68316aaecbc4e7c7d5c40bf2";
  let intervalsId = [];

  useEffect(() => {
    if (videoRef) {
      getVideo();
      videoRef.current.addEventListener("loadedmetadata", async () => {
        const duration = videoRef.current.duration;
        const data = await backgroundService.getSetVideoData(videoId, duration);

        if (data) {
          if (data.status === "COMPLETED") {
            setProgress(100);
            videoRef.current.currentTime = duration;
            return;
          } else {
            setProgress(data.progress);
            videoRef.current.currentTime = data.lastTimeStamp;
          }
        }
        startSendingData();
      });
      setloading(false);
    }
  }, []);

  const getVideo = async () => {
    const data = await videoService.getVideoData(videoId);
    if (data) {
      setVideo(data.video);
    }
  };

  const startSendingData = () => {
    const id1 = setInterval(() => {
      const timeStamp = videoRef.current.currentTime;
      if (timeStamp > 0) {
        backgroundService.insertTime(timeStamp);
      }
    }, 2000);

    const id2 = setInterval(() => {
      const progress = backgroundService.getProgress();
      if (progress >= 100) resetInterval();
      setProgress(progress);
    }, 5000);

    intervalsId.push(id1, id2);
    intervalsId = [];
  };

  const resetInterval = () => {
    intervalsId.forEach((id) => clearInterval(id));
  };

  return (
    <>
      {loading && <h2>Please wait...</h2>}
      <div className="mt-8 p-4 flex justify-center">
        <video src={video?.url} controls width="1000px" ref={videoRef} />
      </div>
      <div className="mx-8">
        <div className="mt-3 w-full h-2 bg-gray-300 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Watched: {progress.toFixed()}%
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
