// Weather observation dialog (Frame)
import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import * as Colors from 'material-ui/styles/colors'
import TemperatureField from './TemperatureField'
import LocationPicker from './LocationPicker'
import * as config from '../config'
import { dispatcher, emit, emitOne } from '../system/dispatcher'
import { removeLocalStorageItems } from '../system/utils'
import { postWeatherInfo } from '../system/apiHandler'

const styles = {
  submit: {
    color: Colors.blue900
  },
  submitDisabled: {
    color: Colors.grey500,
    cursor: 'not-allowed'
  }
}

export default class ObservationDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      disabled: true,
      selection: null
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.checkAndSubmit = this.checkAndSubmit.bind(this)
  }

  // Open handled via event due to it being called from another component
  open (origin) {
    let selections = config.map.markers.map(l => l.name)

    if (!origin) this.setState({ open: true })
    else this.setState({ open: true, selection: selections.indexOf(origin) }) // Convert to array position
  }

  // Close handled locally due to the close request happening in-component
  close () {
    this.setState({ open: false })
  }

  checkAndSubmit () {
    let locName = localStorage.getItem('locationName')
    let temp = localStorage.getItem('temperature')

    // It's not feasible that these conditions will fire in normal usage - they're mostly proofing against tampering the local storage
    if (!locName || locName.match(/Tokio|Helsinki|New York|Amsterdam|Dubai/gi) === null) {
      emit('REQUEST_ALERT', ['Hupsista!', <p>Syöttämäsi kaupunki ei kelpaa. Ole hyvä ja valitse kaupunki listasta.</p>])
      emitOne('SUBMIT_STATE_CHANGE', true)
    } else if (!temp || isNaN(temp)) {
      emit('REQUEST_ALERT', ['Hupsista!', <p>Syöttämäsi lämpötila ei kelpaa. Ole hyvä ja syötä lämpötila numerona kenttään.</p>])
      emitOne('SUBMIT_STATE_CHANGE', true)
    } else {
      postWeatherInfo(locName, temp, Date.now())
      removeLocalStorageItems([ 'locationName', 'locationIndex', 'temperature' ])
      this.close()
    }
  }

  render () {
    dispatcher.once('REQUEST_DIALOG', (arg) => {
      !arg ? this.open() : this.open(arg) // If no arg was provided, there was no origin - otherwise open the origin
    })

    dispatcher.once('SUBMIT_STATE_CHANGE', (arg) => {
      this.setState({ disabled: arg })
    })

    return (
      <Dialog
        title={'Uusi säähavainto'}
        modal={false}
        open={this.state.open}
        onRequestClose={this.close}
        actions={[
          <FlatButton
            label={'Peruuta'}
            onClick={() => {
              this.setState({ selection: null }) // Empty the field for the next opening
              removeLocalStorageItems([ 'locationName', 'locationIndex', 'temperature' ]) // Purge cached info
              this.close()
            }}
          />,
          <FlatButton
            label={'Tallenna'}
            style={this.state.disabled ? styles.submitDisabled : styles.submit}
            disabled={this.state.disabled}
            onClick={this.checkAndSubmit}
          />
        ]}
      >
        <div>
          <LocationPicker selection={this.state.selection}/>
          <br/>
          <TemperatureField/>
        </div>
      </Dialog>
    )
  }
}
