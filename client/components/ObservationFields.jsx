// Fields for the observation dialog component
import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { generateComponentKey } from '../system/generators'
import * as config from '../config'

const selections = config.map.markers.map(loc => loc.name)

export default class ObservationFields extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selection: null,
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
        value={this.state.selection === null ? this.props.location : this.state.selection}
        // TODO: Make this actually work http://images.lwtechgaming.me/ZBmzx0f.gif
        onChange={(key, value) => { this.select(value) }}
      >
        <MenuItem value={null} primaryText={''}/>
        {this.generateListItems()}
      </SelectField>
    )
  }
}
