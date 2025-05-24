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
};

const getProgress = () => {
  const totalIntervals = Math.floor(videoLength / interval);
  const progress = (recordedIntervals.length / totalIntervals) * 100;
  return progress > 100 ? progress - (progress % 100) : progress;
};

const backgroundService = { setVideoData, insertTime, getProgress };

export default backgroundService;
