// Location information card for the sidebar
import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import * as Colors from 'material-ui/styles/colors'
import Spacer from './Spacer'
import * as config from '../config'
import { dispatcher, emitOne } from '../system/dispatcher'
import { getWeatherInfo } from '../system/apiHandler'
import { isOlderThan24Hours } from '../system/utils'

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
  },
  tipText: {
    color: 'gray',
    fontWeight: 'lighter'
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

    if (isNaN(temp)) return def
    else {
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
            lastUpdate: data.lastUpdate,
            temperature: data.temperature,
            highestTemp: data.highest,
            lowestTemp: data.lowest
          })
        }
      }
    })

    dispatcher.once('MARKER_CLICKED', (args) => {
      // Potential leak here, this may get registered multiple times
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
            Temperature:
            <span style={this.determineHeatLevel(this.state.temperature)}>
              {` ${this.state.temperature ? this.state.temperature : '-'}`}
            </span>
          </p>
          <p>
            Highest temp (24h):
            {/* If the data is older than 24 hours, don't style the span */}
            <span style={isOlderThan24Hours(this.state.lastUpdate) ? {} : this.determineHeatLevel(this.state.highestTemp)}>
              {` ${this.state.highestTemp && isOlderThan24Hours(this.state.lastUpdate) === false ? this.state.highestTemp : '-'}`}
            </span>
          </p>
          <p>
            Lowest temp (24h):
            {/* If the data is older than 24 hours, don't style the span */}
            <span style={isOlderThan24Hours(this.state.lastUpdate) ? {} : this.determineHeatLevel(this.state.lowestTemp)}>
              {` ${this.state.lowestTemp && isOlderThan24Hours(this.state.lastUpdate) === false ? this.state.lowestTemp : '-'}`}
            </span>
          </p>
          <p style={styles.tipText}>
            <br/>
            If the fields are empty, no data has been recorded within the last 24 hours. Check back later!
          </p>
        </CardText>
        <CardActions>
          <FlatButton
            icon={<i className={'material-icons'}>add_circle_outline</i>}
            label={'Add observation'}
            onClick={() => { emitOne('REQUEST_DIALOG', this.props.location) }}
          />
        </CardActions>
      </Card>
    )
  }
}

LocationInfo.propTypes = {
  location: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired // Should be a require()'d image
}
