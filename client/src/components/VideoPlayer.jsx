import React, { useRef, useEffect, useState } from "react";
import backgroundService from "../background/background";

function VideoPlayer() {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  let intervalsId = [];

  useEffect(() => {
    if (videoRef) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        const id = "123";
        const duration = videoRef.current.duration;
        const data = backgroundService.getSetVideoData(id, duration);
        if (data) {
          setProgress(data.progress);
          videoRef.current.currentTime = data.lastTimeStamp;
        }
      });

      startSendingData();
    }
  }, []);

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
      <div className="mt-8 p-4 flex justify-center">
        <video
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
          controls
          width="1000px"
          ref={videoRef}
        />
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
