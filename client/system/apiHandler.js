import * as SA from 'superagent'
import * as config from '../config'
import { emit, emitOne } from './dispatcher'

const baseUrl = config.api.url

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
      if (err.message.includes('the network is offline')) {
        emit('REQUEST_ERROR_OVERLAY', [
          'Could not connect to the API. (net::ERR_CONNECTION_REFUSED)',
          err.message,
          'Lynx'
        ])
      } else {
        emit('REQUEST_ERROR_OVERLAY', [
          'There was an error in the API. (Unknown Exception)',
          err.message,
          'Canis'
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
      emit('REQUEST_ALERT', [
        'Virhe',
        [
          <p>An error occurred in the application. Please inform the site owner of this occurrence (<b>hello@linuswillner.me</b>).</p>,
          <p>Submit the following data with the report.</p>,
          <p><b>getWeatherInfo:</b> {err.message}</p>
        ]
      ])
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
      emit('REQUEST_ALERT', [
        'Virhe',
        [
          <p>An error occurred in the application. Please inform the site owner of this occurrence (<b>hello@linuswillner.me</b>).</p>,
          <p>Submit the following data with the report.</p>,
          <p><b>postWeatherInfo:</b> {err.message}</p>
        ]
      ])
    })
}

export { ping, getWeatherInfo, getAllWeatherInfo, postWeatherInfo }
