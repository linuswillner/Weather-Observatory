// Getter for all weather data
const getAllData = require('../db/handler.js').getAllData

async function getAll (req, res) {
  let data = await getAllData()

  if (!data) res.status(500).send({ message: 'An error occurred while storing the data' })
  else res.status(200).send(data)
}

module.exports = getAll
