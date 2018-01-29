// Fields for the observation dialog component
import React from 'react'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import * as Colors from 'material-ui/styles/colors'
import { generateComponentKey } from '../system/generators'
import { emitOne } from '../system/dispatcher'
import * as config from '../config'

const selections = config.map.markers.map(loc => loc.name)

const styles = {
  selected: {
    color: Colors.blue900,
    fontWeight: 'bold'
  },
  labelFocused: {
    color: Colors.blue900
  },
  underlineFocused: {
    borderColor: Colors.blue900
  }
}

export default class ObservationFields extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selection: this.props.location,
      nulled: false,
      selectionName: this.props.location !== null ? config.map.markers[this.props.location].name : null,
      params: {
        location: null,
        temperature: null
      }
    }
    this.select = this.select.bind(this)
  }

  select (value) {
    if (value === -1) { // Null field
      emitOne('DISABLE_SUBMIT', true) // Disable submit
      this.setState({ selection: value, nulled: true })
    } else {
      emitOne('DISABLE_SUBMIT', false) // Re-enable submit
      this.setState({ selection: value, nulled: false })
    }
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
      <div>
        <SelectField
          floatingLabelText={'Kaupunki'}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.labelFocused}
          underlineFocusStyle={styles.underlineFocused}
          selectedMenuItemStyle={styles.selected}
          value={this.state.selection}
          onChange={(key, value) => { this.select(--value) }} // Correct the offset created by the null field
          errorText={this.state.nulled && 'Ole hyvä ja valitse kaupunki'}
        >
          <MenuItem value={null} primaryText={''}/>
          {this.generateListItems()}
        </SelectField>
        <br/>
        <TextField
          hintText={'Tämänhetkinen lämpötila...'}
          floatingLabelText={'Lämpötila'}
          floatingLabelFixed={true}
          type={'number'}
          onChange={(event, newValue) => {
            // Prevent screwing with the API by modifying the modal via the element inspector
            isNaN(newValue) ? emitOne('DISABLE_SUBMIT', true) : emitOne('DISABLE_SUBMIT', false)
          }}
          floatingLabelFocusStyle={styles.labelFocused}
          underlineFocusStyle={styles.underlineFocused}
        />
      </div>
    )
  }
}
