// Tick Colors
const dayTickColor = "#03254c";
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
const valueClass = document.getElementsByClassName("value");
const ticker = document.getElementById("ticker");

var tickColor;

let today = new Date();

function dayNightMode(
  currHour = today.getUTCHours(),
  currMin = today.getUTCMinutes()
) {
  
  // currHour >= 12 && currMin >= 30 && currHour <= 0
  // currHour >= 1 && currHour <= 13
  if (false) {
    tickColor = dayTickColor;
    bodyElm.style.background = dayBackgroundColor;
    ticker.style.background =  dayTextColor;
    ticker.style.color = nightTextColor;


    for (i = 0; i < textClass.length; i++) {
      textClass[i].style.color = dayTextColor;
    }
    for (i = 0; i < valueClass.length; i++) {
      valueClass[i].style.color = dayTickColor;
    }

    document.getElementById("logo").src = "/img/logo3.png"
    

  } else {
    tickColor = nightTickColor;
    bodyElm.style.background = nightBackgroundColor;
    bodyElm.style.backgroundAttachment = "fixed";
    ticker.style.background =  nightTextColor;
    ticker.style.color = dayTextColor;

    for (i = 0; i < textClass.length; i++) {
      textClass[i].style.color = nightTextColor;
    }
    for (i = 0; i < valueClass.length; i++) {
      valueClass[i].style.color = "yellow";
    }
    document.getElementById("logo").src = "/img/logo4.png"

  }
}

setInterval(dayNightMode,5000);

// heatIndexGauge(50);
// humidityGauge(50);
// thermometer(100,10,true);
// dewpoint(100);
