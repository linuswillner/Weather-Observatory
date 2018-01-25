// Google map component with markers
// TODO: Migrate marker class to a separate file for readability
import React from 'react'
import Paper from 'material-ui/Paper'
import * as Colors from 'material-ui/styles/colors'
import GoogleMapReact from 'google-map-react'
import * as config from '../config'
import { generateComponentKey } from '../system/generators'
import { dispatcher, emit } from '../system/dispatcher'

// Inline styles are a necessity as the component won't properly render otherwise
const styles = {
  // Base
  icon: {
    // Position & dimensions
    position: 'relative',
    fontSize: 40,
    top: -35,
    left: -21,
    // Color
    color: Colors.redA700,
    transition: 'all 500ms'
  },
  tooltip: {
    // Position & dimensions
    position: 'relative',
    fontSize: 15,
    display: 'inline-block',
    whiteSpace: 'nowrap', // Prevent line breaks
    top: -70,
    // Borders
    marginLeft: 15,
    padding: 3
  },
  // :hover
  iconHover: {
    position: 'relative',
    fontSize: 40,
    left: -21,
    top: -45, // Raise
    color: 'red', // Brighten
    transition: 'all 500ms' // Transition
  },
  tooltipHover: {
    position: 'relative',
    fontSize: 15,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginLeft: 15,
    padding: 3,
    top: -80, // Raise
    transition: 'top 500ms' // Transition
  }
}

// Show weather information as a secondary drawer when marker is clicked (Implement a separate table?)

class Marker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hovered: false }
    this.hoverStart = this.hoverStart.bind(this)
    this.hoverEnd = this.hoverEnd.bind(this)
  }

  hoverStart () {
    this.setState({ hovered: true })
  }

  hoverEnd () {
    this.setState({ hovered: false })
  }

  render () {
    return (
      <span>
        <i
          className={'material-icons test'}
          style={this.state.hovered === false ? styles.icon : styles.iconHover}
          onClick={() => {
            emit('MARKER_CLICKED', [this.props.text, this.props.country, this.props.image])
          }}
          onMouseEnter={this.hoverStart}
          onMouseLeave={this.hoverEnd}
        >
          location_on
        </i>
        <Paper
          style={this.state.hovered === false ? styles.tooltip : styles.tooltipHover}
          zDepth={2}
        >
          {this.props.text}
        </Paper>
      </span>
    )
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
