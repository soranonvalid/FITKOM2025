// Prompt handler
const state = (initial) => {
  let value = typeof initial === "function" ? initial() : initial;
  const get = () => value;
  const set = (newValue) => {
    value = newValue;
    render();
  };
  return [get, set];
};

const resetForm = (selector) => {
  $(selector).find("input, select, textarea").val("");
  $(selector).find("select").prop("selectedIndex", 0);
};

const promptHandler = (type) => {
  $(document).on("click", `.${type}`, function () {
    $(".prompt-frame").addClass("active");
    $(`#${type}Prompt`).addClass("active");
  });
};

const closePromptForce = () => {
  $(".prompt-frame").removeClass("active");
  $("#createPrompt").removeClass("active");
  $("#editPrompt").removeClass("active");
  resetForm(".addForm");
  resetForm(".editForm");
  imageSwitchers("create");
  imageSwitchers("edit");
};

$(function () {
  promptHandler("create");
  promptHandler("edit");
  $(".close").on("click", function () {
    closePromptForce();
  });

  $(".prompt-frame").on("click", function (e) {
    {
      if (e.target === this) {
        closePromptForce();
      }
    }
  });
});

// Image input switcher (SORA)
const imageSwitchers = (type) => {
  $(`#${type}gambar`).on("change", function () {
    let val = $(this).val();
    if (val === "url") {
      $(`.${type}gambar.image-url-input`).show();
      $(`.${type}gambar.image-upload-input`).hide().addClass("disabled");
    } else if (val === "upload") {
      $(`.${type}gambar.image-url-input`).hide();
      $(`.${type}gambar.image-upload-input`).show().removeClass("disabled");
    }
  });
  $(`#${type}imageupload`).on("change", function () {
    let file = this.files[0];
    if (file) {
      $(this).siblings("label").text(file.name);
    } else {
      $(this).siblings("label").text("Upload");
    }
  });
  $(`#${type}gambar`).trigger("change");
};

// cuman ada "create" sama "edit"
$(function () {
  imageSwitchers("create");
  imageSwitchers("edit");
});

const render = () => {
  $("tbody").html(
    products().map(
      (product) => `
     <tr>
        <td class="action">
          <button class="default edit" data-id="${product?.id}">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td id="img">
          <img
            src="${product?.gambar}"
            alt=""
        />
        </td>
        <td id="kode">${product?.kode}</td>
        <td id="nama">${product?.nama}</td>
        <td id="satuan">${product?.satuan}</td>
        <td id="harga">${new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(product?.harga)}</td>
      </tr>
  `
    )
  );
};

const [id, setId] = state(null);
const [products, setProducts] = state([]);

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const getData = async () => {
  try {
    await fetch("./backend/backend.php")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  } catch (err) {
    console.log(err);
  }
};

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

$(".editForm").on("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());

  console.log(data);
  if (
    data.harga !== "" &&
    data.nama !== "" &&
    data.satuan !== "" &&
    data.kode !== ""
  ) {
    console.log(data);
    if (data.editgambar === "url") {
      try {
        await updateData({
          id: id(),
          gambar: data.imageurl,
          kode: data.kode,
          harga: data.harga,
          satuan: data.satuan,
          nama: data.nama,
        });
        closePromptForce();
        console.log("Berhasil");
      } catch (err) {
        console.log(err);
      }
    } else {
      if (data.imageupload.name !== "") {
        try {
          const base64 = await convertToBase64(data.imageupload);
          await updateData({
            id: id(),
            gambar: base64,
            kode: data.kode,
            harga: data.harga,
            satuan: data.satuan,
            nama: data.nama,
          });
          console.log("Berhasil");
          closePromptForce();
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("File ga boleh kosong");
      }
    }
    setId(null);
  } else {
    console.log("Formnya masih kosong");
  }
});

$(".addForm").on("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());

  console.log(formData.get("nama"));
  if (
    data.harga !== "" &&
    data.nama !== "" &&
    data.satuan !== "" &&
    data.kode !== ""
  ) {
    console.log(data);
    if (data.creategambar === "url") {
      try {
        await postData({
          gambar: data.imageurl,
          kode: data.kode,
          harga: data.harga,
          satuan: data.satuan,
          nama: data.nama,
        });
        console.log("Berhasil");
        closePromptForce();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const base64 = await convertToBase64(data.imageupload);
        await postData({
          gambar: base64,
          kode: data.kode,
          harga: data.harga,
          satuan: data.satuan,
          nama: data.nama,
        });
        console.log("Berhasil");
        closePromptForce();
      } catch (err) {
        console.log(err);
      }
    }
    // closePromptForce();
  } else {
    console.log("Formnya masih kosong");
  }
});

$("#delete").on("click", async function () {
  try {
    await deleteData(id());
    closePromptForce();
    setId(null);
  } catch (err) {
    console.log(err);
  }
});

$(document).on("click", ".edit", function () {
  const selectedId = $(this).data("id");
  setId(selectedId);

  const selectedProduct = products().find(
    (product) => product.id == selectedId
  );

  if (selectedProduct) {
    $("#editkode").val(selectedProduct.kode);
    $("#editnama").val(selectedProduct.nama);
    $("#editsatuan").val(selectedProduct.satuan);
    $("#editharga").val(selectedProduct.harga);
    $("#editimageurl").val(selectedProduct.gambar);
  }

  $(".prompt-frame").addClass("active");
  $("#editPrompt").addClass("active");
});

getData();
