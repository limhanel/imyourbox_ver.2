//상품종류
const product_category = [];
const buttons_category = document.querySelectorAll(
  "ul.stepone__category__list>li>input"
);
const CLICKED_CLASS = "clicked";
const white = "#ffffff";
buttons_category.forEach((e) => {
  e.addEventListener("click", () => {
    const checked__icon = e.parentElement.childNodes[2];
    const splitCategory = e.className.split(" ")[1];
    if (product_category.includes(splitCategory)) {
      product_category.splice(product_category.indexOf(splitCategory), 1);
      checked__icon.style.color = "#ffffff";
      checked__icon.style.opacity = 0.7;
    } else {
      product_category.push(splitCategory);
      checked__icon.style.color = "#f18b24";
      checked__icon.style.opacity = 0.7;
    }

    e.classList.toggle(CLICKED_CLASS);
  });
});

//상세 품목
let detailInput = "";

const input_detail = document.querySelector(".detail__input");
input_detail.addEventListener("input", (e) => {
  detailInput = e.target.value;
  console.log(detailInput);
  input_detail.style.backgroundColor = white;
});

//보관형태
const arr_storage_type = [];
const buttons_storage_type = document.querySelectorAll(
  "ul.storageType__container__buttons > li> input"
);

buttons_storage_type.forEach((e) => {
  e.addEventListener("click", () => {
    const checked__icon = e.parentElement.childNodes[2];
    const splitStorageType = e.className.split(" ")[1];
    if (arr_storage_type.includes(splitStorageType)) {
      arr_storage_type.splice(arr_storage_type.indexOf(splitStorageType), 1);
      e.style.color = "#474747";
      checked__icon.style.color = "#ffffff";
      checked__icon.style.opacity = 0.7;
    } else {
      arr_storage_type.push(splitStorageType);
      checked__icon.style.color = "#f18b24";
      checked__icon.style.opacity = 0.7;
      e.style.color = "#f18b24";
    }
    console.log(arr_storage_type);
    e.classList.toggle(CLICKED_CLASS);
  });
});

//대표상품 URL
let product_url = "";
const input_product_url = document.querySelector(".productURL__input");

input_product_url.addEventListener("input", (e) => {
  product_url = e.target.value;
  input_product_url.style.backgroundColor = white;
  console.log(product_url);
});

export { product_category, detailInput, arr_storage_type, product_url };
