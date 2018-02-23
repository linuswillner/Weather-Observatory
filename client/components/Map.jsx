// Google map component
import React from 'react'
import Paper from 'material-ui/Paper'
import * as Colors from 'material-ui/styles/colors'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import * as config from '../config'
import { generateComponentKey } from '../system/utils'
import { dispatcher, emit } from '../system/dispatcher'

const styles = {
  visible: {
    height: 500
  },
  hidden: {
    height: 500,
    display: 'none'
  }
}

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true,
      center: null
    }
    this.changeCenter = this.changeCenter.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  toggleVisibility () {
    this.setState({ visible: !this.state.visible })
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
        <MapMarker
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
    dispatcher.once('LOCATION_SELECT', (arg) => {
      this.changeCenter(arg)
    })

    dispatcher.once('TOGGLE_TABLE_VIEW', () => {
      this.toggleVisibility()
    })

    return (
      <Paper
        style={this.state.visible ? styles.visible : styles.hidden }
        zDepth={2}
      >
        <GoogleMapReact
          defaultZoom={0}
          defaultCenter={{ // Amsterdam
            lat: config.map.markers[3].lat,
            lng: config.map.markers[3].lng
          }} // TODO: Stop this component from whining when it's re-rendered and thus defaultCenter is reassigned
          center={this.state.center}
          options={{
            disableDefaultUI: true,
            scrollwheel: false
          }}
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
