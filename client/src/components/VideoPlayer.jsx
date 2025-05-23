import React, { useRef, useEffect } from "react";
import backgroundService from "../background/background";

function VideoPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        const id = "123";
        const duration = videoRef.current.duration;
        backgroundService.setVideoData(id, duration);
      });
    }
  }, []);

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
    </>
  );
}

export default VideoPlayer;
