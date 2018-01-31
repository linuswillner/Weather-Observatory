// Temperature field for the observation dialog
import React from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import * as Colors from 'material-ui/styles/colors'
import { generateComponentKey } from '../system/utils'
import { dispatcher, emitOne } from '../system/dispatcher'
import * as config from '../config'

const styles = {
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

export default class TemperatureField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modified: false,
      noTemp: false
    }
    this.check = this.check.bind(this)
  }

  // Security measure against modifying the input field via the element inspector
  check (value) {
    if (!value) { // Debug measure against emptying the field
      this.setState({ noTemp: true })
      localStorage.removeItem('temperature')
      emitOne('SUBMIT_STATE_CHANGE', true)
    } else if (isNaN(value)) { // Prevent modification and input of rogue data to the field
      this.setState({ modified: true })
      localStorage.removeItem('temperature')
      emitOne('SUBMIT_STATE_CHANGE', true)
    } else {
      this.setState({ modified: false, noTemp: false })
      localStorage.setItem('temperature', value)
      // Submission will not be enabled unless all values are present
      if (localStorage.getItem('locationName') && localStorage.getItem('locationIndex')) emitOne('SUBMIT_STATE_CHANGE', false)
    }
  }

  render () {
    return (
      <TextField
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
    )
  }
}
