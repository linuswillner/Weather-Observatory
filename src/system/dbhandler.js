// Database handler
import Loki from 'lokijs'

const db = new Loki('data.db', {
  env: 'BROWSER',
  autoload: true,
  autoloadCallback: init,
  autosave: true,
  autosaveInterval: 5000
})

function init () {
  let weather = db.getCollection('weather')
  if (weather === null) {
    weather = db.addCollection('weather')
    console.debug('Initialised database.')
  } else console.debug('Database has been loaded.')
}

export { db, init }
