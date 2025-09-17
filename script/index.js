// Prompt handler
const promptHandler = (type) => {
  $(`#${type}`).on("click", function () {
    $(".prompt-frame").addClass("active");
    $(`#${type}Prompt`).addClass("active");
  });
};

const closePromptForce = () => {
  $(".prompt-frame").removeClass("active");
  $("#createPrompt").removeClass("active");
  $("#editPrompt").removeClass("active");
};

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

// Image input switcher (SORA)
const imageSwitchers = (type) => {
  $(`#${type}gambar`).on("change", function () {
    let val = $(this).val();
    if (val === "url") {
      $(`.${type}gambar.image-url-input`).show();
      $(`.${type}gambar.image-upload-input`).hide().addClass("disabled");
    } else if (val === "upload") {
      $(`.${type}gambar.image-url-input`).hide();
      $(`.${type}gambar.image-upload-input`).show().removeClass("disabled");
    }
  });
  $(`#${type}imageupload`).on("change", function () {
    let file = this.files[0];
    if (file) {
      $(this).siblings("label").text(file.name);
    } else {
      $(this).siblings("label").text("Upload");
    }
  });
  $(`#${type}gambar`).trigger("change");
};

// cuman ada "create" sama "edit"
$(function () {
  imageSwitchers("create");
  imageSwitchers("edit");
});
