import {
  promptHandler,
  closePromptForce,
  imageSwitchers,
  satuanSwitchers,
  gudangSwitchers,
  realTimeHarga,
  formValidation,
  validationField,
} from "./modules/promptHandler.js";
import {
  convertNumber,
  pushNotification,
  state,
  filterListener,
} from "./modules/utils.js";
import { getData, deleteData, getDataGudang } from "./modules/api.js";
import {
  render,
  filterProducts,
  renderPaginationButton,
  pageLimit,
  prev_page,
  next_page,
} from "./modules/render.js";

// base
export const [id, setId] = state(null);
export const [products, setProducts] = state([]);

// filter & search
export const [searchKeyword, setSearchKeyword] = state("");
export const [filterType, setFilterType] = state(null);
export const [suffix, setSuffix] = state(null);
export const [filteredProducts, setFilteredProducts] = state(products());

// pagination
export const [indexPage, setIndexPage] = state(1);

// cuman ada "create" sama "edit"
$(function () {
  imageSwitchers("create");
  imageSwitchers("edit");
  satuanSwitchers("create");
  satuanSwitchers("edit");
  gudangSwitchers("create");
  gudangSwitchers("edit");
  realTimeHarga("create");
  realTimeHarga("edit");

  // filter attachment
  filterListener("harga");
  filterListener("satuan");
  filterListener("nama");
  filterListener("kode");
  filterListener("gudang");
  filterListener("golongan");
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

  console.log(selectedProduct);

  if (selectedProduct) {
    $("#editkode").val(selectedProduct.kodeproduk);
    $("#editnama").val(selectedProduct.nama);
    $("#editsatuan").val(selectedProduct.satuan);
    $("#editgudang").val(selectedProduct.kodegudang);
    $("#editharga").val(convertNumber(selectedProduct.harga));
    $("#editimageurl").val(selectedProduct.gambar);
  }

  $(".prompt-frame").addClass("active");
  $("#editPrompt").addClass("active");
});

$(".next-btn").on("click", () => {
  next_page();
});

$(".prev-btn").on("click", () => {
  prev_page();
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
