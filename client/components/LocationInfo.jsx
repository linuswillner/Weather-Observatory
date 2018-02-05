// Location information card for the sidebar
import React from 'react'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import * as Colors from 'material-ui/styles/colors'
import * as config from '../config'
import { dispatcher, emitOne } from '../system/dispatcher'
import { getWeatherInfo } from '../system/apiHandler';

const styles = {
  cold: {
    subZero: {
      color: Colors.blue300
    },
    subTen: {
      color: Colors.indigo500,
      fontWeight: 'bold'
    },
    subTwentyFive: {
      color: Colors.indigo900,
      fontWeight: 'bolder'
    }
  },
  warm: {
    plusZero: {
      color: Colors.red400
    },
    plusTen: {
      color: Colors.red600,
      fontWeight: 'bold'
    },
    plusTwentyFive: {
      color: Colors.red900,
      fontWeight: 'bolder'
    }
  },
  default: {
    color: 'inherit'
  }
}

export default class LocationInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: null, // Prevent infinite loop
      temperature: '-',
      highestTemp: '-',
      lowestTemp: '-'
    }
  }

  determineHeatLevel (temp) {
    let warm = styles.warm
    let cold = styles.cold
    let def = styles.default

    // Ignore NaN values
    if (isNaN(temp)) return def

    // Check warm
    if (temp > 0 && temp < 10) return warm.plusZero
    else if (temp >= 10 && temp < 25) return warm.plusTen
    else if (temp >= 25) return warm.plusTwentyFive

    // Check cold
    else if (temp < 0 && temp > -10) return cold.subZero
    else if (temp <= -10 && temp > -25) return cold.subTen
    else if (temp <= -25) return cold.subTwentyFive

    // The value is zero, so return default style
    else return def
  }

  render () {
    dispatcher.once('NEW_DATA', (arg) => {
      if (arg === this.props.location) {
        let data = localStorage.getItem(arg)
        data = JSON.parse(data)
        // Prevent infinite loop
        if (this.state.location !== this.props.location) {
          this.setState({
            location: this.props.location,
            temperature: data.temperature,
            highestTemp: data.highest,
            lowestTemp: data.lowest
          })
        }
      }
    })

    dispatcher.once('MARKER_CLICKED', (args) => {
      getWeatherInfo(args[0])
    })

    return (
      <Card>
        <CardMedia>
          <img src={this.props.image} alt={''} height={150} />
        </CardMedia>
        <CardTitle
          title={this.props.location}
          subtitle={this.props.country}
        />
        <CardText>
          <p>
            Lämpötila:
            <span style={this.determineHeatLevel(this.state.temperature)}>
              {` ${this.state.temperature ? this.state.temperature : '-'}`}
            </span>
          </p>
          <p>
            Korkein lämpötila (24h):
            <span style={this.determineHeatLevel(this.state.highestTemp)}>
              {` ${this.state.highestTemp ? this.state.highestTemp : '-'}`}
            </span>
          </p>
          <p>
            Matalin lämpötila (24h):
            <span style={this.determineHeatLevel(this.state.lowestTemp)}>
              {` ${this.state.lowestTemp ? this.state.lowestTemp : '-'}`}
            </span>
          </p>
        </CardText>
        <CardActions>
          <FlatButton
            icon={<i className={'material-icons'}>add_circle_outline</i>}
            label={'Lisää havainto'}
            onClick={() => { emitOne('REQUEST_DIALOG', this.props.location) }}
          />
        </CardActions>
      </Card>
    )
  }
}
