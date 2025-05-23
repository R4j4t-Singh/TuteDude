let videoId;
let videoLength;

const setVideoData = (id, duration) => {
  videoId = id;
  videoLength = duration;
};

const backgroundService = { setVideoData };

export default backgroundService;
