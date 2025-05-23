import React from "react";

function VideoPlayer() {
  return (
    <>
      <div className="mt-8 p-4 flex justify-center">
        <video
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
          controls
          width="1000px"
        />
      </div>
    </>
  );
}

export default VideoPlayer;
