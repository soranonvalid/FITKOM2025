import {
  products,
  searchKeyword,
  filterType,
  suffix,
  indexPage,
  setIndexPage,
} from "../index.js";

export const pageLimit = (length, max = 10) => {
  return Math.ceil(length / max);
};

export function filterProducts(products, keyword = "", type, suffix) {
  const search = keyword.toLowerCase().trim();
  const searched = products.filter(
    (product) =>
      product.nama.toLowerCase().includes(search) ||
      product.kode.toLowerCase().includes(search) ||
      product.harga.toString().includes(search) ||
      product.satuan.toLowerCase().includes(search) ||
      product.namagudang.toLowerCase().includes(search) ||
      product.golongan.toLowerCase().includes(search)
  );

  if (type === "harga") {
    return searched.sort((a, b) => {
      if (suffix === "highest") return b.harga - a.harga;
      if (suffix === "lowest") return a.harga - b.harga;
      return 0;
    });
  } else if (type === "nama") {
    return searched.sort((a, b) => {
      if (suffix === "highest") return a.nama.localeCompare(b.nama);
      if (suffix === "lowest") return b.nama.localeCompare(a.nama);
      return 0;
    });
  } else if (type === "kode") {
    return searched.sort((a, b) => {
      if (suffix === "highest") return a.kode.localeCompare(b.kode);
      if (suffix === "lowest") return b.kode.localeCompare(a.kode);
      return 0;
    });
  } else if (type === "satuan") {
    return searched.sort((a, b) => {
      if (suffix === "highest") return a.satuan.localeCompare(b.satuan);
      if (suffix === "lowest") return b.satuan.localeCompare(a.satuan);
      return 0;
    });
  } else if (type === "gudang") {
    return searched.sort((a, b) => {
      if (suffix === "highest") return a.namagudang.localeCompare(b.namagudang);
      if (suffix === "lowest") return b.namagudang.localeCompare(a.namagudang);
      return 0;
    });
  } else if (type === "golongan") {
    return searched.sort((a, b) => {
      if (suffix === "highest") return a.golongan.localeCompare(b.golongan);
      if (suffix === "lowest") return b.golongan.localeCompare(a.golongan);
      return 0;
    });
  } else {
    return searched;
  }
}

export const renderPaginationButton = (
  filteredData,
  setIndexPage,
  indexPage = 1,
  max = 10
) => {
  const totalPages = pageLimit(filteredData.length, max);
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  const loadedRow = filteredData.slice(
    (indexPage - 1) * max,
    indexPage * max
  ).length;
  const renderedArray = {
    prev: indexPage === 1 ? null : indexPage - 1,
    backward:
      indexPage === pagesArray.at(-1)
        ? indexPage - 2 < 0
          ? null
          : indexPage - 2
        : null,
    next: indexPage === pagesArray.at(-1) ? null : indexPage + 1,
    forward:
      indexPage === 1 ? (pagesArray.length >= 3 ? indexPage + 2 : null) : null,
  };

  $(".pagination-lists").empty();
  $("#footer-span").html(
    `Showing ${indexPage === 1 ? "1" : indexPage * 10 + 1 - 10} - ${
      indexPage === 1 ? "10" : indexPage * 10 + loadedRow - 10
    } from ${filteredData.length}`
  );

  if (totalPages > 0) {
    // backward
    if (renderedArray.backward !== null && renderedArray.backward > 0) {
      $(`<p data-id="${renderedArray.backward}">${renderedArray.backward}</p>`)
        .appendTo(".pagination-lists")
        .on("click", () => {
          setIndexPage(renderedArray.backward);
          renderPaginationButton(
            filteredData,
            setIndexPage,
            indexPage - 2,
            max
          );
        });
    }
    // previous
    if (renderedArray.prev !== null && renderedArray.prev > 0) {
      $(`<p data-id="${renderedArray.prev}">${renderedArray.prev}</p>`)
        .appendTo(".pagination-lists")
        .on("click", () => {
          setIndexPage(renderedArray.prev);
          renderPaginationButton(
            filteredData,
            setIndexPage,
            indexPage - 1,
            max
          );
        });
    }
    // selected pages
    $(".pagination-lists").append(
      `<p class="active" data-id="${indexPage}">${indexPage}</p>`
    );

    // next
    if (renderedArray.next !== null && renderedArray.next > 0) {
      $(`<p data-id="${renderedArray.next}">${renderedArray.next}</p>`)
        .appendTo(".pagination-lists")
        .on("click", () => {
          setIndexPage(renderedArray.next);
          renderPaginationButton(
            filteredData,
            setIndexPage,
            indexPage + 1,
            max
          );
        });
    }

    // forward
    if (renderedArray.forward !== null && renderedArray.forward > 0) {
      $(`<p data-id="${renderedArray.forward}">${renderedArray.forward}</p>`)
        .appendTo(".pagination-lists")
        .on("click", () => {
          setIndexPage(renderedArray.forward);
          renderPaginationButton(
            filteredData,
            setIndexPage,
            indexPage + 2,
            max
          );
        });
    }
    // skip to last
    if (
      indexPage < pagesArray.at(-1) &&
      pagesArray.at(-1) !== renderedArray.next &&
      pagesArray.at(-1) !== renderedArray.forward
    ) {
      $(".pagination-lists").append("<p>...</p>");
      $(`<p data-id="${pagesArray.at(-1)}">${pagesArray.at(-1)}</p>`)
        .appendTo(".pagination-lists")
        .on("click", () => {
          setIndexPage(pagesArray.at(-1));
          renderPaginationButton(
            filteredData,
            setIndexPage,
            pagesArray.at(-1),
            max
          );
        });
    }
  } else {
    // empty
    $(".pagination-lists").append(`<p class="active">1</p>`);
  }
};

export const prev_page = () => {
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
};

export const next_page = () => {
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
};

export const render = (max_index = 10, page = indexPage()) => {
  const base = products(); // current products
  const filtered = filterProducts(
    base,
    searchKeyword(),
    filterType(),
    suffix()
  );
  filtered.length <= 0
    ? $("tbody").html(
        "<tr class='invalid'><td colspan='7'><p>data tidak ditemukan...</p></td></tr>"
      )
    : $("tbody").html(
        filtered.slice((page - 1) * max_index, page * max_index).map(
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
            <td class="gambar" id="gambar">                    
            <img src="${product?.gambar}" alt="sayur" class="img-render" /></td>
            <td id="nama">
                <div>
                    <p class="no-bg">${product?.nama}</p>
                </div>
            </td>
            <td id="gudang">
                <p class="no-bg">${product?.namagudang}</p>
            </td>
            <td id="golongan">
                <p class="no-bg">${product?.golongan}</p>
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
