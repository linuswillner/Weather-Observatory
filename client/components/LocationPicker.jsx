// Location picker for the observation dialog
import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as Colors from 'material-ui/styles/colors'
import * as config from '../config'
import { dispatcher, emitOne } from '../system/dispatcher'
import { generateComponentKey, removeLocalStorageItems } from '../system/utils'

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

export default class LocationPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selection: this.props.selection, nulled: false }
    this.select = this.select.bind(this)
  }

  // This is not so much a security measure as it is a "don't-screw-up-the-data" measure
  select (value) {
    if (value === -1) { // Null field
      this.setState({
        selection: null,
        nulled: true
      })
      removeLocalStorageItems([ 'locationName', 'locationIndex' ])
      emitOne('SUBMIT_STATE_CHANGE', true)
    } else {
      this.setState({ selection: value, nulled: false })
      localStorage.setItem('locationName', config.map.markers[value].name)
      localStorage.setItem('locationIndex', value)
      // Submission will not be enabled unless all values are present
      if (localStorage.getItem('temperature')) emitOne('SUBMIT_STATE_CHANGE', false)
    }
  }

  generateList () {
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
    if (this.props.selection) {
      localStorage.setItem('locationName', config.map.markers[this.props.selection].name)
      localStorage.setItem('locationIndex', this.props.selection)
    }

    return (
      <SelectField
        floatingLabelText={'Location'}
        floatingLabelFixed={true}
        floatingLabelFocusStyle={styles.labelFocused}
        underlineFocusStyle={styles.underlineFocused}
        selectedMenuItemStyle={styles.selected}
        value={this.state.selection}
        onChange={(key, value) => {
          // Using -- operand to correct the offset created by the null field
          this.select(--value)
        }}
        errorText={this.state.nulled && 'Please select a location.'}
      >
        <MenuItem value={null} primaryText={''}/>
        {this.generateList()}
      </SelectField>
    )
  }
}

LocationPicker.propTypes = {
  selection: PropTypes.number // Not required because of the possiblity of it being null
}
