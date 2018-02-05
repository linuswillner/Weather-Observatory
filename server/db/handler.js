// Server-side database handler
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

/**
 * Get the weather data for each location.
 */
async function getAllData () {
  let res = await r.db(process.env.DB_NAME || 'Weather').table('Observations').run()
  let locations = ['Tokio', 'Helsinki', 'New York', 'Amsterdam', 'Dubai']

  if (!res || res.length === 0) { // Initialise able
    for (let i = 0; i < locations.length; i++) {
      await storeWeatherData(locations[i], null, null)
    }
    getAllData()
  } else {
    return res
  }
}

/**
 * Get weather data for a location.
 * @param {String} locationName - The city to retrieve weather data for. (Tokio/Helsinki/New York/Amsterdam/Dubai)
 * @returns {Object|null} - Weather data if it existed or was recently created, null if an error happened
 */
async function getWeatherData (locationName) {
  let res = await r.db(process.env.DB_NAME || 'Weather').table('Observations').get(locationName).run()

  if (!res || res.length === 0) { // No record yet
    let newData = await storeWeatherData(locationName, null, null) // Store init data
    if (newData.type === 'create') return newData.newDoc
    else return null
  } else { // Return weather data
    return res
  }
}

/**
 * Store weather data for a location.
 * @param {String} locationName - The city to update weather data for. (Tokio/Helsinki/New York/Amsterdam/Dubai)
 * @param {Number} temperature - Temperature observation.
 * @param {Number} createdAt - Date.now() of the observation.
 * @returns {Object<type: String, oldDoc: Object|null, newDoc: Object|null>|null}
 *          Object if the doc was found/created/unmodified, otherwise null
 */
async function storeWeatherData (locationName, temperature, createdAt) {
  let query = await r.db(process.env.DB_NAME || 'Weather').table('Observations').get(locationName).run()

  if (!query || query.length === 0) { // If there is no record of the city, create one
    let res = await r.db(process.env.DB_NAME || 'Weather').table('Observations').insert({
      id: locationName,
      lastUpdate: createdAt,
      temperature: temperature,
      lowest: temperature,
      highest: temperature
    }, { returnChanges: true })

    if (res.inserted) {
      return { type: 'create', oldDoc: null, newDoc: res.changes[0].new_val } // Created
    } else {
      return null // Error
    }
  } else { // Otherwise update
    let res = await r.db(process.env.DB_NAME || 'Weather').table('Observations').get(locationName).update({
      lastUpdate: createdAt,
      temperature: temperature,
      // If lower than previous lowest/not logged, update - otherwise use previous value
      lowest: !query.lowest || temperature < query.lowest ? temperature : query.lowest, // TODO: Zero?
      // Same as above but the other way around
      highest: !query.highest || temperature > query.highest ? temperature : query.highest
    }, { returnChanges: true })

    if (res.inserted || res.replaced) {
      return { type: 'update', oldDoc: res.changes[0].old_val, newDoc: res.changes[0].new_val } // Updated
    } else if (res.unchanged || res.skipped) {
      return { type: 'unmodified', oldDoc: res.changes[0].old_val, newDoc: null } // Unchanged
    } else {
      return null // Error
    }
  }
}

exports.r = r
exports.connectionCheck = connectionCheck
exports.getWeatherData = getWeatherData
exports.storeWeatherData = storeWeatherData
exports.getAllData = getAllData
