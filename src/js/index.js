import "core-js/stable";
import "regenerator-runtime/runtime";
import "slick-carousel";
import "../css/style.css";
import "./lib/eventModal";
import "./lib/marketing/kakao";
import "./lib/marketing/google";
import "./lib/marketing/mirae";
import "./lib/marketing/mob";
import "./lib/marketing/naver";
import "./stepone";
import "./stepTwo";
import "./stepThree";
import "./stepFour";
import "./button";
import "./stepresult";
import KakaoChat from "./lib/chat/kakaochat";

KakaoChat();

console.log("hello webpack!");
