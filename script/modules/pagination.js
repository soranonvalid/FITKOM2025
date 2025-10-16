const preLoadCalculations = () => {
  setArray(products());
  console.log("products length:", products().length);
  setArrayLength(array().length);
  setMaxIndex(Math.ceil(array().length / tableSize()));
  console.log(
    "maxIndex after set:",
    Math.ceil(products().length / tableSize())
  );
};

const updatePagination = (newPage) => {
  if (newPage < 1) newPage = 1;
  if (newPage > maxIndex()) newPage = maxIndex();

  setTableCurrentIndex(newPage);
  setStartIndex((newPage - 1) * tableSize() + 1);
  let newEnd = newPage * tableSize();
  if (newEnd > arrayLength()) newEnd = arrayLength();
  setEndIndex(newEnd);

  render(searchKeyword(), harga());
  highlightIndexButton();
};

const next = () => {
  updatePagination(tableCurrentIndex() + 1);
};

const previous = () => {
  updatePagination(tableCurrentIndex() - 1);
};

const indexPagination = (pageNum) => {
  updatePagination(pageNum);
};

const displayIndexButtons = () => {
  preLoadCalculations();

  $(".index_buttons").empty();

  $(".index_buttons").append(
    $("<button>").text("Previous").on("click", previous)
  );

  for (let i = 1; i <= maxIndex(); i++) {
    $(".index_buttons").append(
      $("<button>")
        .text(i)
        .attr("index", i)
        .on("click", () => indexPagination(i))
    );
  }

  $(".index_buttons").append($("<button>").text("Next").on("click", next));

  highlightIndexButton();
};

const highlightIndexButton = () => {
  $(".footer-span").text(
    `Showing ${startIndex()} to ${endIndex()} of ${arrayLength()} entries`
  );

  $(".index_buttons button").removeClass("active");
  $(`.index_buttons button[index="${tableCurrentIndex()}"]`).addClass("active");
};