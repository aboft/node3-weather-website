const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/3eba448fd15536cddd8c6daf43978594/${lat},${long}`

  request ({url, json: true,}, (error, {body}) => {
    if (error){
      callback('Unable to connect to API.', undefined)
    }else if (body.error){
      callback(`Unable to find location: ${body.error}`, undefined)
    }else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees outside with a ${body.currently.precipProbability}% of rain.`)
    }
  })
}

module.exports = forecast
