const interval = 5;
let videoId;
let recordedIntervals = [];
let videoLength;

const setVideoData = (id, duration) => {
  videoId = id;
  videoLength = duration;
};

const insertTime = (timeStamp) => {
  const currentInterval = Math.floor(timeStamp / interval);
  if (!recordedIntervals.includes(currentInterval)) {
    recordedIntervals.push(currentInterval);
  }
  console.log(recordedIntervals);
};

const backgroundService = { setVideoData, insertTime };

export default backgroundService;
