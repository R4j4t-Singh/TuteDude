const url = "http://localhost:3000/api/videos/";

const getVideoData = async (id) => {
  try {
    const response = await fetch(url + id, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const videoService = { getVideoData };

export default videoService;
