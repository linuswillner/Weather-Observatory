// Main database handler
import { Database } from 'arangojs'
import * as config from '../config'

const db = new Database({
  url: config.arangoUrl || 'http://localhost:8529'
})

db.useDatabase(config.arangoDbName || 'weather')
db.useBasicAuth(config.arangoUser || 'arango', config.arangoPass || '')

export { db }
