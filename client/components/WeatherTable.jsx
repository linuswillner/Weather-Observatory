// Weather table row component
import React from 'react'
import { Table, TableHeader, TableBody, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import LocationRow from './LocationRow'
import * as config from '../config.js'
import { generateComponentKey } from '../system/generators'
import { dispatcher } from '../system/dispatcher'

const styles = {
  visible: {
    display: 'inline'
  },
  hidden: {
    display: 'none'
  }
}

export default class WeatherTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: false }
    this.generateColumns = this.generateColumns.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  toggleVisibility () {
    this.setState({ visible: !this.state.visible })
  }

  generateColumns (temperatures) {
    return config.map.markers.map(location => {
      return (
        <LocationRow
          location={location.name}
          currentTemp={3}
          highestTemp={6}
          lowestTemp={-4}
          key={this.props.location + '-' + generateComponentKey()}
        />
      )
    })
  }

  render () {
    dispatcher.on('TOGGLE_TABLE_VIEW', () => {
      this.toggleVisibility()
    })

    return (
      <Paper
        style={this.state.visible ? styles.visible : styles.hidden}
        zDepth={2}
      >
        <Table>
          {/* Header */}
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            {/* Header columns */}
            <TableRow>
              <TableHeaderColumn>Kaupunki</TableHeaderColumn>
              <TableHeaderColumn>Lämpötila</TableHeaderColumn>
              <TableHeaderColumn>Ylin (24h)</TableHeaderColumn>
              <TableHeaderColumn>Alin (24h)</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {/* Body */}
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
          >
            {/* Body columns */}
            {this.generateColumns()}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
