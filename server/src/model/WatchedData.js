import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pednding", "completed"],
  },
  watchedTimeline: String,
});

const WatchedData = mongoose.model("WatchedData", dataSchema);

export default WatchedData;
