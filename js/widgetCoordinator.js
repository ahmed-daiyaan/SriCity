// Tick Colors
const dayTickColor = "#000000";
const nightTickColor = "#EFFD5F";
// Background Colors
const dayBackgroundColor =
  "linear-gradient(to bottom,  #f18448 0%,#ffd364 100%);";
const nightBackgroundColor =
  "linear-gradient(to bottom,  #371a79 0%,#713684 100%)";
// Text Colors
const dayTextColor = "#000000";
const nightTextColor = "#f5f5f5";
// DOM Elements
const bodyElm = document.getElementById("body");
const textClass = document.getElementsByClassName("text");

var tickColor;

let today = new Date();

function dayNightMode(
  currHour = today.getUTCHours(),
  currMin = today.getUTCMinutes()
) {
  if (currHour >= 12 && currMin >= 30 && currHour <= 0) {
    tickColor = nightTickColor;
    bodyElm.style.background = nightBackgroundColor;
    bodyElm.style.backgroundAttachment = "fixed";

    for (i = 0; i < textClass.length; i++) {
      textClass[i].style.color = nightTextColor;
    }
  } else {
    tickColor = dayTickColor;
    bodyElm.style.background = dayBackgroundColor;

    for (i = 0; i < textClass.length; i++) {
      textClass[i].style.color = dayTextColor;
    }
  }
}

setInterval(dayNightMode, 1000);

// heatIndexGauge(50);
// humidityGauge(50);
// thermometer(100,10,true);
// dewpoint(100);
