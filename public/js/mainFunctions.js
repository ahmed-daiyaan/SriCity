
temperature = 0;
heatIndex = 0;
humidity = 0;
dew = 0;
pm25 = 0;
pm10 = 0;
co = 0;
no2 = 0;
o3 = 0;
so2 = 0;
airQualityIndex = 0;
// Slideslow
$(function () {
  $("#mySlideshow").mixSlide({
    animation: {
      speed: 1,
      delay: 10,
    },
    transition: {
      name: "fade",
    },
    controls: {
      // enable/disable
      active: false,
      // top, bottom, left, right, center
      // top-left, top-right
      // bottom-left, bottom-right
      position: "bottom",
    },
    labels: {
      // enable/disable
      active: false,
      // top, bottom, left, right, center
      // top-left, top-right
      // bottom-left, bottom-right
      position: "top-left",
    },
    thumbs: {
      // enable/disable
      active: false,
      // top, bottom, left, right, center
      // top-left, top-right
      // bottom-left, bottom-right
      position: "bottom",
    },
    fullscreen: true,
  });
});

function thermometer(goalAmount, progressAmount, animate) {
  var a  = progressAmount/60*24.96;
  var color;
  var inset;
  
    color = "rgb(10, 180, 38)"
    inset="#228B22"

  document.getElementById('thermoAnim').innerHTML = `@keyframes heat 
  { 
    from
    {
      height: 2vw;background-color: #408f90;
        box-shadow:
        inset 22px 0 0 rgba(5,15,25,.15),
        inset -6px 0 0 rgba(255,255,255,.1);
    }
    to{
        height: `+a+`vw;
        background-color: `+color+`;
        box-shadow:
        inset 22px 0 0 rgba(5,15,25,.15),
        inset -6px 0 0 rgba(255,255,255,.1),
        0 0 5px rgb(255,255,255),
        0 0 20px `+inset+`;
    }
}` ;
 
}

function humidityGauge(value) {
  var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.5, // // Relative to gauge radius
      strokeWidth: 0.055, // The thickness
      color: tickColor, // Fill color
    },
    // staticLabels: {
    //   font: "6vh Poppins",  // Specifies font
    //   labels: [0, 20, 40, 60, 80, 100],  // Print labels at these values
    //   color: tickColor,  // Optional: Label text color
    //   fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    // },
    
    limitMax: true, // If false, max value increases automatically if value > maxValue
    limitMin: true, // If true, the min value of the gauge will be fixed
    colorStart: "#6FADCF", // Colors
    colorStop: "#8FC0DA", // just experiment with them
    strokeColor: "#E0E0E0", // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support
    percentColors: [
      [0.0, "#667E2C"],
      [0.5, "#67B7D1"],
      [1.0, "#00FFFF"],
    ],
    //     pointer: {
    //   // Extra optional pointer options:
    //   iconPath: 'img/drop.png',  // Icon image source
    //   iconScale: 0.15,    // Size scaling factor
    //   iconAngle: 0.0  // Rotation offset angle, degrees
    // },
  };
  var target = document.getElementById("humidity"); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 100; // set max gauge value
  gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 50; // set animation speed (32 is default value)
  gauge.set(value); // set actual value
}

function heatIndexGauge(value) {
  
  var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.3, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.5, // // Relative to gauge radius
      strokeWidth: 0.055, // The thickness
      color: tickColor, // Fill color
    },
    limitMax: true, // If false, max value increases automatically if value > maxValue
    limitMin: true, // If true, the min value of the gauge will be fixed
    colorStart: "#6F6EA0", // Colors
    colorStop: "#C0C0DB", // just experiment with them
    strokeColor: "#EEEEEE", // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support
    staticZones: [
      { strokeStyle: "rgb(0,255,0)", min: 0, max: 26, height: 1.4 },
      { strokeStyle: "#AAFF00", min: 27, max: 32, height: 1.4 },
      { strokeStyle: "rgb(150,150,0)", min: 33, max: 39, height: 1.4 },
      { strokeStyle: "rgb(255,0,0)", min: 40, max: 52, height: 1.4 },
      { strokeStyle: "#8B0000", min: 53, max: 60, height: 1.4 },
    ],
  };
  var target = document.getElementById("heatIndex"); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 60; // set max gauge value
  gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  if (value > 60) {
    value=60
  }
  gauge.set(value); // set actual value
}
function dewpoint(value) {
  
  var water = document.getElementById("water");
  var percent = 0;
  var interval;
  // let today = new Date();
  interval = setInterval(function () {
    // var sec =today.getSeconds()
    percent++;
    
    water.style.transform = " rotate(45deg) translate(0" + "," + (100 - percent/50*100) + "%)";
    if (percent == value) {
      clearInterval(interval);
    }
  }, 130);
}

function airQualityIndexGauge(value) {
  var opts = {
  angle: -0.03, // The span of the gauge arc
  lineWidth: 0.3, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.5, // // Relative to gauge radius
    strokeWidth: 0.049, // The thickness
    color: tickColor, // Fill color
  },
  limitMax: true,     // If false, max value increases automatically if value > maxValue
  limitMin: true,     // If true, the min value of the gauge will be fixed
  colorStart: '#6F6EA0',   // Colors
  colorStop: '#C0C0DB',    // just experiment with them
  strokeColor: '#EEEEEE',  // to see which ones work best for you
    generateGradient: true,
  staticZones: [
   {strokeStyle: "#008000", min: 0, max: 50}, // Red from 100 to 130
   {strokeStyle: "#dfff00", min: 51, max: 100}, // Yellow
   {strokeStyle: "#ffd700", min: 101, max: 200}, // Green
   {strokeStyle: "#c69f26", min: 201, max: 300}, // Yellow
    { strokeStyle: "#F03E3E", min: 301, max: 400 }, // Red
   {strokeStyle: "#993300", min: 401, max: 500}
],
  highDpiSupport: true,     // High resolution support
  
};
var target = document.getElementById('airQualityIndex'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 500; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 50; // set animation speed (32 is default value)
gauge.set(value); // set actual value
}
