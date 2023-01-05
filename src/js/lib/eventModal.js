import "jquery.cookie";

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  const mainPop = document.getElementById("mainpop");
  function checkCookie() {
    let cookiedata = document.cookie;
    if (cookiedata.indexOf("eventCookie=Y") < 0) {
      mainPop.style.display = "block";
    } else {
      mainPop.style.display = "none";
    }
  }

  checkCookie();

  $(function () {
    let floatPosition = parseInt($("#mainpop").css("top"));

    $(window)
      .scroll(function () {
        let scrollTop = $(window).scrollTop();
        let newPosition = scrollTop + floatPosition + "px";

        $("#mainpop").stop().animate(
          {
            top: newPosition,
          },
          25
        );
      })
      .scroll();
  });

  function eventPopupHide(state) {
    //닫기버튼 오늘하루보지않기 버튼 무관하계 레이어팝업은 닫는다.
    $("#mainpop").hide();

    // console.log($.cookie());
    //오늘하루보지않기 버튼을 누른 경우

    if (state === 1) {
      //'eventCookie' 이름의 쿠키가 있는지 체크한다.
      if ($.cookie("eventCookie") == undefined) {
        //쿠키가 없는 경우 eventCookie 쿠키를 추가
        $.cookie("eventCookie", "Y", { expires: 1, path: "/" });
        /**
                설명 :
                임의로 eventCookie라는 이름에 Y라는 값을 넣어주었고,
                expires값으로 1을 주어 1일 후 쿠키가 삭제되도록 하였다.
                path값을 '/'로 주면 해당사이트 모든페이지에서 유효한 쿠키를 생성한다.
                특정페이지에서만 작동하려면 페이지 경로를 작성하면 된다.
            **/
      }
    }
  }

  $(function () {
    $(".btn_close").click(function () {
      eventPopupHide(1);
    });
  });

  $(function () {
    $(".close_text").click(function () {
      eventPopupHide(0);
    });
  });
  const total = $("#poppop img").length, // get the number of slides
    rand = Math.floor(Math.random() * total); // random number

  //팝업 뉴스 케러셀
  $(() => {
    $("#poppop").slick({
      dots: true,
      infinite: true,
      fade: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      initialSlide: rand,
      prevArrow:
        '<button class="custom__slick-prev"><i class="fas fa-angle-left"></i></button>',
      nextArrow:
        '<button class="custom__slick-next"><i class="fas fa-angle-right"></i></button>',
    });
  });
}
