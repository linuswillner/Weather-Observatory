// Fields for the observation dialog component
import React from 'react'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import * as Colors from 'material-ui/styles/colors'
import { generateComponentKey } from '../system/generators'
import { dispatcher, emitOne } from '../system/dispatcher'
import * as config from '../config'

const styles = {
  selected: {
    color: Colors.blue900,
    fontWeight: 'bold'
  },
  labelFocused: {
    color: Colors.blue900
  },
  labelFocusedError: {
    color: 'red'
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
      modified: false,
      noTemp: false,
      nulled: false,
      locationName: null,
      temperature: null
    }
    this.select = this.select.bind(this)
    this.check = this.check.bind(this)
  }

  select (value) {
    if (value === -1) { // Null field
      emitOne('DISABLE_SUBMIT', true) // Disable submit
      this.setState({
        selection: value,
        nulled: true,
        locationName: null // Nulling the location
      })
    } else {
      emitOne('DISABLE_SUBMIT', false) // Re-enable submit
      this.setState({
        selection: value,
        nulled: false,
        locationName: config.map.markers[value].name
      })
    }
  }

  // In the event that the text field is modified via the element inspector, the submit button will be disabled
  check (value) {
    if (!value) {
      this.setState({ noTemp: true, temperature: null }) // Nulling the temperature
      emitOne('DISABLE_SUBMIT', true)
    } else if (isNaN(value)) {
      this.setState({ modified: true })
      emitOne('DISABLE_SUBMIT', true)
    } else {
      this.setState({ modified: false, noTemp: false, temperature: value }) // Store temperature
      emitOne('DISABLE_SUBMIT', false)
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
          id={'location'}
          floatingLabelText={'Kaupunki'}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.labelFocused}
          underlineFocusStyle={styles.underlineFocused}
          selectedMenuItemStyle={styles.selected}
          value={this.state.selection}
          onChange={(key, value) => {
            // Using -- operand to correct the offset created by the null field
            this.select(--value)
          }}
          errorText={this.state.nulled && 'Ole hyvä ja valitse kaupunki.'}
        >
          <MenuItem value={null} primaryText={''}/>
          {this.generateListItems()}
        </SelectField>
        <br/>
        <TextField
          id={'temperature'}
          hintText={'Tämänhetkinen lämpötila...'}
          floatingLabelText={'Lämpötila (°C)'}
          floatingLabelFixed={true}
          type={'number'}
          errorText={(this.state.noTemp && 'Ole hyvä ja syötä lämpötila.') || (this.state.modified && 'Antamasi lämpötila on viallinen, päivitä sivu ja yritä uudelleen.')}
          onChange={(event, newValue) => {
            this.check(newValue)
          }}
          floatingLabelFocusStyle={this.state.modified || this.state.noTemp ? styles.labelFocusedError : styles.labelFocused}
          underlineFocusStyle={styles.underlineFocused}
        />
      </div>
    )
  }
}
