//Listen to data sent from server, calculate & allot to variables for display
async function initSocketIO() {
    const socket = io();
    socket.on("dataResults", data => {
        temperature = data["air_temperature"];
        document.getElementById("tempValue").innerHTML = temperature + '° C';
        humidity = data["humidity"];
        document.getElementById("humidityValue").innerHTML = humidity + '%';
        dew = Math.round(243.04 * (Math.log(humidity / 100) + ((17.625 * temperature) / (243.04 + temperature))) / (17.625 - Math.log(humidity / 100) - ((17.625 * temperature) / (243.04 + temperature))))
        document.getElementById("dewValue").innerHTML = dew + '° C';
        temp = (temperature * 9 / 5) + 32;
        hum = humidity;
        heatIndex = Math.round(((-42.379 + 2.04901523 * temp + 10.14333127 * hum - .22475541 * temp * hum - .00683783 * temp * temp - .05481717 * hum * hum + .00122874 * temp * temp * hum + .00085282 * temp * hum * hum - .00000199 * temp * temp * hum * hum) - 32) / 1.8);

        document.getElementById("heatIndexValue").innerHTML = heatIndex + '° C';
    });

}
initSocketIO();