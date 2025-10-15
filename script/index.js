import {
  promptHandler,
  closePromptForce,
  imageSwitchers,
  satuanSwitchers,
  realTimeHarga,
  formValidation,
  validationField,
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

// quick validate
$(".validate").on("input change", function () {
  const type = $(this).hasClass("create")
    ? "create"
    : $(this).hasClass("edit")
    ? "edit"
    : null;
  validationField(this);
});

// render function
export const render = () => {
  $("tbody").html(
    products().map(
      // template
      (product) => `
      <tr>
        <td class="action">
          <button class="default edit no-bg" data-id="${product?.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil no-bg  "><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" class="no-bg"/><path d="m15 5 4 4" class="no-bg"/></svg>
          </button>
        </td>
        <td id="kode">
          <p class="no-bg">${product?.kode}</p>
        </td>
        <td id="nama">
          <div>
            <img
              src="${product?.gambar}"
              alt="sayur"
              class="img-render"
            />
            <p class="no-bg">${product?.nama}</p>
          </div>
        </td>
        <td id="satuan">
          <p class="no-bg">${product?.satuan}</p>
        </td>
        <td id="harga">
          <p class="no-bg">${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(product?.harga)}</p>
        </td>
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
  const $btn = $(".simpan-edit-btn");
  $btn.attr("disabled", "disabled");
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
  // $btn.removeAttr("disabled", false);
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

// reload data for edit
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

getData(setProducts);
