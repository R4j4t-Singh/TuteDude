import Video from "../model/Video.js";

const postVideo = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || url?.trim() === "") throw new Error("Video url is required");

    const video = await Video.create({
      url,
    });

    return res.status(201).json({
      videoId: video._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id?.trim() === "") throw new Error("Video id is required");

    const video = await Video.findById(id);

    if (!video) throw new Error("Video not found");

    res.status(200).json({
      video,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export { postVideo, getVideo };
