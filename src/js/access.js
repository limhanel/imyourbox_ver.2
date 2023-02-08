let termsOfService = JSON.parse(window.localStorage.getItem("termsOfService"));
let personalInfoProcessing = JSON.parse(
  window.localStorage.getItem("personalInfoProcessing")
);

//개인정보부분
let isTermsOfService = false;
let isPersonalInfoProcessing = false;

window.localStorage.setItem("termsOfService", JSON.stringify(isTermsOfService));
window.localStorage.setItem(
  "personalInfoProcessing",
  JSON.stringify(isPersonalInfoProcessing)
);

//풋터개인정보처리
const HTMLTermsOfService = document.getElementById("termsOfService");
HTMLTermsOfService.style.cursor = "pointer";
HTMLTermsOfService.addEventListener("click", (e) => {
  isTermsOfService = true;
  window.localStorage.setItem(
    "termsOfService",
    JSON.stringify(isTermsOfService)
  );
  location.href = "/access.html";
});
const HTMLPersonalInfoProcessing = document.getElementById(
  "personalInfoProcessing"
);
HTMLPersonalInfoProcessing.style.cursor = "pointer";
HTMLPersonalInfoProcessing.addEventListener("click", (e) => {
  isPersonalInfoProcessing = true;
  isTermsOfService = false;
  window.localStorage.setItem(
    "personalInfoProcessing",
    JSON.stringify(isPersonalInfoProcessing)
  );
  window.localStorage.setItem(
    "termsOfService",
    JSON.stringify(isTermsOfService)
  );
  location.href = "/access.html";
});

document.getElementById("access__tab1").checked = true;
console.log(document.getElementById("access__tab1").checked);

document.getElementById("access__tab2").checked = personalInfoProcessing;

console.log(termsOfService);
