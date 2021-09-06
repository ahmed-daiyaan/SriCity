function thermometer(goalAmount, progressAmount, animate) {
  "use strict";
  var $thermo = $("#thermometer"),
    $progress = $(".progress", $thermo),
    $goal = $(".goal", $thermo),
    percentageAmount;

  (goalAmount = goalAmount || parseFloat($goal.text())),
    (progressAmount = progressAmount || parseFloat($progress.text())),
    (percentageAmount = Math.min(
      Math.round((progressAmount / goalAmount) * 1000) / 10,
      100
    )); //make sure we have 1 decimal point

  $goal.find(".amount").text();
  $progress.find(".amount").text();

  $progress.find(".amount").hide();
  if (animate !== false) {
    $progress.animate(
      {
        height: percentageAmount + "%",
      },
      1200,
      function () {
        $(this).find(".amount").fadeIn(200);
      }
    );
  } else {
    $progress.css({
      height: percentageAmount + "%",
    });
    $progress.find(".amount").fadeIn(200);
  }
}

function humidityGauge(value) {
  var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: "#000000", // Fill color
    },
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
    angle: 0.13, // The span of the gauge arc
    lineWidth: 0.3, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.54, // // Relative to gauge radius
      strokeWidth: 0.055, // The thickness
      color: "#000000", // Fill color
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: "#6F6EA0", // Colors
    colorStop: "#C0C0DB", // just experiment with them
    strokeColor: "#EEEEEE", // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support
    staticZones: [
      { strokeStyle: "rgb(255,0,0)", min: 0, max: 500, height: 1.4 },
      { strokeStyle: "rgb(200,100,0)", min: 500, max: 1000, height: 1.2 },
      { strokeStyle: "rgb(150,150,0)", min: 1000, max: 1500, height: 1 },
      { strokeStyle: "rgb(100,200,0)", min: 1500, max: 2000, height: 0.8 },
      { strokeStyle: "rgb(0,255,0)", min: 2000, max: 3100, height: 0.6 },
    ],
  };
  var target = document.getElementById("heatIndex"); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 3000; // set max gauge value
  gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  gauge.set(1250); // set actual value
}
function dewpoint(value) {
  const labels = ["", "", "", "", "", "", "", "", "", "", "", ""];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
    },
  };

  var myChart = new Chart(document.getElementById("myChart"), config);
}


// heatIndexGauge(50);
// humidityGauge(50);
// thermometer(100,10,true);
// dewpoint(100);
