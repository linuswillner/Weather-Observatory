import React from 'react'
import Paper from 'material-ui/Paper'
import GoogleMapReact from 'google-map-react'
import * as config from '../config'

const styles = {
  icon: {
    // Position & dimensions
    position: 'relative',
    fontSize: 40,
    top: -35,
    left: -21,
    // Color
    color: 'red'
  },
  tooltip: {
    // Position & dimensions
    position: 'relative',
    fontSize: 15,
    display: 'inline-block',
    top: -70,
    // Borders
    marginLeft: 15,
    padding: 3
  }
}

// Show weather information as a secondary drawer when marker is clicked (Implement a separate table?)

class Marker extends React.Component {
  render () {
    return (
      <span>
        <i className={'material-icons'} style={styles.icon}>location_on</i>
        <Paper style={styles.tooltip} zDepth={1}>{this.props.text}</Paper>
      </span>
    )
  }
}

export default class Map extends React.Component {
  generateMarkers () {
    return config.map.markers.map(location => {
      return <Marker text={location.name} lat={location.lat} lng={location.lng} key={location.name} />
    })
  }

  render () {
    return (
      <GoogleMapReact
        defaultZoom={0}
        defaultCenter={{ lat: 52.237049, lng: 21.017532 }}
        bootstrapURLKeys={{
          key: config.map.apiKey,
          language: 'fi'
        }}
      >
        {this.generateMarkers()}
      </GoogleMapReact>
    )
  }
}
