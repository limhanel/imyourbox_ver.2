import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import wNumb from "wnumb";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import { Korean } from "flatpickr/dist/l10n/ko";
import moment from "moment";
const CLICKED_CLASS = "clicked";

//step2
//서비스런칭 여부
let service_launching_status = false;
const checkbox = document.querySelector("#prepare");
checkbox.addEventListener("change", (e) => {
  service_launching_status = e.target.checked;
  console.log(service_launching_status);
});
//문의할 물류 서비스
const arr_logistics_service_kinds = [];
const buttons_logistics_service_kinds_type = document.querySelectorAll(
  "ul.logistics_service_kinds__container > li >div"
);
buttons_logistics_service_kinds_type.forEach((e) => {
  e.addEventListener("click", () => {
    const checked__icon = e.childNodes[4];
    const splitStorageType = e.className.split(" ")[1];
    // console.log(`${splitStorageType}`)
    // console.log(arr_logistics_service_kinds.includes(splitStorageType));
    if (arr_logistics_service_kinds.includes(splitStorageType)) {
      arr_logistics_service_kinds.splice(
        arr_logistics_service_kinds.indexOf(splitStorageType),
        1
      );
      checked__icon.style.color = "#ffffff";
      checked__icon.style.opacity = 0.7;
    } else {
      arr_logistics_service_kinds.push(splitStorageType);
      checked__icon.style.color = "#f18b24";
      checked__icon.style.opacity = 0.7;
    }
    console.log(arr_logistics_service_kinds);
    e.classList.toggle(CLICKED_CLASS);
  });
});

//물류보관량
let inputStoreValue = "pallet";
const boxItem = document.querySelector(".box__checked__container");
const storeUnit = document.querySelector(".store__unit");
//boxItem.style.display = "none";
const radio_inputStores = document.querySelector(
  ".inputStoreType__radio__groups"
);
radio_inputStores.addEventListener("change", (e) => {
  const selected = document.querySelectorAll(
    ".inputStoreType__radio__groups > li"
  );

  const black = "#000000";
  const selectedColor = "#f18b24";
  inputStoreValue = e.target.value;
  switch (inputStoreValue) {
    case "pallet":
      selected[0].style.boxShadow = "0px 0px 5px 0px #ff9948";
      selected[0].childNodes[0].childNodes[3].childNodes[0].style.color =
        selectedColor;
      selected[0].childNodes[0].childNodes[3].childNodes[2].style.color =
        selectedColor;
      selected[1].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.15)";
      selected[1].childNodes[0].childNodes[3].childNodes[0].style.color = black;
      selected[1].childNodes[0].childNodes[3].childNodes[2].style.color = black;
      storeUnit.textContent = "plt";
      boxItem.style.display = "none";
      break;
    case "box":
      selected[1].style.boxShadow = "0px 0px 5px 0px #ff9948";
      selected[1].childNodes[0].childNodes[3].childNodes[0].style.color =
        selectedColor;
      selected[1].childNodes[0].childNodes[3].childNodes[2].style.color =
        selectedColor;
      selected[0].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.15)";
      selected[0].childNodes[0].childNodes[3].childNodes[0].style.color = black;
      selected[0].childNodes[0].childNodes[3].childNodes[2].style.color = black;
      storeUnit.textContent = "박스";
      boxItem.style.display = "";
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

console.log("?????");
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
//input_store_date
let inputStoreDate = moment().format("YYYY-MM-DD");

flatpickr(".calendar-inputStoreDate", {
  locale: Korean,
  onChange: (selectedDate, dateStr) => {
    inputStoreDate = dateStr;
    // console.log(nputStoreDate);
    // console.log(typeof inputStoreDate);
  },
});

export {
  //service_launching_status
  service_launching_status,
  //물류서비스/servicekinds
  arr_logistics_service_kinds,
  //물류보관타입/input_store_type
  inputStoreValue,
  //보관량/input_store_num
  inputStoreCount,
  //입고sku양 /input_sku_store_num
  skuInputStoreCount,
  //input_store_date
  inputStoreDate,
  //output_delivery_box_amount,
  outputBoxCount,
};
