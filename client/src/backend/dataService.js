const url = `${import.meta.env.VITE_BACKEND_URL}/watched-data/`;

const getData = async (id) => {
  try {
    const response = await fetch(url + id, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addData = async (id) => {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        videoId: id,
        status: "PENDING",
      }),
    });
  } catch (error) {
    console.log("error");
  }
};

const updateData = async (id, data) => {
  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: data,
    });
  } catch (error) {
    console.log("error");
  }
};

const dataService = { getData, addData, updateData };

export default dataService;
