const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=metric&appid=b171d013fe581140e8054ab41bc9dcc5';

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.message) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, 'Today\'s weather forecast: ' + body.daily[0].weather[0].description.toUpperCase() + '. Min and max temperatures are ' + body.daily[0].temp.min + '\xB0c and ' + body.daily[0].temp.max + '\xB0c, respectively. It is currently ' + body.current.temp + '\xB0c out. There is a ' + Math.round(body.daily[0].pop*100) + '% chance of rain today.')
    }
  })
};

module.exports = forecast
