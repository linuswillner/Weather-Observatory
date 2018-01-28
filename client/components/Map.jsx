// Google map component
import React from 'react'
import Paper from 'material-ui/Paper'
import * as Colors from 'material-ui/styles/colors'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import * as config from '../config'
import { generateComponentKey } from '../system/generators'
import { dispatcher, emit } from '../system/dispatcher'

const styles = {
  mapContainer: {
    height: 500
  }
}

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      center: {
        lat: config.map.markers[3].lat,
        lng: config.map.markers[3].lng
      }
    }
    this.changeCenter = this.changeCenter.bind(this)
  }

  changeCenter (value) {
    this.setState({
      center: {
        lat: config.map.markers[value].lat,
        lng: config.map.markers[value].lng
      }
    })
  }

  generateMarkers () {
    return config.map.markers.map(location => {
      return (
        <Marker
          text={location.name}
          country={location.country}
          image={location.image}
          lat={location.lat}
          lng={location.lng}
          key={location.name + '-' + generateComponentKey()}
        />
      )
    })
  }

  render () {
    dispatcher.on('LOCATION_SELECT', args => {
      this.changeCenter(args[0])
    })
    return (
      <Paper
        style={styles.mapContainer}
        zDepth={2}
      >
        <GoogleMapReact
          defaultZoom={0}
          defaultCenter={{ // Amsterdam
            lat: config.map.markers[3].lat,
            lng: config.map.markers[3].lng
          }}
          center={this.state.center}
          bootstrapURLKeys={{
            key: config.map.apiKey,
            region: 'fi',
            language: 'fi'
          }}
        >
          {this.generateMarkers()}
        </GoogleMapReact>
      </Paper>
    )
  }
}
