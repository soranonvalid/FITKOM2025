import { getData } from "../index.js";

const deleteData = async (id) => {
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
    await getData();
  } catch (err) {
    console.log(err);
  }
};

const postData = async (data) => {
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
    await getData();
  } catch (err) {
    console.log(err);
  }
};

const updateData = async (newData) => {
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
    await getData();
  } catch (err) {
    console.log(err);
  }
};

export { deleteData, postData, updateData };
