const Dash = require('rethinkdbdash')

const r = new Dash({
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || '',
  silent: true,
  servers: [{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }]
})

function connectionCheck () {
  r.expr(1).run().then(res => {
    console.log('Successfully connected to the database!'.green)
    return true
  }).catch(err => {
    if (err.message.includes('failed to open a new one')) {
      console.warn('Could not connect to the database, is it running?'.yellow)
    } else {
      console.error(`An error occurred while connecting to the database: ${err.stack}`.red)
    }
    return false
  })
}

exports.r = r
exports.connectionCheck = connectionCheck
