import * as SA from 'superagent'
import * as config from '../config'
import { emit, emitOne } from './dispatcher'

const baseUrl = `http://${config.api.url}`

function ping () {
  SA
    .get(`${baseUrl}/ping`)
    .auth(config.api.user, config.api.pass)
    .set('Accept', 'application/json')
    .then(() => {
      console.debug('Successfully connected to the weather API.')
      return true
    })
    .catch(err => {
      let error = {
        res: err.response || null,
        msg: err.message
      }

      if (error.msg.includes('the network is offline')) {
        emit('REQUEST_ERROR_OVERLAY', [
          'Yhteyttä API:hin ei voitu muodostaa. (net::ERR_CONNECTION_REFUSED)',
          error.msg,
          'Scythe'
        ])
      }
    })
}

function getWeatherInfo (location) {
  SA
    .get(`${baseUrl}/${location}`)
    .auth(config.api.user, config.api.pass)
    .set('Accept', 'application/json')
    .then(res => {
      localStorage.setItem(res.body.id, JSON.stringify(res.body))
      emitOne('NEW_DATA', res.body.id)
    })
    .catch(err => {
      console.error(`Msg: ${err.message}\nRes: ${err.response}`)
    })
}

function getAllWeatherInfo () {
  SA
    .get(`${baseUrl}/all`)
    .auth(config.api.user, config.api.pass)
    .set('Accept', 'application/json')
    .then(res => {
      for (let i = 0; i < res.body.length; i++) {
        localStorage.setItem(res.body[i].id, JSON.stringify(res.body[i]))
      }
    })
}

function postWeatherInfo (location, temperature, createdAt) {
  SA
    .post(`${baseUrl}/${location}`, {
      location: location,
      temperature: temperature,
      createdAt: createdAt
    })
    .auth(config.api.user, config.api.pass)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .then(res => {
      if (res.body.modified === true) {
        localStorage.setItem(res.body.new.id, JSON.stringify(res.body.new))
        emitOne('NEW_DATA', res.body.new.id)
      }
    })
    .catch(err => {
      console.error(`Msg: ${err.message}\nRes: ${err.response}`)
    })
}

export { ping, getWeatherInfo, getAllWeatherInfo, postWeatherInfo }
