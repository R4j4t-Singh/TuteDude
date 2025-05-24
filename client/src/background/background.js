const interval = 5;
let videoId;
let recordedIntervals = [];
let videoLength;

const getSetVideoData = (id, duration) => {
  videoId = id;
  videoLength = duration;
  const lastState = localStorage.getItem(videoId);
  if (lastState && lastState != "") {
    console.log(JSON.parse(lastState));
    recordedIntervals = JSON.parse(lastState);
    const progress = getProgress();
    const lastTimeStamp =
      recordedIntervals[recordedIntervals.length - 1] * interval;
    return {
      progress,
      lastTimeStamp,
    };
  }
  return null;
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

setInterval(() => {
  if (videoId) {
    localStorage.setItem(videoId, JSON.stringify(recordedIntervals));
  }
}, 5000);

const backgroundService = { getSetVideoData, insertTime, getProgress };

export default backgroundService;
