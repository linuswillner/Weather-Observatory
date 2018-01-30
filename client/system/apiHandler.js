import * as SA from 'superagent'
import * as config from '../config'

const baseUrl = `http://${config.api.url}`

function getWeatherInfo (location) {
  SA
    .get(`${baseUrl}/${location}`)
    .auth(config.api.user, config.api.pass)
    .set('Accept', 'application/json')
    .then(res => {
      console.log(JSON.parse(res))
    })
    .catch(err => {
      console.error(`Msg: ${err.message}\nRes: ${err.response}`)
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
      console.log(JSON.parse(res))
    })
    .catch(err => {
      console.error(`Msg: ${err.message}\nRes: ${err.response}`)
    })
}

export { getWeatherInfo, postWeatherInfo }
