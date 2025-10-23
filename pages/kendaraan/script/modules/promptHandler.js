import { pushNotification } from "./utils.js";
import { postData, updateData } from "./api.js";
import { id, setId, setItem, item } from "../index.js";

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
const realTimeKapasitas = (type) => {
  $(`#${type}kapasitas`).on("input", function () {
    let val = $(this).val().replace(/\D/g, "");
    $(this).val(val);
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

  // kontak
  if (!data.kontak || !data.kontak.toString().trim()) {
    error.status = true;
    error.message = "kontak tidak boleh kosong";

    $(`#${type}Form #input-${type}-kontak`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-kontak`).removeClass("error");
  }

  // kapasitas
  const kapasitas = parseInt(
    (data.kapasitas || "").toString().replace(/\D/g, ""),
    10
  );
  if (!kapasitas && kapasitas !== 0) {
    error.status = true;
    error.message = "Kapasitas tidak boleh kosong";

    $(`#${type}Form #input-${type}-kapasitas`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    const bigKapasitas = BigInt(kapasitas);

    if (bigKapasitas < 1n || bigKapasitas > 99999999999999n) {
      error.status = true;
      error.message = "Kapasitas tidak valid";

      $(`#${type}Form #input-${type}-kapasitas`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      $(`#${type}Form #input-${type}-kapasitas`).removeClass("error");
    }
  }

  // alamat
  if (!data.alamat || !data.alamat.toString().trim()) {
    error.status = true;
    error.message = "Alamat tidak boleh kosong";

    $(`#${type}Form #input-${type}-alamat`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-alamat`).removeClass("error");
  }

  // namagudang
  if (!data.namagudang || !data.namagudang.toString().trim()) {
    error.status = true;
    error.message = "Gudang tidak boleh kosong";

    $(`#${type}Form #input-${type}-namagudang`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-namagudang`).removeClass("error");
  }

  // kodegudang
  if (!data.kodegudang || !data.kodegudang.toString().trim()) {
    error.status = true;
    error.message = "Kode gudang tidak boleh kosong";

    $(`#${type}Form #input-${type}-kodegudang`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-kodegudang`).removeClass("error");
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
  try {
    await postData(
      {
        kodegudang: data.kodegudang,
        namagudang: data.namagudang,
        alamat: data.alamat,
        kapasitas: data.kapasitas,
        kontak: data.kontak,
      },
      setItem
    );
    closePromptForce();
    pushNotification("Data berhasil ditambah!", "primary");
  } catch (err) {
    console.error(err);
  }
};

const editDataHandler = async (data) => {
  console.log("data edited: ", data);
  const $btn = $(".simpan-edit-btn");
  $btn.attr("disabled", "disabled");
  try {
    await updateData(
      {
        id: id(),
        kodegudang: data.kodegudang,
        namagudang: data.namagudang,
        alamat: data.alamat,
        kapasitas: data.kapasitas,
        kontak: data.kontak,
      },
      setItem
    );
    closePromptForce();
    pushNotification("Data berhasil diedit!", "primary");
  } catch (err) {
    console.log(err);
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
  realTimeKapasitas,
  formValidation,
  validationField,
};
