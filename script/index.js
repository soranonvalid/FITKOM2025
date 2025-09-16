$("#create").on("click", function () {
  $(".prompt-frame").addClass("active");
  $("#createPrompt").addClass("active");
  $("#editPrompt").removeClass("active");
});

$("#edit").on("click", function () {
  $(".prompt-frame").addClass("active");
  $("#editPrompt").addClass("active");
  $("#createPrompt").removeClass("active");
});

$(".close").on("click", function () {
  $(".prompt-frame").removeClass("active");
  $("#createPrompt").removeClass("active");
  $("#editPrompt").removeClass("active");
});

$(".prompt-frame").on("click", function (e) {
  {
    if (e.target === this) {
      $(".prompt-frame").removeClass("active");
      $("#createPrompt").removeClass("active");
      $("#editPrompt").removeClass("active");
    }
  }
});

$(function () {
  $("#creategambar").on("change", function () {
    let val = $(this).val();

    if (val === "url") {
      $(".image-url-input").show();
      $(".image-upload-input").hide().addClass("disabled");
    } else if (val === "upload") {
      $(".image-url-input").hide();
      $(".image-upload-input").show().removeClass("disabled");
    }
  });

  $("#imageupload").on("change", function () {
    let file = this.files[0]; // get the first file
    if (file) {
      // update the label text to filename
      $(this).siblings("label").text(file.name);
    } else {
      // reset if no file
      $(this).siblings("label").text("Upload");
    }
  });

  $("#creategambar").trigger("change");
});
