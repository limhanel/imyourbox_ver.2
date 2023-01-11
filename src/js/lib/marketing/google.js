// <!-- 구글 광고 -->
// <!-- Global site tag (gtag.js) - Google Analytics -->

window.dataLayer = window.dataLayer || [];

export function gtag() {
  dataLayer.push(arguments);
}

// <!-- Global site tag (gtag.js) - Google Ads: 611833307 -->
const googleAnalyticsScript = document.createElement("script");
googleAnalyticsScript.async = true;
googleAnalyticsScript.src =
  "https://www.googletagmanager.com/gtag/js?id=UA-146580343-1";
document
  .getElementsByTagName("script")[0]
  .parentNode.appendChild(googleAnalyticsScript);

const googleAnalyticsScriptFun = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "UA-146580343-1");
};

//특정이벤트감지
if (
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/"
) {
  //서비스소개서
  // document.getElementById("gtagServiceDownload").onclick = function () {
  //   gtag("event", "service", {
  //     event_category: "(리뉴얼후)서비스소개서",
  //     event_label: "(renewal)serviceFile",
  //   });
  // };

  // 전화문의신청 -> 간단견적신청으로 변경예정

  let gtagSimpleOrder = document.getElementById("gtagSimpleOrder");

  gtagSimpleOrder.onclick = () => {
    gtag("event", "service", {
      event_category: "(리뉴얼후)간단견적버튼",
      event_label: "(renewal)simpleOrderBtn",
    });
  };
}

//상세견적
export const gtagDetailOrder = () => {
  console.log("상세견적지태그");
  gtag("event", "service", {
    event_category: "(리뉴얼후)상세견적버튼",
    event_label: "(renewal)detailOrderBtn",
  });
};

googleAnalyticsScriptFun();
