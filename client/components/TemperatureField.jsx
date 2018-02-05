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
      noTemp: false,
      invalid: false
    }
    this.check = this.check.bind(this)
  }

  removeAndDisable (item) {
    localStorage.removeItem(item)
    emitOne('SUBMIT_STATE_CHANGE', true)
  }

  // Security measure against modifying the input field via the element inspector
  check (value) {
    if (value) value = value.replace(',', '.') // Anti-crash

    if (!value) {
      // Debug measure against emptying the field
      this.setState({ noTemp: true })
      this.removeAndDisable('temperature')
    } else if (isNaN(value)) {
      // Prevent modification and input of rogue data to the field
      this.setState({ modified: true })
      this.removeAndDisable('temperature')
    } else if (value < -273.15 || value > 60) {
      // Absolute zero and a little more than the hottest place on Earth, Death Valley
      this.setState({ invalid: true })
      this.removeAndDisable('temperature')
    } else {
      this.setState({ modified: false, noTemp: false, invalid: false })
      localStorage.setItem('temperature', value)
      // Submission will not be enabled unless all values are present
      if (localStorage.getItem('locationName') && localStorage.getItem('locationIndex')) emitOne('SUBMIT_STATE_CHANGE', false)
    }
  }

  render () {
    return (
      <TextField
        floatingLabelText={'Lämpötila (°C)'}
        floatingLabelFixed={true}
        type={'number'}
        errorText={
          (this.state.noTemp && 'Ole hyvä ja syötä lämpötila.') ||
          (this.state.modified && 'Antamasi lämpötila on viallinen, päivitä sivu ja yritä uudelleen.') ||
          (this.state.invalid && 'Antamasi lämpötila on virheellinen, ole hyvä ja syötä mahdollinen lämpötila.')
        }
        onChange={(event, newValue) => {
          this.check(newValue)
        }}
        floatingLabelFocusStyle={this.state.modified || this.state.noTemp ? styles.labelFocusedError : styles.labelFocused}
        underlineFocusStyle={styles.underlineFocused}
      />
    )
  }
}
