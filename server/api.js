// Main file of the server-side API
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const connectionCheck = require('./db/handler.js').connectionCheck
const colors = require('colors')

process.title = 'Weather API'

// Use env vars in production
if (process.env.NODE_ENV === 'production') require('dotenv').load()
else console.log('Running in development, not loading environment variables.'.yellow)

// Router
const routes = require('./routes/router.js')

// Check database connection
connectionCheck()

// Create main Express instance
const app = express()

// Modules
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet({
  noCache: true
}))

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ error: err.message })
})

// Route config
app.use('/', routes)

const server = app.listen(process.env.API_PORT || 8010, process.env.API_HOST || 'localhost', () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Weather API started on http://${host}:${port}`.green)
})
