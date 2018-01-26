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
  generateMarkers () {
    return config.map.markers.map(location => {
      return (
        <Marker
          text={location.name}
          country={location.country}
          image={location.image}
          lat={location.lat}
          lng={location.lng}
          key={location.name + generateComponentKey()}
        />
      )
    })
  }

  render () {
    return (
      <Paper
        style={styles.mapContainer}
        zDepth={2}
      >
        <GoogleMapReact
          defaultZoom={0}
          defaultCenter={{ lat: 49.988358, lng: 36.232845 }} // Kharkiv, Ukraine
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
