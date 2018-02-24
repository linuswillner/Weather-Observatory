const Dash = require('rethinkdbdash')
require('dotenv').config()
require('colors')

console.log('Initialising...'.green)

const r = new Dash({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  silent: true,
  servers: [{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }]
})

let tables = ['Observations']

r.db('Weather').tableList().then(list => {
  console.log(`Database Weather exists, checking for tables...`.green)
  if (tables.some(table => list.includes(table)) || tables.some(table => !list.includes(table))) {
    loop(tables[0])
  }
}).catch(e => {
  if (e.msg === 'None of the pools have an opened connection and failed to open a new one') {
    console.error('Could not connect to the RethinkDB instance, make sure it is running!'.red)
    process.exit(1)
  } else if (e.msg === `Database \`Weather\` does not exist.`) {
    console.log('Creating database and tables, this may take a little while.'.green)
    r.dbCreate('Weather').run().then(() => {
      loop(tables[0])
    }).catch(e => {
      console.error(e)
      drainAndExit(1)
    })
  } else {
    console.error(e)
    process.exit(1)
  }
})

function loop (t) {
  if (tables.length > 0) {
    checkTable(t).then((e) => {
      console.log(e)
      tables.shift()
      loop(tables[0])
    }).catch((err) => {
      console.error(err)
      drainAndExit(1)
    })
  } else {
    process.exit(0)
  }
}

function checkTable (table) {
  return new Promise(function (resolve, reject) {
    r.db('Weather').tableCreate(table).run().then(() => {
      resolve(`The table ${table} has been created.`.green)
    }).catch(e => {
      if (e.msg === `Table \`Weather.${table}\` already exists.`) {
        resolve(`The table ${table} already exists.`.yellow)
      } else {
        reject(e)
      }
    })
  })
}

function drainAndExit (exitCode) {
  r.getPoolMaster().drain().then(() => {
    process.exit(exitCode)
  })
}
