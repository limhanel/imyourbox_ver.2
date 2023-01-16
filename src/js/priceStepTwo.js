import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import wNumb from "wnumb";
import "flatpickr/dist/themes/material_orange.css";
const CLICKED_CLASS = "clicked";

//step2

//상품종류
const product_category = [];
const buttons_category = document.querySelectorAll(
  "ul.stepone__category__list>li>input"
);

const white = "#ffffff";
buttons_category.forEach((e) => {
  e.addEventListener("click", () => {
    const checked__icon = e.parentElement.lastElementChild;
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
    const checked__icon = e.parentElement.lastElementChild;
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

//물류보관량
let inputStoreType = "pallet";
const storeUnit = document.querySelector(".store__unit");
const selectedPalletTag = document.querySelector(".inputStorePallet");
const selectedBoxTag = document.querySelector(".inputStoreBox");
const radio_inputStores = document.querySelector(
  ".inputStoreType__radio__groups"
);
radio_inputStores.addEventListener("change", (e) => {
  const selected = document.querySelectorAll(
    ".inputStoreType__radio__groups > li"
  );

  const selectedColor = "#f18b24";
  const black = "#000000";
  let pallteTitle = selected[0].childNodes[1].childNodes[5].childNodes[1];
  let pallteDescription = selected[0].childNodes[1].childNodes[5].childNodes[3];
  let boxTitle = selected[1].childNodes[1].childNodes[5].childNodes[1];
  let boxDescription = selected[1].childNodes[1].childNodes[5].childNodes[3];

  inputStoreType = e.target.value;

  switch (inputStoreType) {
    case "pallet":
      pallteTitle.style.color = selectedColor;
      pallteDescription.style.color = selectedColor;
      boxTitle.style.color = black;
      boxDescription.style.color = black;
      storeUnit.textContent = "plt";
      selectedPalletTag.classList.toggle(CLICKED_CLASS);
      selectedBoxTag.classList.remove(CLICKED_CLASS);
      break;
    case "box":
      pallteTitle.style.color = black;
      pallteDescription.style.color = black;
      boxTitle.style.color = selectedColor;
      boxDescription.style.color = selectedColor;
      storeUnit.textContent = "박스";
      selectedPalletTag.classList.remove(CLICKED_CLASS);
      selectedBoxTag.classList.toggle(CLICKED_CLASS);
      break;
    default:
      break;
  }
});

//inputStoreCount
let indicatorInputStore = document.querySelector(
  ".indicator__inputStore__range"
);
let inputStoreCount = 0;
let range__inputStore = document.getElementById("inputStore__range");
noUiSlider.create(range__inputStore, {
  start: [0],
  connect: [true, false],
  // behaviour:'snap',
  range: {
    min: 0,
    max: 1000,
  },
  format: wNumb({
    decimals: 0,
  }),
});
range__inputStore.noUiSlider.on("update", (value) => {
  indicatorInputStore.value = value;
  inputStoreCount = indicatorInputStore.value;
  console.log(inputStoreCount);
});
indicatorInputStore.addEventListener("input", (e) => {
  range__inputStore.noUiSlider.set(e.target.value);
  inputStoreCount = range__inputStore.noUiSlider.get();
  console.log(inputStoreCount);
});

//inputStoreCountSKU
let sku__range__inputStore = document.querySelector(".inputStore__sku__range");
let indicatorSKUInputStore = document.querySelector(
  ".indicator__inputStore__sku__range"
);

let skuInputStoreCount = 0;
noUiSlider.create(sku__range__inputStore, {
  start: [0],
  connect: [true, false],
  // behaviour:'snap',
  range: {
    min: 0,
    max: 1000,
  },
  format: wNumb({
    decimals: 0,
  }),
});
sku__range__inputStore.noUiSlider.on("update", (value) => {
  indicatorSKUInputStore.value = value;
  skuInputStoreCount = indicatorSKUInputStore.value;
  console.log(skuInputStoreCount);
});
indicatorSKUInputStore.addEventListener("input", (e) => {
  sku__range__inputStore.noUiSlider.set(e.target.value);
  skuInputStoreCount = sku__range__inputStore.noUiSlider.get();
  console.log(skuInputStoreCount);
});

//inputStoreCountSKU
let outputRangeSlider = document.querySelector(".output__range");
let indicatorOutputBox = document.querySelector(".indicator__output__range");
let outputBoxCount = 0;
noUiSlider.create(outputRangeSlider, {
  start: [0],
  connect: [true, false],
  // behaviour:'snap',
  range: {
    min: 0,
    max: 10000,
  },
  format: wNumb({
    decimals: 0,
  }),
});
outputRangeSlider.noUiSlider.on("update", (value) => {
  indicatorOutputBox.value = value;
  outputBoxCount = indicatorOutputBox.value;
});
indicatorOutputBox.addEventListener("input", (e) => {
  outputRangeSlider.noUiSlider.set(e.target.value);
  outputBoxCount = outputRangeSlider.noUiSlider.get();
});

//출고패키징
let releasepackaing = "total_packaing";
const outputRadio_inputStores = document.querySelector(
  ".output__radio__groups"
);
const selectedTotalPackaingTag = document.querySelector(".total_packaing");
const selectedOnlyPackaingTag = document.querySelector(".only_packaing");

outputRadio_inputStores.addEventListener("change", (e) => {
  const selected = document.querySelectorAll(".output__radio__groups > li");
  let totalPackingTitle = selected[0].childNodes[1].childNodes[5].childNodes[1];
  let totalPackingeDescription =
    selected[0].childNodes[1].childNodes[5].childNodes[3];
  let onlyPackingTitle = selected[1].childNodes[1].childNodes[5].childNodes[1];
  let onlyPackingDescription =
    selected[1].childNodes[1].childNodes[5].childNodes[3];
  const black = "#000000";
  const selectedColor = "#f18b24";
  releasepackaing = e.target.value;
  switch (releasepackaing) {
    case "total_packaing":
      selectedTotalPackaingTag.classList.toggle(CLICKED_CLASS);
      selectedOnlyPackaingTag.classList.remove(CLICKED_CLASS);
      totalPackingTitle.style.color = selectedColor;
      totalPackingeDescription.style.color = selectedColor;
      onlyPackingTitle.style.color = black;
      onlyPackingDescription.style.color = black;
      break;
    case "only_packaing":
      selectedTotalPackaingTag.classList.remove(CLICKED_CLASS);
      selectedOnlyPackaingTag.classList.toggle(CLICKED_CLASS);
      onlyPackingTitle.style.color = selectedColor;
      onlyPackingDescription.style.color = selectedColor;
      totalPackingTitle.style.color = black;
      totalPackingeDescription.style.color = black;
      break;
    default:
      break;
  }
});

export {
  product_category,
  detailInput,
  arr_storage_type,
  product_url,
  //물류보관타입/input_store_type
  inputStoreType,
  //보관량/input_store_num
  inputStoreCount,
  //입고sku양 /input_sku_store_num
  skuInputStoreCount,
  //output_delivery_box_amount,
  outputBoxCount,
  releasepackaing,
};
