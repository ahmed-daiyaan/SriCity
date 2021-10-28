//Listen to data sent from server, calculate & allot to variables for display
async function initSocketIO() {
  const socket = io();
  socket.on("dataResults", (data) => {
    temperature = data["air_temperature"];
    document.getElementById("tempValue").innerHTML = temperature + "° C";
    humidity = data["humidity"];
    document.getElementById("humidityValue").innerHTML = humidity + "%";
    dew = Math.round(
      (243.04 *
        (Math.log(humidity / 100) +
          (17.625 * temperature) / (243.04 + temperature))) /
        (17.625 -
          Math.log(humidity / 100) -
          (17.625 * temperature) / (243.04 + temperature))
    );
    document.getElementById("dewValue").innerHTML = dew + "° C";
    temp = (temperature * 9) / 5 + 32;
    hum = humidity;
    heatIndex = Math.round(
      (-42.379 +
        2.04901523 * temp +
        10.14333127 * hum -
        0.22475541 * temp * hum -
        0.00683783 * temp * temp -
        0.05481717 * hum * hum +
        0.00122874 * temp * temp * hum +
        0.00085282 * temp * hum * hum -
        0.00000199 * temp * temp * hum * hum -
        32) /
        1.8
    );

    document.getElementById("heatIndexValue").innerHTML = heatIndex + "° C";

    pm10 = data["pm10"];
    var pm10_subIndex = 0;
    if (pm10 <= 50) pm10_subIndex = pm10;
    else if (pm10 > 50 && pm10 <= 100) pm10_subIndex = pm10;
    else if (pm10 > 100 && pm10 <= 250)
      pm10_subIndex = 100 + ((pm10 - 100) * 100) / 150;
    else if (pm10 > 250 && pm10 <= 350) pm10_subIndex = 200 + (pm10 - 250);
    else if (pm10 > 350 && pm10 <= 430)
      pm10_subIndex = 300 + ((pm10 - 350) * 100) / 80;
    else if (pm10 > 430) pm10_subIndex = 400 + ((pm10 - 430) * 100) / 80;
    pm25 = data["pm25"];
    var pm25_subIndex;
    if (pm25 <= 30) pm25_subIndex = (pm25 * 50) / 30;
    else if (pm25 > 30 && pm25 <= 60)
      pm25_subIndex = 50 + ((pm25 - 30) * 50) / 30;
    else if (pm25 > 60 && pm25 <= 90)
      pm25_subIndex = 100 + ((pm25 - 60) * 100) / 30;
    else if (pm25 > 90 && pm25 <= 120)
      pm25_subIndex = 200 + ((pm25 - 90) * 100) / 30;
    else if (pm25 > 120 && pm25 <= 250)
      pm25_subIndex = 300 + ((pm25 - 120) * 100) / 130;
    else if (pm25 > 250) pm25_subIndex = 400 + ((pm25 - 250) * 100) / 130;
    no2 = data["so2"];
    var so2_subIndex;
    if (so2 <= 40) so2_subIndex = (so2 * 50) / 40;
    else if (so2 > 40 && so2 <= 80) so2_subIndex = 50 + ((so2 - 40) * 50) / 40;
    else if (so2 > 80 && so2 <= 380)
      so2_subIndex = 100 + ((so2 - 80) * 100) / 300;
    else if (so2 > 380 && so2 <= 800)
      so2_subIndex = 200 + ((so2 - 380) * 100) / 420;
    else if (so2 > 800 && so2 <= 1600)
      so2_subIndex = 300 + ((so2 - 800) * 100) / 800;
    else if (so2 > 1600) so2_subIndex = 400 + ((so2 - 1600) * 100) / 800;
    no2 = data["no2"];
    var no2_subIndex;
    if (no2 <= 40) no2_subIndex = (no2 * 50) / 40;
    else if (no2 > 40 && no2 <= 80) no2_subIndex = 50 + ((no2 - 40) * 50) / 40;
    else if (no2 > 80 && no2 <= 180)
      no2_subIndex = 100 + ((no2 - 80) * 100) / 100;
    else if (no2 > 180 && no2 <= 280)
      no2_subIndex = 200 + ((no2 - 180) * 100) / 100;
    else if (no2 > 280 && no2 <= 400)
      no2_subIndex = 300 + ((no2 - 280) * 100) / 120;
    else if (no2 > 400) no2_subIndex = 400 + ((no2 - 400) * 100) / 120;
    co = data["co"];
    var co_subIndex;
    if (co <= 1) co_subIndex = (co * 50) / 1;
    else if (co > 1 && co <= 2) co_subIndex = 50 + ((co - 1) * 50) / 1;
    else if (co > 2 && co <= 10) co_subIndex = 100 + ((co - 2) * 100) / 8;
    else if (co > 10 && co <= 17) co_subIndex = 200 + ((co - 10) * 100) / 7;
    else if (co > 17 && co <= 34) co_subIndex = 300 + ((co - 17) * 100) / 17;
    else if (co > 34) co_subIndex = 400 + ((co - 34) * 100) / 17;
    o3 = data["o3"];
    var o3_subIndex;
    if (o3 <= 50) o3_subIndex = (o3 * 50) / 50;
    else if (o3 > 50 && o3 <= 100) o3_subIndex = 50 + ((o3 - 50) * 50) / 50;
    else if (o3 > 100 && o3 <= 168) o3_subIndex = 100 + ((o3 - 100) * 100) / 68;
    else if (o3 > 168 && o3 <= 208) o3_subIndex = 200 + ((o3 - 168) * 100) / 40;
    else if (o3 > 208 && o3 <= 748)
      o3_subIndex = 300 + ((o3 - 208) * 100) / 539;
    else if (o3 > 748) o3_subIndex = 400 + ((o3 - 400) * 100) / 539;
    airQualityIndex = Math.round(
      Math.max(
        pm10_subIndex,
        pm25_subIndex,
        o3_subIndex,
        no2_subIndex,
        co_subIndex,
        so2_subIndex
      )
    );
      document.getElementById("airQualityIndexValue").innerHTML = airQualityIndex;
      document.getElementById("pm10Value").innerHTML = pm10;
      document.getElementById("pm25Value").innerHTML = pm25;
      
    console.log("pm10");
    console.log(pm10_subIndex);
    console.log("pm25");
    console.log(pm25_subIndex);
    console.log("o3");
    console.log(o3_subIndex);
    console.log("no2");
    console.log(no2_subIndex);
    console.log("co");
    console.log(co_subIndex);
  });
}
initSocketIO();
