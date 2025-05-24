import WatchedData from "../model/WatchedData.js";

const postWatchedData = async (req, res) => {
  try {
    const { videoId, status } = req.body;

    if (!videoId || !status || videoId.trim() == "")
      throw new Error("Video id and status are required");

    await WatchedData.create({
      videoId,
      status,
    });

    res.status(201).json({
      message: "Data added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getWatchedData = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) throw new Error("Video id is required");

    const data = await WatchedData.findOne({
      videoId: videoId,
    });

    if (!data) throw new Error("No data found");

    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateData = async (req, res) => {
  try {
    const { videoId, timeline, status } = req.body;

    if (!videoId || !timeline)
      throw new Error("Video id and timeline are required");

    const update = { watchedTimeline: timeline };
    if (status) {
      update.status = status;
    }

    const result = await WatchedData.updateOne({ videoId }, { $set: update });

    if (result.modifiedCount === 0) {
      throw new Error("No matching video to update");
    }

    res.status(200).json({
      message: "Data updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export { postWatchedData, getWatchedData, updateData };
