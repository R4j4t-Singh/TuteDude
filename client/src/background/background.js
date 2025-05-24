import dataService from "../backend/dataService";

const interval = 5;
let videoId;
let recordedIntervals = [];
let videoLength;
let intervalIds = [];

const getSetVideoData = async (id, duration) => {
  videoId = id;
  videoLength = duration;
  let status;

  const lastState = localStorage.getItem(videoId);
  if (lastState && lastState != "") {
    console.log(JSON.parse(lastState));
    recordedIntervals = JSON.parse(lastState);
  } else {
    const data = await dataService.getData(id);
    if (data) {
      if (data.watchedTimeline)
        recordedIntervals = JSON.parse(data.watchedTimeline);
      status = data.status;
    } else {
      dataService.addData(id);
    }
  }

  if (status === "COMPLETED") {
    return {
      status,
    };
  } else {
    saveData();
    const progress = getProgress();
    if (recordedIntervals.length > 0) {
      return {
        status: "PENDING",
        lastTimeStamp:
          recordedIntervals[recordedIntervals.length - 1] * interval,
        progress,
      };
    }
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
  if (progress >= 100) {
    const data = JSON.stringify({
      videoId: videoId,
      timeline: JSON.stringify(recordedIntervals),
      status: "COMPLETED",
    });
    dataService.updateData(videoId, data);
    localStorage.removeItem(videoId);
    resetInterval();
  }
  return progress > 100 ? progress - (progress % 100) : progress;
};

const saveData = () => {
  const id1 = setInterval(() => {
    if (videoId) {
      localStorage.setItem(videoId, JSON.stringify(recordedIntervals));
    }
  }, 5000);

  const id2 = setInterval(async () => {
    const data = JSON.stringify({
      videoId: videoId,
      timeline: JSON.stringify(recordedIntervals),
    });
    await dataService.updateData(videoId, data);
  }, 20000);

  intervalIds.push(id1, id2);
};

const resetInterval = () => {
  intervalIds.forEach((id) => clearInterval(id));
};

const backgroundService = { getSetVideoData, insertTime, getProgress };

export default backgroundService;
