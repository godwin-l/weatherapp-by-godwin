const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '9ae40b8fdec0b4d7bc95aa14b4393ce3';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9ae40b8fdec0b4d7bc95aa14b4393ce3`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = 
	   `City Name    :${weather.name},             
		Temperature   :${weather.main.temp} Degree Celsius,                                                                                                                                      
		Pressure      :${weather.main.pressure} hPa,
		Humidity      :${weather.main.humidity} %,
		Minimum Temp  :${weather.main.temp_min} Degree Celsius,
		Maximum Temp  :${weather.main.temp_max} Degree Celsius,
		Sea Level     :${weather.main.sea_level} hPa,
		Ground Level  :${weather.main.grnd_level} hPa,
		Wind Speed    :${weather.wind.speed} meter/sec,
		Wind Direction:${weather.wind.deg} Degrees,
		Latitude      :${weather.coord.lon} Degrees,
		Longnitude    :${weather.coord.lat} Degrees,
		Country       :${weather.sys.country},
		Cloudliness   :${weather.clouds.all} %,
		Sunrise       :${weather.sys.sunrise} UTC,
		Sunset        :${weather.sys.sunset} UTC.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
