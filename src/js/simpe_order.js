import Swal from "sweetalert2";
import { validateEmail } from "./lib/validation/validate";
import { orderInfo } from "./lib/api/order_info";
let simpleOrderObj = {
  customer_company: "",
  customer_email: "",
  customer_manager_name: "",
  customer_phone: "",
  customer_memo: "",
  isAgreePersonalInfo: false,
};

console.log("들어가나??");
//이메일유효성검사
let HTMLeamilErrorMsg = document.getElementById("emailCheck");
//회사명인풋
const input_simple_customer_company = document.querySelector(
  ".simple_customer_company"
);
input_simple_customer_company.addEventListener("input", (e) => {
  simpleOrderObj.customer_company = e.target.value;
  console.log(simpleOrderObj.customer_company);
});

//회사폰
const input_simple__customer_phone = document.querySelector(
  ".simple_customer_phone"
);
input_simple__customer_phone.addEventListener("input", (e) => {
  simpleOrderObj.customer_phone = e.target.value;
});

//회사메일
const input_simple_customer_email = document.querySelector(
  ".simple_customer_email"
);
input_simple_customer_email.addEventListener("input", (e) => {
  simpleOrderObj.customer_email = e.target.value;
  //유효성체크
  if (
    !validateEmail(simpleOrderObj.customer_email) &&
    simpleOrderObj.customer_email.length > 0
  ) {
    HTMLeamilErrorMsg.style.visibility = "visible";
    HTMLeamilErrorMsg.style.display = "";
    HTMLeamilErrorMsg.textContent = `* ${simpleOrderObj.customer_email} 은 잘못된 이메일 형식입니다.`;
  } else {
    HTMLeamilErrorMsg.style.display = "none";
  }
});

//담당자명
const input_simple_customer_manager_name = document.querySelector(
  ".simple_customer_manager_name"
);
input_simple_customer_manager_name.addEventListener("input", (e) => {
  simpleOrderObj.customer_manager_name = e.target.value;
});
//기타메모
const input_simple_customer_memo = document.querySelector(
  ".simple_customer_memo"
);
input_simple_customer_memo.addEventListener("input", (e) => {
  simpleOrderObj.customer_memo = e.target.value;
});

const simpleOrder_checkbox = document.querySelector("#simpleOrder__permission");

simpleOrder_checkbox.addEventListener("change", (e) => {
  simpleOrderObj.isAgreePersonalInfo = e.target.checked;
});

const HTMLcallSimpleOrderBtn = document.querySelector(".callSimpleOrderBtn");

HTMLcallSimpleOrderBtn.addEventListener("click", () => {
  if (
    simpleOrderObj.customer_company.length < 1 ||
    simpleOrderObj.customer_email.length < 1 ||
    simpleOrderObj.customer_manager_name.length < 1 ||
    simpleOrderObj.customer_phone.length < 1
  ) {
    Swal.fire({
      icon: "warning",
      text: `필수항목들을 모두 채워주세요`,
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        return;
      }
    });
  } else if (!validateEmail(simpleOrderObj.customer_email)) {
    Swal.fire({
      icon: "warning",
      text: `이메일 형식이 올바르지않습니다.`,
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        return;
      }
    });
  } else if (!simpleOrderObj.isAgreePersonalInfo) {
    Swal.fire({
      icon: "warning",
      text: `개인정보 수집 및 이용목적에 동의해주세요.`,
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        return;
      }
    });
  } else {
    orderInfo(simpleOrderObj)
      .then((r) => {
        Swal.fire({
          icon: "success",
          text: `${r.data}`,
          confirmButtonText: "확인",
        }).then((result) => {
          location.reload();
          if (result.isConfirmed) {
            //page reload
            location.reload();
            return;
          }
        });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          text: `${e}`,
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            //page reload
            // location.reload();
            return;
          }
        });
      });
  }
  console.log("다있다.");
});
