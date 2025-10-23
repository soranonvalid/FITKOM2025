import { products, searchKeyword, filterType, suffix } from "../index.js";

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
export const render = () => {
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
        filtered.map(
          (product) => `   
        <tr>
            <td class="action">
            <button class="default edit no-bg" data-id="${product?.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil no-bg  "><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" class="no-bg"/><path d="m15 5 4 4" class="no-bg"/></svg>
            </button>
            </td>
            <td id="kode">
                <p class="no-bg">${product?.kodeproduk}</p>
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
