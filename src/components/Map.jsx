// Google map component
import React from 'react'
import Paper from 'material-ui/Paper'
import * as Colors from 'material-ui/styles/colors'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import * as config from '../config'
import { generateComponentKey } from '../system/generators'
import { dispatcher, emit } from '../system/dispatcher'

// Show weather information as a secondary drawer when marker is clicked (Implement a separate table?)

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
      <GoogleMapReact
        defaultZoom={0}
        defaultCenter={{ lat: 52.237049, lng: 21.017532 }}
        bootstrapURLKeys={{
          key: config.map.apiKey,
          region: 'fi',
          language: 'fi'
        }}
      >
        {this.generateMarkers()}
      </GoogleMapReact>
    )
  }
}
