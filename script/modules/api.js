const getDataGudang = async (state) => {
  try {
    await fetch("./backend/backend.php?type=gudang", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        state(data);
        console.log(data);
      });
  } catch (err) {
    console.log(err);
  }
};

const getData = async (state) => {
  try {
    await fetch("./backend/backend.php", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        state(data);
        console.log(data);
      });
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async (id, state) => {
  try {
    await fetch("./backend/backend.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    await getData(state);
  } catch (err) {
    console.log(err);
  }
};

const postData = async (data, state) => {
  try {
    await fetch("./backend/backend.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    await getData(state);
  } catch (err) {
    console.log(err);
  }
};

const updateData = async (newData, state) => {
  try {
    await fetch("./backend/backend.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    await getData(state);
  } catch (err) {
    console.log(err);
  }
};

export { getDataGudang, getData, deleteData, postData, updateData };
