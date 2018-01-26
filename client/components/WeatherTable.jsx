// Weather table row component
import React from 'react'
import { Table, TableHeader, TableBody, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import LocationRow from './LocationRow'
import * as config from '../config.js'
import { generateComponentKey } from '../system/generators'

export default class WeatherTable extends React.Component {
  constructor (props) {
    super(props)
    this.generateColumns = this.generateColumns.bind(this)
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
    return (
      <Paper
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
              <TableHeaderColumn>Lisää...</TableHeaderColumn>
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
