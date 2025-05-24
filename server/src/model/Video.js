import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  url: String,
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
