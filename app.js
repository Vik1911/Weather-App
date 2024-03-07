const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "05e7b3c27e95b19a082edff6dee1042f";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {

        // console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temprature in " + query + " is " + temp + " degrees celcius.</h1>");
            res.write("<h3>The Weather is currently " + weatherDescription + "</h3>");
            res.write("<img src=" + imgURL + ">");
            res.send();

        })

    })

})

app.listen(3000, function () {
    console.log("Server is started at port 3000");
})