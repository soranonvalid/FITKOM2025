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
import { getData, deleteData } from "../../../script/modules/api.js";
import { render, filterProducts } from "./modules/render.js";

// base
export const [id, setId] = state(null);
export const [item, setItem] = state([]);

// filter & search
export const [searchKeyword, setSearchKeyword] = state("");
export const [filterType, setFilterType] = state(null);
export const [suffix, setSuffix] = state(null);
export const [filteredProducts, setFilteredProducts] = state(item());

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
    item(),
    searchKeyword(),
    filterType(),
    suffix()
  );
  setFilteredProducts(filtered);
  render();
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
    const filtered = filterProducts(
      item(),
      searchKeyword(),
      filterType(),
      suffix()
    );
    await deleteData(id(), setItem);
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

  const selectedProduct = item().find((product) => product.id == selectedId);

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

getData(async (data) => {
  setItem(data);
  const filtered = filterProducts(
    item(),
    searchKeyword(),
    filterType(),
    suffix()
  );
  setFilteredProducts(filtered);
  getData(async (data) => {
    const item = await data;
    for (let i = 0; i < item.length; i++) {
      $(".gudang").append(
        $(
          `<option value='${item[i]?.kodegudang}' name='createFormSelect'>${item[i]?.namagudang}</option>`
        )
      );
    }
  }, "?type=gudang");
  render();
}, "?type=gudang");
