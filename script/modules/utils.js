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

export { convertNumber, convertToBase64 };
