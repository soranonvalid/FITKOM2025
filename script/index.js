$("#create").click(function () {
  $(".prompt-frame").addClass("active");
  $("#createPrompt").addClass("active");
  $("#editPrompt").removeClass("active");
});

$("#edit").click(function () {
  $(".prompt-frame").addClass("active");
  $("#editPrompt").addClass("active");
  $("#createPrompt").removeClass("active");
});

$(".close").click(function () {
  $(".prompt-frame").removeClass("active");
  $("#createPrompt").removeClass("active");
  $("#editPrompt").removeClass("active");
});
