// Fields for the observation dialog component
import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as Colors from 'material-ui/styles/colors'
import { generateComponentKey } from '../system/generators'
import * as config from '../config'

const selections = config.map.markers.map(loc => loc.name)

const styles = {
  selected: {
    color: Colors.blue900,
    fontWeight: 'bold'
  }
}

export default class ObservationFields extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selection: this.props.location,
      params: {
        location: null,
        temperature: null
      }
    }
    this.select = this.select.bind(this)
  }

  select (value) {
    this.setState({ selection: value })
  }

  generateListItems () {
    let list = []
    for (let i = 0; i < config.map.markers.length; i++) {
      list.push(
        <MenuItem
          value={i}
          primaryText={config.map.markers[i].name}
          key={config.map.markers[i].name + '-' + generateComponentKey()}
        />
      )
    }
    return list
  }

  render () {
    return (
      <SelectField
        floatingLabelText={'Kaupunki'}
        value={this.state.selection}
        onChange={(key, value) => { this.select(--value) }} // Correct the offset created by the null field
        selectedMenuItemStyle={styles.selected}
      >
        <MenuItem value={null} primaryText={''}/>
        {/* TODO: If this field is explicitly selected, display error and disable submit */}
        {this.generateListItems()}
      </SelectField>
    )
  }
}
