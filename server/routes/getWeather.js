// Weather data getter route
const getWeatherData = require('../db/handler.js').getWeatherData

async function getWeather (req, res) {
  /*
    Required request body params:
      [AUTO] location (String) - The location for which weather data is being requested
  */

  const cityRegex = /Tokio|Helsinki|New York|Amsterdam|Dubai/gi

  if (req.params.location.match(cityRegex) === null) { // Location validity check
    res.status(400).send('Location was not one of the following: Tokio, Helsinki, New York, Amsterdam, Dubai')
  }

  let data = await getWeatherData(req.params.location)

  if (data === null) res.status(500).send({ message: 'An error occurred while storing the data' })
  else res.status(200).send({ data: data })
}

module.exports = getWeather
