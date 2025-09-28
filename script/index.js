import {
  promptHandler,
  closePromptForce,
  imageSwitchers,
  satuanSwitchers,
  realTimeHarga,
  formValidation,
} from "./modules/promptControl.js";
import {
  convertNumber,
  convertToBase64,
  pushNotification,
} from "./modules/utils.js";
import {
  getData,
  deleteData,
  postData,
  updateData,
} from "./modules/CRUDFunction.js";

// port useState
const state = (initial) => {
  let value = typeof initial === "function" ? initial() : initial;
  const get = () => value;
  const set = (newValue) => {
    value = newValue;
    render();
  };
  return [get, set];
};

// function close propmt
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

// cuman ada "create" sama "edit"
$(function () {
  imageSwitchers("create");
  imageSwitchers("edit");
  satuanSwitchers("create");
  satuanSwitchers("edit");
  realTimeHarga("create");
  realTimeHarga("edit");
});

// render function
export const render = () => {
  $("tbody").html(
    products().map(
      // template
      (product) => `
     <tr>
        <td class="action">
          <button class="default edit" data-id="${product?.id}">
            <i class="fa-solid fa-pen-to-square fa-lg"></i>
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

// Handling
export const createDataHandler = async (data) => {
  console.log("data created: ", data);
  if (data.creategambar === "url") {
    try {
      await postData(
        {
          gambar: data.imageurl,
          kode: data.kode,
          harga: parseInt(data.harga.replace(/\D/g, ""), 10) || 0,
          satuan: data.satuan,
          nama: data.nama,
        },
        setProducts
      );
      closePromptForce();
      pushNotification("Data berhasil ditambah!", "primary");
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const base64 = await convertToBase64(data.imageupload);
      await postData(
        {
          gambar: base64,
          kode: data.kode,
          harga: parseInt(data.harga.replace(/\D/g, ""), 10) || 0,
          satuan: data.satuan,
          nama: data.nama,
        },
        setProducts
      );
      closePromptForce();
      pushNotification("Data berhasil ditambah!", "primary");
    } catch (err) {
      console.error(err);
    }
  }
};

export const editDataHandler = async (data) => {
  console.log("data edited: ", data);
  if (data.editgambar === "url") {
    try {
      await updateData(
        {
          id: id(),
          gambar: data.imageurl,
          kode: data.kode,
          harga: parseInt(data.harga.replace(/\D/g, ""), 10) || 0,
          satuan: data.satuan,
          nama: data.nama,
        },
        setProducts
      );
      closePromptForce();
      pushNotification("Data berhasil diedit!", "primary");
    } catch (err) {
      console.log(err);
    }
  } else {
    if (data.imageupload.name !== "") {
      try {
        const base64 = await convertToBase64(data.imageupload);
        await updateData(
          {
            id: id(),
            gambar: base64,
            kode: data.kode,
            harga: parseInt(data.harga.replace(/\D/g, ""), 10) || 0,
            satuan: data.satuan,
            nama: data.nama,
          },
          setProducts
        );
        closePromptForce();
        pushNotification("Data berhasil diedit!", "primary");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("File ga boleh kosong");
    }
  }
  setId(null);
};

// create form
$(".createForm").on("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());
  formValidation(data, "create");
});

// edit form
$(".editForm").on("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());
  formValidation(data, "edit");
});

// delete
$("#delete").on("click", async function () {
  try {
    await deleteData(id(), setProducts);
    closePromptForce();
    pushNotification("Data berhasil dihapus!", "error");
    setId(null);
  } catch (err) {
    console.log(err);
  }
});

// reload data
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
    $("#editharga").val(convertNumber(selectedProduct.harga));
    $("#editimageurl").val(selectedProduct.gambar);
  }

  $(".prompt-frame").addClass("active");
  $("#editPrompt").addClass("active");
});

// edit initializing
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

getData(setProducts);
