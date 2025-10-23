import { filterProducts, render, renderPaginationButton } from "./render.js";
import {
  products,
  setIndexPage,
  indexPage,
  filterType,
  setFilterType,
  suffix,
  setSuffix,
  setFilteredProducts,
  searchKeyword,
} from "../index.js";

// convert number
const convertNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

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

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function pushNotification(message, type) {
  const $notification = $(
    `
      <div class="notification">
      <p>${message}</p>
      <div class="ribbon ${type}"></div>
    `
  );

  $("#toast").append($notification);
  setTimeout(() => {
    $notification.addClass("timeout");
    setTimeout(() => {
      $notification.remove();
    }, 400);
  }, 2000);
  console.log("notif accepted", message);
}

let filterIndex = -1;

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

export {
  state,
  convertNumber,
  convertToBase64,
  pushNotification,
  filterListener,
};
