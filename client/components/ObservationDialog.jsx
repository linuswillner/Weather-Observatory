// Weather observation dialog (Frame)
import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import * as Colors from 'material-ui/styles/colors'
import ObservationFields from './ObservationFields'
import * as config from '../config'
import { dispatcher } from '../system/dispatcher'

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
      disabled: false,
      selection: null
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
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

  render () {
    dispatcher.on('REQUEST_DIALOG', (arg) => {
      !arg ? this.open() : this.open(arg) // If no arg was provided, there was no origin - otherwise open the origin
    })

    dispatcher.on('DISABLE_SUBMIT', (arg) => {
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
            onClick={this.close}
          />,
          <FlatButton
            label={'Tallenna'}
            style={this.state.disabled ? styles.submitDisabled : styles.submit}
            disabled={this.state.disabled}
            onClick={this.close} // Submit data to API
          />
        ]}
      >
        <ObservationFields location={this.state.selection}/>
      </Dialog>
    )
  }
}
