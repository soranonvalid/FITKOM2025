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

  // jeniskendaraan (teks, wajib)
  if (!data.jeniskendaraan || !data.jeniskendaraan.toString().trim()) {
    error.status = true;
    error.message = "Jenis kendaraan tidak boleh kosong";

    $(`#${type}Form #input-${type}-jeniskendaraan`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    $(`#${type}Form #input-${type}-jeniskendaraan`).removeClass("error");
  }

  // kapasitas (angka, plain number)
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

  // kontakdriver (angka, plain number, 7-15 digit)
  const kontakDriverDigits = (data.kontakdriver || "")
    .toString()
    .replace(/\D/g, "");
  if (!kontakDriverDigits) {
    error.status = true;
    error.message = "Kontak driver tidak boleh kosong";

    $(`#${type}Form #input-${type}-kontakdriver`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    if (kontakDriverDigits.length < 7 || kontakDriverDigits.length > 15) {
      error.status = true;
      error.message = "Kontak driver tidak valid (7-15 digit)";

      $(`#${type}Form #input-${type}-kontakdriver`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      $(`#${type}Form #input-${type}-kontakdriver`).removeClass("error");
    }
  }

  // namadriver (teks, wajib, max 200)
  if (!data.namadriver || !data.namadriver.toString().trim()) {
    error.status = true;
    error.message = "Nama driver tidak boleh kosong";

    $(`#${type}Form #input-${type}-namadriver`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    const namaDriver = data.namadriver.toString().trim();
    if (namaDriver.length > 200) {
      error.status = true;
      error.message = "Nama driver terlalu panjang (maks 200 karakter)";

      $(`#${type}Form #input-${type}-namadriver`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      $(`#${type}Form #input-${type}-namadriver`).removeClass("error");
    }
  }

  // namakendaraan (teks, wajib, max 250)
  if (!data.namakendaraan || !data.namakendaraan.toString().trim()) {
    error.status = true;
    error.message = "Nama kendaraan tidak boleh kosong";

    $(`#${type}Form #input-${type}-namakendaraan`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    const namaKend = data.namakendaraan.toString().trim();
    if (namaKend.length > 250) {
      error.status = true;
      error.message = "Nama kendaraan terlalu panjang (maks 250 karakter)";

      $(`#${type}Form #input-${type}-namakendaraan`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      $(`#${type}Form #input-${type}-namakendaraan`).removeClass("error");
    }
  }

  // nopol (teks, wajib, simple pattern)
  if (!data.nopol || !data.nopol.toString().trim()) {
    error.status = true;
    error.message = "No. polisi tidak boleh kosong";

    $(`#${type}Form #input-${type}-nopol`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    const nopol = data.nopol.toString().trim();
    // pola sederhana: huruf/angka/spasi/dash, max 15
    if (!/^[A-Za-z0-9\s-]{1,15}$/.test(nopol)) {
      error.status = true;
      error.message = "No. polisi tidak valid";

      $(`#${type}Form #input-${type}-nopol`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      $(`#${type}Form #input-${type}-nopol`).removeClass("error");
    }
  }

  // tahun (tanggal dalam format YYYY-MM-DD, tahun wajar 1900..current year)
  if (!data.tahun || !data.tahun.toString().trim()) {
    error.status = true;
    error.message = "Tahun tidak boleh kosong";

    $(`#${type}Form #input-${type}-tahun`).addClass("error");
    setError(`${type}`, error.message);
  } else {
    const t = data.tahun.toString().trim();
    // cek format ISO pendek
    const match = t.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      error.status = true;
      error.message = "Tahun harus dalam format YYYY-MM-DD";

      $(`#${type}Form #input-${type}-tahun`).addClass("error");
      setError(`${type}`, error.message);
    } else {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);
      const dateObj = new Date(year, month - 1, day);

      const currentYear = 2025; // sesuai konteks saat ini
      if (
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() + 1 !== month ||
        dateObj.getDate() !== day ||
        year < 1900 ||
        year > currentYear
      ) {
        error.status = true;
        error.message = "Tahun tidak valid";

        $(`#${type}Form #input-${type}-tahun`).addClass("error");
        setError(`${type}`, error.message);
      } else {
        $(`#${type}Form #input-${type}-tahun`).removeClass("error");
      }
    }
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
        jeniskendaraan: data.jeniskendaraan,
        kapasitas: data.kapasitas,
        kontakdriver: data.kontakdriver,
        namadriver: data.namadriver,
        namakendaraan: data.namakendaraan,
        nopol: data.nopol,
        tahun: data.tahun,
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
        jeniskendaraan: data.jeniskendaraan,
        kapasitas: data.kapasitas,
        kontakdriver: data.kontakdriver,
        namadriver: data.namadriver,
        namakendaraan: data.namakendaraan,
        nopol: data.nopol,
        tahun: data.tahun,
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
