
// document.getElementById("hi").innerHTML = "hello";
temperature = 0;
heatIndex = 0;
humidity = 0;
dew = 0;
// Slideslow
$(function () {
  $("#mySlideshow").mixSlide({
    animation: {
      speed: 1,
      delay: 3,
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
  if(progressAmount>24.67 && progressAmount<31.89){
    color = "rgb(10, 180, 38)"
    inset="#228B22"

    
  }
  else if(progressAmount>=31.89){
    color= "#B7121F"
    inset="#FF7F7F"
  }
  else{
    color= "#408f90"
    inset="#ADD8E6"
  }
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

    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
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
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
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
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: "#6F6EA0", // Colors
    colorStop: "#C0C0DB", // just experiment with them
    strokeColor: "#EEEEEE", // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support
    staticZones: [
      { strokeStyle: "rgb(0,255,0)", min: 0, max: 26, height: 1.4 },
      { strokeStyle: "rgb(100,200,0)", min: 27, max: 32, height: 1.4 },
      { strokeStyle: "rgb(150,150,0)", min: 33, max: 39, height: 1.4 },
      { strokeStyle: "#FFA500", min: 40, max: 52, height: 1.4 },
      { strokeStyle: "rgb(255,0,0)", min: 53, max: 60, height: 1.4 },
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
  var cnt = document.getElementById("count");
  var water = document.getElementById("water");
  var percent = 0;
  var interval;
  // let today = new Date();
  interval = setInterval(function () {
    // var sec =today.getSeconds()
    percent++;
    cnt.innerHTML = percent;
    water.style.transform = "translate(0" + "," + (100 - percent/50*100) + "%)";
    if (percent == value) {
      clearInterval(interval);
    }
  }, 60);
}
