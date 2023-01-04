export default function kakoChatBtn() {
    window.kakaoAsyncInit = () => {
    Kakao.Channel.createChatButton({
            container: '#kakao-talk-channel-chat-button',
          });
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://developers.kakao.com/sdk/js/kakao.plusfriend.min.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'kakao-js-sdk');
  }