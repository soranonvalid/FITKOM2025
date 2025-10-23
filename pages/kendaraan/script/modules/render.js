import { item, searchKeyword, filterType, suffix } from "../index.js";

export const pageLimit = (length, max = 10) => {
  return Math.ceil(length / max);
};

export function filterProducts(item, keyword = "", type, suffix) {
  const search = keyword.toLowerCase().trim();

  const searched = item.filter(
    (i) =>
      i?.kodegudang?.toLowerCase().includes(search) ||
      i?.namagudang?.toLowerCase().includes(search) ||
      i?.alamat?.toLowerCase().includes(search) ||
      i?.kontak?.toLowerCase().includes(search) ||
      i?.kapasitas?.toString().includes(search)
  );

  if (type === "kodegudang") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.kodegudang.localeCompare(b.kodegudang)
        : b.kodegudang.localeCompare(a.kodegudang)
    );
  }

  if (type === "namagudang") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.namagudang.localeCompare(b.namagudang)
        : b.namagudang.localeCompare(a.namagudang)
    );
  }

  if (type === "alamat") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.alamat.localeCompare(b.alamat)
        : b.alamat.localeCompare(a.alamat)
    );
  }

  if (type === "kontak") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.kontak.localeCompare(b.kontak)
        : b.kontak.localeCompare(a.kontak)
    );
  }

  if (type === "kapasitas") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? Number(b.kapasitas) - Number(a.kapasitas)
        : Number(a.kapasitas) - Number(b.kapasitas)
    );
  }

  return searched;
}
export const render = () => {
  const base = item(); // current item
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
          (i) => `   
        <tr>
            <td class="action">
            <button class="default edit no-bg" data-id="${i?.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil no-bg  "><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" class="no-bg"/><path d="m15 5 4 4" class="no-bg"/></svg>
            </button>
            </td>
            <td id="kode">
                <p class="no-bg">${i?.kodegudang}</p>
            </td>
            <td id="nama">
                <div>
                    <p class="no-bg">${i?.namagudang}</p>
                </div>
            </td>
            <td id="gudang">
                <p class="no-bg">${i?.alamat}</p>
            </td>
            <td id="satuan">
                <p class="no-bg">${i?.kapasitas}</p>
            </td>
            <td id="harga">
                <p class="no-bg">${i?.kontak}</p>
            </td>
        </tr>
      `
        )
      );
};
