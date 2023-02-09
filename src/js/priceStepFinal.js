import { detailOrderInfo } from "./lib/api/detail_order_info";
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
  arr_storage_type,
} from "./priceStepTwo";

import {
  customer_company,
  customer_phone,
  customer_email,
  customer_manager_name,
  customer_memo,
  permissionPersonalInfo,
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

function alertMsg(msg, className) {
  const scrollTo = document.querySelector(`.${className}`);
  console.log(scrollTo);
  alert(msg);
  scrollTo.scrollIntoView({ behavior: "smooth", block: "center" });
}

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
  healthFood: "건강기능식품",
  dogSupplies: "애견용품",
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

//버튼
const stepResultButton = document.querySelector("#next");
const stepPrevButton = document.querySelector("#prev");

//견적세부조건

const customerCompany = document.querySelector(".avartar__title");
const totalPrice = document.querySelector(".avartar__price");

const monthStoreFee = document.querySelector(".monthstore__fee");
const monthDeliveryFee = document.querySelector(".monthDelivery__fee");
const monthWMSFee = document.querySelector(".monthWMS__fee");

const HTMLproductCategory = document.querySelector(".productCategory");
const HTMLdetailInput = document.querySelector(".detailInput");
const HTMLproductURL = document.querySelector(".productURL");
const HTMLinputStoreCount = document.querySelector(".inputStoreCount");
const HTMLinputSKUcount = document.querySelector(".inputSKUcount");
const HTMLoutputDeliveryCount = document.querySelector(".outputDeliveryCount");
const HTMLoutputPackaing = document.querySelector(".outputPackaing");
const HTMLrecalculationInputStore = document.querySelector(
  ".recalculation_pro__inputStore"
);
const HTMLrecalculationOutput = document.querySelector(
  ".recalculation_pro__output"
);

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
const reInputStoreValue = document.querySelector(
  ".recalculation_pro__inputStore"
);
const reMonthDeliveryCount = document.querySelector(
  ".recalculation_pro__output"
);
const reOutputType = document.querySelector(".reOutputType");

const radio_recalculation_inputstore = document.querySelector(
  ".recalculation_inputStoreType__radio__groups"
);
const radio_recalculation_output_radio_groups = document.querySelector(
  ".recalculation_output_radio_groups"
);

let recalculationInputStoreType = inputStoreType;
radio_recalculation_inputstore.addEventListener("change", (e) => {
  recalculationInputStoreType = e.target.value;
});

let recalculationReleasepackaingType = releasepackaing;
radio_recalculation_output_radio_groups.addEventListener("change", (e) => {
  recalculationReleasepackaingType = e.target.value;
});

//재계산버튼
recalculationButton.addEventListener("click", () => {
  let sumPrice =
    CaclulateStoreFee(recalculationInputStoreType, reInputStoreValue.value) +
    CacluateDeliveryFee(
      reMonthDeliveryCount.value,
      recalculationReleasepackaingType
    ) +
    CaclutateWMSfee(skuInputStoreCount);
  customerCompany.textContent = `"${customer_company}" 고객님의 예상 비용`;
  totalPrice.textContent = `${sumPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `;
  monthStoreFee.textContent = `${CaclulateStoreFee(
    recalculationInputStoreType,
    reInputStoreValue.value
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
  monthDeliveryFee.textContent = `${CacluateDeliveryFee(
    reMonthDeliveryCount.value,
    recalculationReleasepackaingType
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
});

if (priceSectionIndex.get() == 1) {
  stepPrevButton.style.display = "none";
  // HTMLpriceFirstSection.classList.add("fadeIn");
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
  if (priceSectionIndex.get() == 1) {
    // fristSectionExceptionHandle();
    if (customer_company.length === 0) {
      alert("이름을 입력해주세요");
      return;
    }
    if (customer_phone.length === 0) {
      alert("연락처를 입력해주세요");
      return;
    }
    if (customer_email.length === 0) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (customer_manager_name.length === 0) {
      alert("담당자명을 입력해주세요");
      return;
    }
    if (!permissionPersonalInfo) {
      alert("개인정보 수집 및 이용목적에 동의해주세요.");
      return;
    }
  }
  priceSectionIndex.increase();
  if (priceSectionIndex.get() === 2) {
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
    if (product_category.length < 1) {
      priceSectionIndex.decrease();
      alertMsg("상품종류 하나이상을 선택해주세요", "product_category");
      return;
    }
    if (detailInput.length < 1) {
      priceSectionIndex.decrease();
      alertMsg("상세품목명을 입력해주세요", "product_category");
      return;
    }
    if (arr_storage_type.length < 1) {
      priceSectionIndex.decrease();
      alertMsg("보관형태를 하나이상 선택해주세요", "storageType__container");
      return;
    }
    if (product_url.length < 1) {
      priceSectionIndex.decrease();
      alertMsg(
        "상품url을 입력해주세요.만약없으시다면 없음으로 입력해주세요",
        "productURL__container"
      );
      return;
    }
    if (inputStoreCount < 1) {
      priceSectionIndex.decrease();
      alertMsg(
        "물류 보관량을 1이상 입력해주세요",
        "indicator__inputStore__range"
      );
      return;
    }
    if (skuInputStoreCount < 1) {
      priceSectionIndex.decrease();
      alertMsg(
        "SKU량을 1이상 입력해주세요",
        "indicator__inputStore__sku__range"
      );
      return;
    }
    if (outputBoxCount < 1) {
      priceSectionIndex.decrease();
      alertMsg("월택배건수를 1이상 입력해주세요", "indicator__output__range");
      return;
    }

    //상세견적정보
    const detailOrderData = {
      customer_company,
      customer_manager_name,
      customer_phone,
      customer_email,
      customer_memo,
      category: product_category,
      storetype: arr_storage_type,
      detail_product_type: detailInput,
      product_url,
      input_store_type: inputStoreType,
      input_store_num: inputStoreCount,
      input_sku_store_num: skuInputStoreCount,
      output_delivery_box_amount: outputBoxCount,
      output_packaing: releasepackaing,
    };

    detailOrderInfo(detailOrderData)
      .then((r) => {
        console.log(r.data);
      })
      .catch((e) => {
        console.log(e);
      });

    window.scrollTo(0, 0);
    //fadeIn;
    stepResultButton.style.display = "none";
    stepPrevButton.style.display = "none";
    HTMLpriceFinalSection.classList.add("fadeIn");
    HTMLpriceFinalSection.style.display = "";
    HTMLpriceSecondSection.style.display = "none";
    HTMLpriceFirstSection.style.display = "none";

    //재계산영역
    if (document.getElementById("inputStore_pallet").checked) {
      document.getElementById("recalculation_inputstore_pallet").checked = true;
    } else if (document.getElementById("inputStore_box").checked) {
      document.getElementById("recalculation_inputstore_box").checked = true;
    }
    HTMLrecalculationInputStore.value = `${inputStoreCount}`;
    HTMLrecalculationOutput.value = `${outputBoxCount}`;

    if (document.getElementById("output_totalpackaing").checked) {
      document.getElementById(
        "recalculation_output_totalpackaing"
      ).checked = true;
    } else if (document.getElementById("output_onlypackaing").checked) {
      document.getElementById(
        "recalculation_output_onlypackaing"
      ).checked = true;
    }

    let sumPrice =
      CaclulateStoreFee(inputStoreType, inputStoreCount) +
      CacluateDeliveryFee(outputBoxCount, releasepackaing) +
      CaclutateWMSfee(skuInputStoreCount);
    customerCompany.textContent = `"${customer_company}" 고객님의 예상 비용`;
    totalPrice.textContent = `${sumPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `;

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
    HTMLoutputDeliveryCount.textContent = `${outputBoxCount.toString()} 건`;
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
