// Map marker and tooltip component
import React from 'react'
import PropTypes from 'prop-types'
import * as Colors from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import { emit } from '../system/dispatcher'

const styles = {
  icon: {
    // Position & dimensions
    position: 'relative',
    fontSize: 40,
    top: -35,
    left: -21,
    // Color
    color: 'red',
    transition: 'all 200ms'
  },
  iconHover: {
    position: 'relative',
    fontSize: 50, // Increase font size
    left: -25, // Counter ^
    top: -45, // Counter ^
    color: 'red', // Brighten
    cursor: 'pointer', // Change cursor
    transition: 'all 200ms' // Transition
  },
  tooltip: {
    // Position & dimensions
    position: 'relative',
    fontSize: 13,
    display: 'inline-block',
    whiteSpace: 'nowrap', // Prevent line breaks
    top: -68,
    // Borders
    marginLeft: 15,
    padding: 3
  },
  tooltipHover: {
    position: 'relative',
    fontSize: 20, // Increase font size
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginLeft: 20, // Counter font size increase
    padding: 3,
    top: -85, // Counter font size increase
    cursor: 'default', // Change cursor
    transition: 'all 200ms' // Transition
  }
}

export default class MapMarker extends React.Component {
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
          className={'material-icons'}
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
          onMouseEnter={this.hoverStart}
          onMouseLeave={this.hoverEnd}
        >
          {this.props.text}
        </Paper>
      </span>
    )
  }
}

MapMarker.propTypes = {
  text: PropTypes.node.isRequired,
  country: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired
}
