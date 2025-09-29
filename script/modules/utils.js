// convert number
const convertNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
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

export { convertNumber, convertToBase64, pushNotification };
