const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=metric&appid=b171d013fe581140e8054ab41bc9dcc5';

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.message) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, body.daily[0].weather[0].description.toUpperCase() + '. It is currently ' + body.current.temp + ' degrees out. There is a ' + Math.round(body.hourly[0].pop*100) + '% chance of rain.')
    }
  })
};

module.exports = forecast
