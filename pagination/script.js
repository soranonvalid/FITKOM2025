const users = [
  {
    kode: "PRD001",
    nama: "Pompa Air Otomatis",
    satuan: "pcs",
    harga: 350000,
  },
  {
    kode: "PRD002",
    nama: "Sensor Kelembapan Tanah",
    satuan: "pcs",
    harga: 120000,
  },
  {
    kode: "PRD003",
    nama: "Pupuk Cair Organik",
    satuan: "liter",
    harga: 45000,
  },
  {
    kode: "PRD004",
    nama: "Benih Tomat Unggul",
    satuan: "kg",
    harga: 80000,
  },
  {
    kode: "PRD005",
    nama: "Pestisida Nabati",
    satuan: "liter",
    harga: 65000,
  },
  {
    kode: "PRD006",
    nama: "Selang Irigasi",
    satuan: "meter",
    harga: 15000,
  },
  {
    kode: "PRD007",
    nama: "Pipa PVC 1 Inch",
    satuan: "meter",
    harga: 12000,
  },
  {
    kode: "PRD008",
    nama: "Kawat Pengikat Tanaman",
    satuan: "roll",
    harga: 30000,
  },
  {
    kode: "PRD009",
    nama: "Mulsa Plastik Hitam Perak",
    satuan: "roll",
    harga: 55000,
  },
  {
    kode: "PRD010",
    nama: "Sprayer Elektrik",
    satuan: "pcs",
    harga: 400000,
  },
  {
    kode: "PRD011",
    nama: "Jaring Peneduh Tanaman",
    satuan: "meter",
    harga: 25000,
  },
  {
    kode: "PRD012",
    nama: "Thermometer Digital Tanah",
    satuan: "pcs",
    harga: 95000,
  },
  {
    kode: "PRD013",
    nama: "Alat Ukur pH Tanah",
    satuan: "pcs",
    harga: 110000,
  },
  {
    kode: "PRD014",
    nama: "Net Pot Hidroponik",
    satuan: "pcs",
    harga: 3000,
  },
  {
    kode: "PRD015",
    nama: "Rockwool Media Tanam",
    satuan: "pak",
    harga: 28000,
  },
  {
    kode: "PRD016",
    nama: "Timer Otomatis Irigasi",
    satuan: "pcs",
    harga: 175000,
  },
  {
    kode: "PRD017",
    nama: "Tangki Air 1000L",
    satuan: "pcs",
    harga: 1250000,
  },
  {
    kode: "PRD018",
    nama: "Lampu Grow LED",
    satuan: "pcs",
    harga: 220000,
  },
  {
    kode: "PRD019",
    nama: "Benih Cabai Rawit Super",
    satuan: "kg",
    harga: 95000,
  },
  //   {
  //     kode: "PRD020",
  //     nama: "Net Cover Anti Serangga",
  //     satuan: "meter",
  //     harga: 20000,
  //   },
];

var array = [];
var array_length = 0;
var table_size = 10;
var start_index = 1;
var end_index = 0;
var current_index = 1;
var max_index = 0;

const preLoadCalculations = () => {
  array = users;
  array_length = array.length;
  max_index = Math.ceil(array.length / table_size);
};

const displayIndexButtons = () => {
  preLoadCalculations();
  $(".index_buttons buttons").remove();
  $(".index_buttons").append("<button onclick='previous();'>Previous</button>");

  for (var i = 1; i <= max_index; i++) {
    $(".index_buttons").append(
      `<button onclick='indexPagination(${i});' index="${i}">${i}</button>`
    );
  }

  $(".index_buttons").append("<button onclick='next();'>Next</button>");
  highlightIndexButton();
};

const highlightIndexButton = () => {
  start_index = (current_index - 1) * table_size + 1;
  end_index = start_index + table_size - 1;
  if (end_index > array_length) {
    end_index = array_length;
  }

  $(".footer-span").text(
    `Showing ${start_index} to ${end_index} of ${array_length} entries`
  );
  $(".index_buttons button").removeClass("active");
  $(`.index_buttons button[index="${current_index}"]`).addClass("active");

  displayTableRows();
};

const displayTableRows = () => {
  $(".table table tbody tr").remove();
  var tab_start = start_index - 1;
  var tab_end = end_index;

  //   for (var i = tab_start; i < tab_end; i++) {
  //     var user = array[i];
  //     var tr = `
  //         <tr>
  //             <td>Edit</td>
  //             <td>${user.kode}</td>
  //             <td>${user.nama}</td>
  //             <td>${user.satuan}</td>
  //             <td>${user.harga}</td>
  //         </tr>
  //     `;
  //     $(".table table tbody").append(tr);
  //   }

  $("tbody").html(
    array.slice(start_index - 1, end_index).map(
      (user) => `
        <tr>
          <td>Edit</td>
          <td>${user.kode}</td>
          <td>${user.nama}</td>
          <td>${user.satuan}</td>
          <td>${user.harga}</td>
        </tr>
    `
    )
  );
};

displayIndexButtons();

const next = () => {
  if (current_index < max_index) {
    current_index++;
    highlightIndexButton();
  }
};

const previous = () => {
  if (current_index > 1) {
    current_index--;
    highlightIndexButton();
  }
};

const indexPagination = (index) => {
  current_index = Number(index);
  highlightIndexButton();
};
