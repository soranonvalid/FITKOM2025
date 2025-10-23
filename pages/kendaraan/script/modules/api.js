const getData = async (state, types = "?type=kendaraan") => {
  try {
    await fetch(
      window.location.origin + "/timbkodein/backend/backend.php" + types,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
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
    await fetch("./backend/backend.php?type=kendaraan", {
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
    await fetch("./backend/backend.php?type=kendaraan", {
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
    await fetch("./backend/backend.php?type=kendaraan", {
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

export { getData, deleteData, postData, updateData };
