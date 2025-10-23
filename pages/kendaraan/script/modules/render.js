import { item, searchKeyword, filterType, suffix } from "../index.js";

export const pageLimit = (length, max = 10) => {
  return Math.ceil(length / max);
};

export function filterProducts(item, keyword = "", type, suffix) {
  const search = keyword.toLowerCase().trim();

  const searched = item.filter(
    (i) =>
      i?.jeniskendaraan?.toLowerCase().includes(search) ||
      i?.kapasitas?.toLowerCase().includes(search) ||
      i?.kontakdriver?.toLowerCase().includes(search) ||
      i?.namadriver?.toLowerCase().includes(search) ||
      i?.namakendaraan?.toLowerCase().includes(search) ||
      i?.nopol?.toLowerCase().includes(search) ||
      i?.tahun?.toLowerCase().includes(search)
  );

  if (type === "jeniskendaraan") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.jeniskendaraan.localeCompare(b.jeniskendaraan)
        : b.jeniskendaraan.localeCompare(a.jeniskendaraan)
    );
  }

  if (type === "kapasitas") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.kapasitas.localeCompare(b.kapasitas)
        : b.kapasitas.localeCompare(a.kapasitas)
    );
  }

  if (type === "kontakdriver") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.kontakdriver.localeCompare(b.kontakdriver)
        : b.kontakdriver.localeCompare(a.kontakdriver)
    );
  }

  if (type === "namadriver") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.namadriver.localeCompare(b.namadriver)
        : b.namadriver.localeCompare(a.namadriver)
    );
  }

  if (type === "namakendaraan") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.namakendaraan.localeCompare(b.namakendaraan)
        : b.namakendaraan.localeCompare(a.namakendaraan)
    );
  }

  if (type === "nopol") {
    return searched.sort((a, b) =>
      suffix === "highest"
        ? a.nopol.localeCompare(b.nopol)
        : b.nopol.localeCompare(a.nopol)
    );
  }

  if (type === "tahun") {
    return searched.sort((a, b) => {
      const dateA = new Date(a.tahun);
      const dateB = new Date(b.tahun);
      return suffix === "highest" ? dateB - dateA : dateA - dateB;
    });
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-pencil-icon lucide-pencil no-bg"
                  >
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                      class="no-bg"
                    />
                    <path d="m15 5 4 4" class="no-bg" />
                  </svg>
                </button>
              </td>
              <td>${i?.nopol}</td>
              <td>${i?.namakendaraan}</td>
              <td>${i?.jeniskendaraan}</td>
              <td>${i?.tahun}</td>
              <td>${i?.kapasitas}</td>
              <td>${i?.namadriver}</td>
              <td>${i?.kontakdriver}</td>
            </tr>
      `
        )
      );
};
