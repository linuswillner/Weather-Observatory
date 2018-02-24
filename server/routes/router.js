// API router
const router = require('express').Router()

// Routes
const getAll = require('./getAll.js')
const getWeather = require('./getWeather.js')
const storeWeather = require('./storeWeather.js')

router.all('/api', (req, res) => {
  res.status(400).send({ message: 'No location provided!' })
})

router.get('/api/ping', (req, res) => {
  res.status(200).send({ message: 'Pong!' })
})

router.get('/api/all', (req, res) => {
  getAll(req, res)
})

router.get('/api/:location', (req, res) => {
  if (!req.params.location) res.status(400).send({ message: 'No location provided!' })
  else getWeather(req, res)
})

router.post('/api/:location', (req, res) => {
  if (!req.params.location) res.status(400).send({ message: 'No location provided!' })
  else if (!req.body.temperature) res.status(400).send({ message: 'No temperature provided!' })
  else if (!req.body.createdAt) res.status(400).send({ message: 'No creation time provided!' })
  else storeWeather(req, res)
})

module.exports = router
