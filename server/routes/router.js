// API router
const router = require('express').Router()

// Routes
const getAll = require('./getAll.js')
const getWeather = require('./getWeather.js')
const storeWeather = require('./storeWeather.js')

router.all('/', (req, res) => {
  res.status(400).send('No location provided!')
})

router.get('/ping', (req, res) => {
  res.status(200).send('Pong!')
})

router.get('/all', (req, res) => {
  getAll(req, res)
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
