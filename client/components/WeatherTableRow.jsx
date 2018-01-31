// Location table row component
import React from 'react'
import * as Colors from 'material-ui/styles/colors'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'

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
  add: {
    color: Colors.grey800
  }
}

export default class WeatherTableRow extends React.Component {
  constructor (props) {
    super(props)
    this.determineHeatLevel = this.determineHeatLevel.bind(this)
  }

  determineHeatLevel (temp) {
    let warm = styles.warm
    let cold = styles.cold
    let def = styles.default

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
    return (
      <TableRow>
        <TableRowColumn>
          {this.props.location}
        </TableRowColumn>
        <TableRowColumn
          style={this.determineHeatLevel(this.props.currentTemp)}
        >
          {this.props.currentTemp}
        </TableRowColumn>
        <TableRowColumn
          style={this.determineHeatLevel(this.props.highestTemp)}
        >
          {this.props.highestTemp}
        </TableRowColumn>
        <TableRowColumn
          style={this.determineHeatLevel(this.props.lowestTemp)}
        >
          {this.props.lowestTemp}
        </TableRowColumn>
      </TableRow>
    )
  }
}
