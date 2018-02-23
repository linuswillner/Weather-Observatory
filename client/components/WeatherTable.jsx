// Weather table row component
import React from 'react'
import { Table, TableHeader, TableBody, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import WeatherTableRow from './WeatherTableRow'
import * as config from '../config.js'
import { generateComponentKey, isOlderThan24Hours } from '../system/utils'
import { dispatcher } from '../system/dispatcher'
import { getAllWeatherInfo } from '../system/apiHandler'

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
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  toggleVisibility () {
    this.setState({ visible: !this.state.visible })
  }

  generateColumns () {
    return config.map.markers.map(location => {
      let data = localStorage.getItem(location.name)
      if (data) {
        data = JSON.parse(data)
        return (
          <WeatherTableRow
            location={location.name}
            currentTemp={data.temperature ? data.temperature : '-'}
            highestTemp={data.highest && isOlderThan24Hours(data.lastUpdate) === false ? data.highest : '-'}
            lowestTemp={data.highest && isOlderThan24Hours(data.lastUpdate) === false ? data.lowest : '-' }
            key={location.name + '-' + generateComponentKey()}
          />
        )
      } else {
        // Write dummy data and reload so the page can load in peace
        localStorage.setItem('Tokyo', '{"highest": null, "id": "Tokyo", "lastUpdate": null, "lowest": null, "temperature": null}')
        localStorage.setItem('Helsinki', '{"highest": null, "id": "Helsinki", "lastUpdate": null, "lowest": null, "temperature": null}')
        localStorage.setItem('New York', '{"highest": null, "id": "New York", "lastUpdate": null, "lowest": null, "temperature": null}')
        localStorage.setItem('Amsterdam', '{"highest": null, "id": "Amsterdam", "lastUpdate": null, "lowest": null, "temperature": null}')
        localStorage.setItem('Dubai', '{"highest": null, "id": "Dubai", "lastUpdate": null, "lowest": null, "temperature": null}')
        window.location.reload(true)
      }
    })
  }

  render () {
    dispatcher.once('TOGGLE_TABLE_VIEW', () => {
      this.toggleVisibility()
    })

    dispatcher.once('NEW_DATA', () => {
      this.forceUpdate() // Re-render when new data comes in
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
