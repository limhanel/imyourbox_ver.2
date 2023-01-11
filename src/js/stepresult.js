import {
  newCaclulateStoreFee,
  newCacluateDeliveryFee,
  newCaclutateWMSfee,
} from "./newPrice";
import {
  outputBoxCount,
  inputStoreDate,
  arr_logistics_service_kinds,
  inputStoreValue,
  inputStoreCount,
  skuInputStoreCount,
  service_launching_status,
} from "./stepTwo";
import {
  product_category,
  detailInput,
  barcodeValue,
  product_url,
  arr_caution_product_type,
} from "./stepone";
import {
  releasepackaing,
  use_service,
  courier_bag,
  processing_need,
} from "./stepThree";
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

//취급주의
const productCautionMap = {
  fragile: "유리 등의 파손주의 상품",
  discoloration: "인쇄물 등의 변색주의 상품",
  highprice: "시계,귀중품 등 고가품",
  fitness_product: "헬스용품 등 20kg 미만 중량물",
  largefurniture: "침대 등 대형가구",
};

//stepTwo

const serviceLaunching = (bool) => {
  if (bool) {
    return "서비스런칭";
  } else {
    return "서비스준비중";
  }
};

const storeTypeMap = {
  room_temperature: "상온보관",
  low_temperature: "저온보관",
  refrigerated_storage: "냉장보관",
  fronze_storage: "냉동보관",
};

const logistics_service_kindsMap = {
  fullfillment: "풀필먼트",
  storeproduct: "상품보관",
  processing: "임가공",
  etc: "기타",
};

const haveBarcodeMap = {
  have_barcode: "바코드있음",
  no_barcode: "바코드없음",
  part_barcode: "바코드 일부만 있음",
};

const deliveryBoxSizeMap = {
  mini: "극소",
  small: "소",
  medium: "중",
  large: "대",
  giant: "특대",
};

const serviceUseMap = {
  first: "처음입니다",
  using: "이용중입니다",
};

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

//stepOne
const HTMLproductCategory = document.querySelector(".productCategory");
const HTMLdetailInput = document.querySelector(".detailInput");
const HTMLproductURL = document.querySelector(".productURL");

//stepTwo

const HTMLserviceLaunching = document.querySelector(".serviceLaunching");
const HTMLlogisticsServiceKinds = document.querySelector(
  ".logisticsServiceKinds"
);
const HTMLinputStoreCount = document.querySelector(".inputStoreCount");
const HTMLinputSKUcount = document.querySelector(".inputSKUcount");
const HTMLinputDateResult = document.querySelector(".inputDateResult");
const HTMLoutputDeliveryCount = document.querySelector(".outputDeliveryCount");

//stepThree

const HTMLuseService = document.querySelector(".userService");
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
    HTMLserviceLaunching.textContent = `${serviceLaunching(
      service_launching_status
    )}`;
    HTMLlogisticsServiceKinds.textContent = `${enToKr(
      logistics_service_kindsMap,
      arr_logistics_service_kinds
    )}`;
    HTMLinputStoreCount.textContent = `${inputStoreCount} ${inputStoreValue}`;
    HTMLinputSKUcount.textContent = `${skuInputStoreCount.toString()} 개`;

    console.log(inputStoreDate);
    HTMLinputDateResult.textContent = `${inputStoreDate}`;
    HTMLoutputDeliveryCount.textContent = `${outputBoxCount.toString()}  ${
      deliveryBoxSizeMap[outputBoxsizeValue]
    }`;
    //물류추가정보
    HTMLuseService.textContent = `${checkNull(serviceUseMap[use_service])}`;
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
