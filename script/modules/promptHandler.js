import { convertNumber, convertToBase64, pushNotification } from "./utils.js";
import { postData, updateData } from "./api.js";
import { id, setId, setProducts } from "../index.js";

// early clear error
const clearError = (type) => {
  $(`#${type}ErrorNote`).text("");
  $(`#${type}ErrorNote`).removeClass("active");
  $(`#${type}Form .input-group`).removeClass("error");
};

// reset form
const resetForm = (selector) => {
  $(selector).find("input, select, textarea").val("");
  $(selector).find("select").prop("selectedIndex", 0);
};

// open prompt
const promptHandler = (type) => {
  $(document).on("click", `.${type}`, function () {
    if ($(".prompt-frame").hasClass("closed")) {
      return;
    } else {
      $(".prompt-frame").addClass("active");
      $(`#${type}Prompt`).addClass("active");
      clearError(type);
      satuanSwitchers(type);
      gudangSwitchers(type);
    }
  });
};

// close prompt forcefully with reset
const closePromptForce = () => {
  $(".prompt-frame").addClass("closed");
  $("#createPrompt").addClass("closed");
  $("#editPrompt").addClass("closed");
  setTimeout(() => {
    $(".prompt-frame").removeClass("active");
    $("#createPrompt").removeClass("active");
    $("#editPrompt").removeClass("active");

    resetForm(".createForm");
    resetForm(".editForm");
    imageSwitchers("create");
    imageSwitchers("edit");
  }, 200);

  setTimeout(() => {
    $(".prompt-frame").removeClass("closed");
    $("#createPrompt").removeClass("closed");
    $("#editPrompt").removeClass("closed");
  }, 400);
};

// Image input switcher
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

const satuanSwitchers = (type) => {
  $(`#${type}satuan`).trigger("change");
  $(`#${type}satuan`).on("change", function () {
    if ($(this).val() === null || $(this).val() === "") {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
  });
};

const gudangSwitchers = (type) => {
  $(`#${type}gudang`).trigger("change");
  $(`#${type}gudang`).on("change", function () {
    if ($(this).val() === null || $(this).val() === "") {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
  });
};

// convert number in real time
const realTimeHarga = (type) => {
  $(`#${type}harga`).on("input", function () {
    let val = $(this).val().replace(/\D/g, "");
    let num = parseInt(val, 10) || 0;
    $(this).val(convertNumber(num));
  });
};

const validateCheck = (data, type) => {
  let error = {
    status: false,
    message: "",
  };
  const setError = (type, message) => {
    $(`#${type}ErrorNote`).text(message);
  };

  // gambar
  if (data[`${type}gambar`] === "upload") {
    if (!data.imageupload || data.imageupload.name === "") {
      error.status = true;
      error.message = "Gambar tidak boleh kosong";

      $(`#${type}Form #input-${type}-gambar`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      $(`#${type}Form #input-${type}-gambar`).removeClass("error");
    }
  } else if (data[`${type}gambar`] === "url") {
    if (!data.imageurl || data.imageurl.trim() === "") {
      error.status = true;
      error.message = "Gambar tidak boleh kosong";

      $(`#${type}Form #input-${type}-gambar`).addClass("error");
      setError(`${type}`, error.message);
    } else if (data[`${type}gambar`] === "url") {
      if (!data.imageurl || data.imageurl.trim() === "") {
        error.status = true;
        error.message = "Gambar tidak boleh kosong";

        $(`#${type}Form #input-${type}-gambar`).addClass("error");
        setError(type, error.message);
      } else if (
        !/^https?:\/\/[^\s]+$/i.test(data.imageurl.trim()) &&
        !/^data:image\/(png|jpeg|jpg|gif|webp);base64,/i.test(
          data.imageurl.trim()
        )
      ) {
        if (type === "edit") {
          $(`#${type}Form #input-${type}-gambar`).removeClass("error");
        } else {
          error.status = true;
          error.message = "URL gambar tidak valid";

          $(`#${type}Form #input-${type}-gambar`).addClass("error");
          setError(type, error.message);
        }
      }
    }
  } else {
    error.status = true;
    error.message = "Gambar tidak boleh kosong";

    $(`#${type}Form #input-${type}-gambar`).addClass("error");
    setError(`${type}`, error.message);
  }

  // harga
  const harga = parseInt(data.harga.replace(/\D/g, ""), 10);
  if (!harga) {
    error.status = true;
    error.message = "Harga tidak boleh kosong";

    $(`#${type}Form #input-${type}-harga`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    const bigHarga = BigInt(harga);

    if (bigHarga < 1n || bigHarga > 99999999999999) {
      error.status = true;
      error.message = "Harga tidak valid";

      $(`#${type}Form #input-${type}-harga`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      $(`#${type}Form #input-${type}-harga`).removeClass("error");
    }
  }

  // gudang
  if (!data.satuan) {
    error.status = true;
    error.message = "gudang tidak boleh kosong";

    $(`#${type}Form #input-${type}-gudang`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-gudang`).removeClass("error");
  }

  // satuan
  if (!data.satuan) {
    error.status = true;
    error.message = "Satuan tidak boleh kosong";

    $(`#${type}Form #input-${type}-satuan`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-satuan`).removeClass("error");
  }

  // nama
  if (!data.nama || data.nama.trim() === "") {
    error.status = true;
    error.message = "nama tidak boleh kosong";

    $(`#${type}Form #input-${type}-nama`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-nama`).removeClass("error");
  }

  // kode
  if (!data.kode || data.kode.trim() === "") {
    error.status = true;
    error.message = "kode tidak boleh kosong";

    $(`#${type}Form #input-${type}-kode`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-kode`).removeClass("error");
  }

  return error;
};

const formValidation = (data, type) => {
  console.log(data);
  let check = validateCheck(data, type);

  if (check.status === false) {
    type === "create"
      ? createDataHandler(data)
      : type === "edit"
      ? editDataHandler(data)
      : null;

    $(`#${type}ErrorNote`).removeClass("active");
  } else {
    console.error("failed to create data", check, data);
    $(`#${type}ErrorNote`).addClass("active");
  }
};

const validationField = (field) => {
  if ($(field).val() === "") {
  } else {
    $(field).parent().removeClass("error");
  }
};

// Handling
const createDataHandler = async (data) => {
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
          kodegudang: data.kodegudang,
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
          kodegudang: data.kodegudang,
        },
        setProducts
      );
      closePromptForce();
      pushNotification("Data berhasil ditambah!", "primary");
    } catch (err) {
      console.error(err);
    }
  }
  renderPaginationButton();
};

const editDataHandler = async (data) => {
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
          kodegudang: data.kodegudang,
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
            kodegudang: data.kodegudang,
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

export {
  promptHandler,
  closePromptForce,
  clearError,
  resetForm,
  imageSwitchers,
  gudangSwitchers,
  satuanSwitchers,
  realTimeHarga,
  formValidation,
  validationField,
};
