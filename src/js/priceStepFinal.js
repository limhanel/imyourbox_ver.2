import {
  CaclulateStoreFee,
  CacluateDeliveryFee,
  CaclutateWMSfee,
} from "./price";

import {
  outputBoxCount,
  inputStoreCount,
  skuInputStoreCount,
  product_url,
  product_category,
  detailInput,
  releasepackaing,
  inputStoreType,
} from "./priceStepTwo";

import {
  customer_company,
  customer_phone,
  customer_email,
  customer_manager_name,
  customer_memo,
} from "./priceStepFirst";

const enToKr = (obj, arr) => {
  const newArr = [];

  for (let key of arr) {
    newArr.push(obj[key]);
  }
  return newArr.toString();
};

const checkNull = (val) => {
  if (val === undefined) {
    return (val = "");
  } else {
    return val;
  }
};

function PriceSectionIndex() {
  let buttonCount = 1;

  this.get = function () {
    return buttonCount;
  };

  this.increase = function () {
    if (buttonCount >= 3) {
      return (buttonCount = 3);
    }
    return ++buttonCount;
  };
  this.decrease = function () {
    if (buttonCount <= 1) {
      return (buttonCount = 1);
    }
    return --buttonCount;
  };
}
const priceSectionIndex = new PriceSectionIndex();

//stepOne

const clothMap = {
  clothes: "의류",
  stuff: "잡화",
  beauty: "뷰티",
  householdgoods: "생활용품",
  electronics: "가전/가구",
  stationery: "문구류",
  food: "식음료",
  etc: "기타",
};

//stepTwo

const releasepackagingMap = {
  total_packaing: "합포장",
  only_packaing: "단독포장",
};

const courierBagMap = {
  have: "있음",
  none: "없음",
  need: "필요함",
};

//임가공필요여부
const processingNeedMap = {
  need: "필요함",
  not_need: "필요없음",
};

//견적세부조건

const customerCompany = document.querySelector(".avartar__title");
const totalPrice = document.querySelector(".avartar__price");
const stepResultButton = document.querySelector("#next");
const stepPrevButton = document.querySelector("#prev");

const monthStoreFee = document.querySelector(".monthstore__fee");
const monthDeliveryFee = document.querySelector(".monthDelivery__fee");
const monthWMSFee = document.querySelector(".monthWMS__fee");

const HTMLproductCategory = document.querySelector(".productCategory");
const HTMLdetailInput = document.querySelector(".detailInput");
const HTMLproductURL = document.querySelector(".productURL");
const HTMLinputStoreCount = document.querySelector(".inputStoreCount");
const HTMLinputSKUcount = document.querySelector(".inputSKUcount");
const HTMLoutputPackaing = document.querySelector(".outputPackaing");

const HTMLResultCustomerCompany = document.querySelector(
  ".ResultCustomerCompany"
);
const HTMLResultCustomerPhone = document.querySelector(".ResultCustomerPhone");
const HTMLResultCustomerEmail = document.querySelector(".ResultCustomerEmail");
const HTMLResultCustomerName = document.querySelector(".ResultCustomerName");
const HTMLResultCustomerMemo = document.querySelector(".ResultCustomerMemo");

//섹션
const HTMLpriceFirstSection = document.querySelector("#firstStep");
const HTMLpriceSecondSection = document.querySelector("#secondStep");
const HTMLpriceFinalSection = document.querySelector("#finalStep");

//재계산
const recalculationButton = document.querySelector(".recalculation");

recalculationButton.addEventListener("click", () => {
  let sumPrice =
    CaclulateStoreFee(inputStoreType, 500) +
    CacluateDeliveryFee(outputBoxCount, releasepackaing) +
    CaclutateWMSfee(skuInputStoreCount);
  customerCompany.textContent = `"${customer_company}" 고객님의 예상 비용`;
  totalPrice.textContent = `월 ${sumPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
});

if (priceSectionIndex.get() == 1) {
  stepPrevButton.style.display = "none";
  HTMLpriceFirstSection.classList.add("fadeIn");
  HTMLpriceSecondSection.style.display = "none";
  HTMLpriceFinalSection.style.display = "none";
}

stepPrevButton.addEventListener("click", () => {
  priceSectionIndex.decrease();
  if (priceSectionIndex.get() == 1) {
    window.scrollTo(0, 0);
    stepPrevButton.style.display = "none";
    HTMLpriceFirstSection.classList.add("fadeIn");
    HTMLpriceFirstSection.style.display = "";
    HTMLpriceSecondSection.style.display = "none";
    HTMLpriceFinalSection.style.display = "none";
  }
  if (priceSectionIndex.get() == 2) {
    window.scrollTo(0, 0);
    stepResultButton.style.display = "";
    HTMLpriceSecondSection.style.display = "";
    HTMLpriceFirstSection.style.display = "none";
    HTMLpriceFinalSection.style.display = "none";
  }
});

stepResultButton.addEventListener("click", () => {
  //++counter
  priceSectionIndex.increase();

  if (priceSectionIndex.get() == 2) {
    window.scrollTo(0, 0);
    stepPrevButton.style.display = "";
    //fadeIn;
    stepResultButton.style.display = "";
    HTMLpriceSecondSection.classList.add("fadeIn");
    HTMLpriceSecondSection.style.display = "";
    HTMLpriceFirstSection.style.display = "none";
    HTMLpriceFinalSection.style.display = "none";
  }
  if (priceSectionIndex.get() == 3) {
    window.scrollTo(0, 0);
    //fadeIn;
    stepResultButton.style.display = "none";
    stepPrevButton.style.display = "none";
    HTMLpriceFinalSection.classList.add("fadeIn");
    HTMLpriceFinalSection.style.display = "";
    HTMLpriceSecondSection.style.display = "none";
    HTMLpriceFirstSection.style.display = "none";

    let sumPrice =
      CaclulateStoreFee(inputStoreType, inputStoreCount) +
      CacluateDeliveryFee(outputBoxCount, releasepackaing) +
      CaclutateWMSfee(skuInputStoreCount);
    customerCompany.textContent = `"${customer_company}" 고객님의 예상 비용`;
    totalPrice.textContent = `월 ${sumPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    console.log(totalPrice.textContent);
    console.log(totalPrice);

    monthStoreFee.textContent = `${CaclulateStoreFee(
      inputStoreType,
      inputStoreCount
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    monthDeliveryFee.textContent = `${CacluateDeliveryFee(
      outputBoxCount,
      releasepackaing
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    monthWMSFee.textContent = `${CaclutateWMSfee(skuInputStoreCount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    //상품정보
    HTMLproductCategory.textContent = `${enToKr(clothMap, product_category)}`;
    HTMLdetailInput.textContent = `${detailInput}`;
    HTMLproductURL.textContent = `${product_url}`;

    //물류기본정보
    HTMLinputStoreCount.textContent = `${inputStoreCount} ${inputStoreType}`;
    HTMLinputSKUcount.textContent = `${skuInputStoreCount.toString()} 개`;
    //물류추가정보
    HTMLoutputPackaing.textContent = `${checkNull(
      releasepackagingMap[releasepackaing]
    )}`;
    //연락처정보
    HTMLResultCustomerCompany.textContent = `${customer_company}`;
    HTMLResultCustomerPhone.textContent = `${customer_phone}`;
    HTMLResultCustomerEmail.textContent = `${customer_email}`;
    HTMLResultCustomerName.textContent = `${customer_manager_name}`;
    HTMLResultCustomerMemo.textContent = `${checkNull(customer_memo)}`;
  }
});
