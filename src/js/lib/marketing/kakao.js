//기본스크립트
const kakaoScript = document.createElement("script");
kakaoScript.addEventListener("load", () => {
  kakaoPixel("8259105677291402797").pageView();
});
kakaoScript.type = "text/javascript";
kakaoScript.src = "//t1.daumcdn.net/adfit/static/kp.js";
kakaoScript.async = true;

document.getElementsByTagName("script")[0].parentNode.appendChild(kakaoScript);

//전환스크립트
export const kakaoConv = () => {
  kakaoPixel("8259105677291402797").pageView();
  let companyName = document.getElementById("customer_comapny").value;
  let totalPrice = document.getElementById().value;
  kakaoPixel("8259105677291402797").purchase({
    total_price: all_price, // 주문 총 가격(optional)
    currency: "KRW", // 주문 가격의 화폐 단위(optional, 기본 값은 KRW)
    product: [{ name: companyName, quantitiy: "1", price: "0" }],
  });
};
