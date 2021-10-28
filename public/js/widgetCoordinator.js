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
const backgroundClasses = document.getElementsByClassName("body");
const textClass = document.getElementsByClassName("text");
const valueClass = document.getElementsByClassName("value");
const smallValueClass = document.getElementsByClassName("small-value");
// const ticker = document.getElementById("ticker");

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
    
    for (i = 0; i < backgroundClasses.length; i++){
      backgroundClasses[i].style.background = dayBackgroundColor;
    }
    for (i = 0; i < textClass.length; i++) {
      textClass[i].style.color = dayTextColor;
    }
    for (i = 0; i < valueClass.length; i++) {
      valueClass[i].style.color = dayTickColor;
    }
    for (i = 0; i < smallValueClass.length; i++) {
      smallValueClass[i].style.color = dayTickColor;
    }
    document.getElementById("pm10").style.backgroundColor = "#FFFFFF";
    document.getElementById("pm10").style.color = "#000000";
     document.getElementById("pm25").style.backgroundColor = "#FFFFFF";
document.getElementById("pm25").style.color = "#000000";
    document.getElementById("logo").src = "/img/logo_day.png"
    

  } else {
    tickColor = nightTickColor;
    bodyElm.style.background = nightBackgroundColor;
    bodyElm.style.backgroundAttachment = "fixed";
    
    
    for (i = 0; i < backgroundClasses.length; i++){
      backgroundClasses[i].style.background = nightBackgroundColor;
    }
    for (i = 0; i < textClass.length; i++) {
      textClass[i].style.color = nightTextColor;
    }
    for (i = 0; i < valueClass.length; i++) {
      valueClass[i].style.color = "yellow";
    }
    for (i = 0; i < smallValueClass.length; i++) {
      smallValueClass[i].style.color = nightTickColor;
    }
    document.getElementById("pm10").style.backgroundColor = "#000000";
    document.getElementById("pm10").style.color = "#FFFFFF";
     document.getElementById("pm25").style.backgroundColor = "#000000";
document.getElementById("pm25").style.color = "#FFFFFF";
    document.getElementById("logo").src = "/img/logo_night.png"

  }
}
dayNightMode();
setInterval(dayNightMode,5000);

// heatIndexGauge(50);
// humidityGauge(50);
// thermometer(100,10,true);
// dewpoint(100);
