const router = require('express').Router()

// Routes
const hello = require('./hello.js')

router.all('/', (req, res) => {
  res.send({
    message: 'No route provided, please select the appropriate route!'
  })
})

router.get('/hello', (req, res) => {
  hello(req, res)
})

module.exports = router
