const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = `${req.body.cityName}`;
  const endpoint = "https://api.openweathermap.org/data/2.5/weather?";
  const appid = "4938edcfef648165a938c68faa59af33";
  const url = "" + endpoint + "q=" + query + "&units=metric&appid=" + appid;
  console.log(url);
  https.get(url, (response) => {
    // to request the module
    response.on("data", (data) => {
      // when the data starts commming
      const weather_data = JSON.parse(data); // to convert JSON into JS object
      console.log(weather_data);
      const temp = weather_data.main.temp; // to access the particular data from object
      const description = weather_data.weather[0].description;
      console.log(temp);
      res.write("<p> description : " + description + "</p>");
      res.write("<h1>temp :" + temp + " </h1>");
      const iconCode = weather_data.weather[0].icon;
      //   console.log(iconCode);
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      res.write("<img src=" + iconUrl + "> ");
      res.send();
    });
  });
  //   console.log(req.body.cityName);
  console.log("post request recieved");
});
app.listen(3000, function () {
  console.log("Server is running at port 3000....");
});
