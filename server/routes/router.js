// API router
const router = require('express').Router()

// Routes
const getWeather = require('./getWeather.js')
const storeWeather = require('./storeWeather')

router.all('/', (req, res) => {
  res.status(404).send('No location provided!')
})

router.get('/:location', (req, res) => {
  if (!req.params.location) res.status(400).send('No location provided!')
  else getWeather(req, res)
})

router.post('/:location', (req, res) => {
  if (!req.params.location) res.status(400).send('No location provided!')
  else if (!req.body.temperature) res.status(400).send('No temperature provided!')
  else if (!req.body.createdAt) res.status(400).send('No creation time provided!')
  else storeWeather(req, res)
})

module.exports = router
