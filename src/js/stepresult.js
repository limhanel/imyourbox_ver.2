import {
  newCaclulateStoreFee,
  newCacluateDeliveryFee,
  newCaclutateWMSfee,
} from "./newPrice";

import {
  outputBoxCount,
  inputStoreValue,
  inputStoreCount,
  skuInputStoreCount,
  product_url,
  product_category,
  detailInput,
  releasepackaing,
} from "./stepTwo";

import {
  customer_company,
  customer_phone,
  customer_email,
  customer_manager_name,
  customer_memo,
} from "./stepFour";
import { stepStatus } from "./button";

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

const customerCompany = document.querySelector(".avartar__title");
const totalPrice = document.querySelector(".avartar__price");
const stepResultButton = document.querySelector(".stepBtn__nextBtn");
const monthStoreFee = document.querySelector(".monthstore__fee");
const monthDeliveryFee = document.querySelector(".monthDelivery__fee");
const monthWMSFee = document.querySelector(".monthWMS__fee");

//stepTwo
const HTMLproductCategory = document.querySelector(".productCategory");
const HTMLdetailInput = document.querySelector(".detailInput");
const HTMLproductURL = document.querySelector(".productURL");
const HTMLinputStoreCount = document.querySelector(".inputStoreCount");
const HTMLinputSKUcount = document.querySelector(".inputSKUcount");

//stepThree

const HTMLoutputPackaing = document.querySelector(".outputPackaing");
const HTMLcourierBagSpan = document.querySelector(".courierBagSpan");
const HTMLprocessingNeedWork = document.querySelector(".processingNeedWork");

//StepResult

const HTMLResultCustomerCompany = document.querySelector(
  ".ResultCustomerCompany"
);
const HTMLResultCustomerPhone = document.querySelector(".ResultCustomerPhone");
const HTMLResultCustomerEmail = document.querySelector(".ResultCustomerEmail");
const HTMLResultCustomerName = document.querySelector(".ResultCustomerName");
const HTMLResultCustomerMemo = document.querySelector(".ResultCustomerMemo");

//step

const HTMLStepButtonContainer = document.querySelector(".stepBtn");

stepResultButton.addEventListener("click", () => {
  if (stepStatus === 5) {
    //스텝버튼영역 지우기
    //HTMLStepButtonContainer.style.visibility ="hidden";
    let sumPrice =
      newCaclulateStoreFee(
        inputStoreValue,
        inputStoreCount,
        inputStoreBoxsizeValue
      ) +
      newCacluateDeliveryFee(
        outputBoxCount,
        outputBoxsizeValue,
        releasepackaing
      ) +
      newCaclutateWMSfee(skuInputStoreCount);
    customerCompany.textContent = `"${customer_company}" 고객님의 예상 비용`;
    totalPrice.textContent = `월 ${sumPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    monthStoreFee.textContent = `${newCaclulateStoreFee(
      inputStoreValue,
      inputStoreCount,
      inputStoreBoxsizeValue
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    monthDeliveryFee.textContent = `${newCacluateDeliveryFee(
      outputBoxCount,
      outputBoxsizeValue,
      releasepackaing
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    monthWMSFee.textContent = `${newCaclutateWMSfee(skuInputStoreCount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
    //상품정보
    HTMLproductCategory.textContent = `${enToKr(clothMap, product_category)}`;
    HTMLdetailInput.textContent = `${detailInput}`;
    HTMLproductURL.textContent = `${product_url}`;

    //물류기본정보
    HTMLinputStoreCount.textContent = `${inputStoreCount} ${inputStoreValue}`;
    HTMLinputSKUcount.textContent = `${skuInputStoreCount.toString()} 개`;
    //물류추가정보

    HTMLoutputPackaing.textContent = `${checkNull(
      releasepackagingMap[releasepackaing]
    )}`;
    HTMLcourierBagSpan.textContent = `${checkNull(courierBagMap[courier_bag])}`;
    HTMLprocessingNeedWork.textContent = `${checkNull(
      processingNeedMap[processing_need]
    )}`;
    //연락처정보
    HTMLResultCustomerCompany.textContent = `${customer_company}`;
    HTMLResultCustomerPhone.textContent = `${customer_phone}`;
    HTMLResultCustomerEmail.textContent = `${customer_email}`;
    HTMLResultCustomerName.textContent = `${customer_manager_name}`;
    HTMLResultCustomerMemo.textContent = `${checkNull(customer_memo)}`;
  }
});
