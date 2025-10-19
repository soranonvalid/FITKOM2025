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
  getDataGudang,
} from "./modules/CRUDFunction.js";
import {
  render,
  filterProducts,
  renderPaginationButton,
  pageLimit,
} from "./modules/render.js";

// port useState
const state = (initial) => {
  let value = typeof initial === "function" ? initial() : initial;
  const get = () => value;
  const set = (newValue) => {
    value = newValue;
    render();
    renderPaginationButton(products(), setIndexPage, indexPage(), 10);
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

let filterIndex = -1;

// cuman ada "create" sama "edit"
$(function () {
  imageSwitchers("create");
  imageSwitchers("edit");
  satuanSwitchers("create");
  satuanSwitchers("edit");
  realTimeHarga("create");
  realTimeHarga("edit");

  // filter attachment
  filterListener("harga");
  filterListener("satuan");
  filterListener("nama");
  filterListener("kode");
});

const filterListener = (type) => {
  $(`#filter-${type}`).on("click", () => {
    if (filterType() != type) {
      setFilterType(type);
      filterIndex = -1;
      $(`.filter-inquire .label-toggle`).html(
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>'
      );
    }

    filterIndex++;

    if (filterIndex > 1) {
      filterIndex = -1;
    }

    if (filterIndex === 1) {
      setSuffix("lowest");
      $(`#filter-${type} .label-toggle`).html(
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>'
      );
    } else if (filterIndex === 0) {
      setSuffix("highest");
      $(`#filter-${type} .label-toggle`).html(
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>'
      );
    } else if (filterIndex === -1) {
      setSuffix(null);
      $(`#filter-${type} .label-toggle`).html(
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>'
      );
    }

    console.log("index ke", filterIndex, suffix(), filterType());

    const filtered = filterProducts(
      products(),
      searchKeyword(),
      filterType(),
      suffix()
    );
    setFilteredProducts(filtered);
    setIndexPage(1);
    render();
    renderPaginationButton(filtered, setIndexPage, indexPage(), 10);
  });
};

// quick validate
$(".validate").on("input change", function () {
  const type = $(this).hasClass("create")
    ? "create"
    : $(this).hasClass("edit")
    ? "edit"
    : null;
  validationField(this);
});

$(".pencarian").on("input", (e) => {
  const keyword = e.target.value;
  setSearchKeyword(keyword);
  const filtered = filterProducts(
    products(),
    searchKeyword(),
    filterType(),
    suffix()
  );
  setFilteredProducts(filtered);
  setIndexPage(1);
  render();
  renderPaginationButton(filtered, setIndexPage, indexPage(), 10);
});

// render function

// base
const [id, setId] = state(null);
export const [products, setProducts] = state([]);

// filter & search
export const [searchKeyword, setSearchKeyword] = state("");
export const [filterType, setFilterType] = state(null);
export const [suffix, setSuffix] = state(null);
export const [filteredProducts, setFilteredProducts] = state(products());

// pagination
export const [indexPage, setIndexPage] = state(1);

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
  renderPaginationButton(fil);
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
    setIndexPage(1);
    const filtered = filterProducts(
      products(),
      searchKeyword(),
      filterType(),
      suffix()
    );
    renderPaginationButton(filtered, setIndexPage, indexPage(), 10);
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

$(".next-btn").on("click", () => {
  const filtered = filterProducts(
    products(),
    searchKeyword(),
    filterType(),
    suffix()
  );

  if (indexPage() >= pageLimit(filtered.length, 10)) {
    return;
  }

  const target = indexPage() + 1;
  setIndexPage(target);
  renderPaginationButton(filtered, setIndexPage, indexPage(), 10);
});

$(".prev-btn").on("click", () => {
  if (indexPage() <= 1) {
    return;
  }
  const filtered = filterProducts(
    products(),
    searchKeyword(),
    filterType(),
    suffix()
  );

  setIndexPage(indexPage() - 1);
  renderPaginationButton(filtered, setIndexPage, indexPage(), 10);
});

getData(async (data) => {
  const produk = await data;
  setProducts(produk);
  const filtered = filterProducts(
    products(),
    searchKeyword(),
    filterType(),
    suffix()
  );
  setFilteredProducts(filtered);
  getDataGudang(async (data) => {
    const gudang = await data;
    for (let i = 0; i < gudang.length; i++) {
      $(".gudang").append(
        $(
          `<option value='${gudang[i]?.kodegudang}' name='createFormSelect'>${gudang[i]?.namagudang}</option>`
        )
      );
    }
  });
  render();
  renderPaginationButton(filtered, setIndexPage, indexPage(), 10);
});
