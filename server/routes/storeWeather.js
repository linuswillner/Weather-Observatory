// Weather data setter route
const storeWeatherData = require('../db/handler.js').storeWeatherData

async function storeWeather (req, res) {
  /*
    Required request body params:
      [UI] temperature (Number) - The temperature observation
      [AUTO] createdAt (Number) - The time when the observation was submitted
  */

  const cityRegex = /Tokio|Helsinki|New York|Amsterdam|Dubai/gi

  // All of this is already checked client-side, but this is just an extra verification layer

  if (isNaN(req.body.temperature)) { // Checking that temperature is a number
    res.status(400).send('Temperature was not a number!')
  } else if (isNaN(req.body.createdAt)) { // Checking that the time of creation is Date.now()
    res.status(400).send('Time of creation was not an integer!')
  } else if (req.params.location.match(cityRegex) === null) { // Checking that the location is valid
    res.status(400).send('Location was not one of the following: Tokio, Helsinki, New York, Amsterdam, Dubai')
  } else {
    let data = await storeWeatherData(req.params.location, req.body.temperature, req.body.createdAt)

    switch (data.type) {
      case 'create':
        res.status(201).send({ modified: true, old: data.oldDoc, new: data.newDoc })
        break
      case 'update':
        res.status(200).send({ modified: true, old: data.oldDoc, new: data.newDoc })
        break
      case 'unmodified':
        res.status(304).send({ modified: false, old: data.oldDoc, new: data.newDoc })
        break
      default:
        res.status(500).send({ message: 'An error occured, data could not be stored' })
        break
    }
  }
}

module.exports = storeWeather
