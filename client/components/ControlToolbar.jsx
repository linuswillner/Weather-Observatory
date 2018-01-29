// Toolbar for location selection, observation logging and mode toggling
import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import * as Colors from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Toggle from 'material-ui/Toggle'
import * as config from '../config'
import { generateComponentKey } from '../system/generators'
import { emit, emitOne } from '../system/dispatcher'

const styles = {
  toolbar: {
    backgroundColor: Colors.blue900,
    marginTop: 20
  },
  menu: {
    paddingBottom: 5
  },
  label: {
    color: '#ffffff'
  },
  selected: {
    color: Colors.blue900,
    fontWeight: 'bold'
  },
  disabled: {
    color: Colors.gray700
  },
  thumbOn: {
    backgroundColor: Colors.blue300
  },
  trackOn: {
    backgroundColor: Colors.blue700
  }
}

export default class ControlToolbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selection: 3,
      tableViewEnabled: false
    }
    this.select = this.select.bind(this)
    this.toggleTableView = this.toggleTableView.bind(this)
  }

  toggleTableView () {
    this.setState({ tableViewEnabled: !this.state.tableViewEnabled })
    emitOne('TOGGLE_TABLE_VIEW')
  }

  generateListItems () {
    // Using legacy for loop because of the value prop
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

  select (value) {
    this.setState({ selection: value })
  }

  render () {
    const marks = config.map.markers
    return (
      <Paper
        zDepth={2}
      >
        <Toolbar style={styles.toolbar}>
          {/* Location selector */}
          <ToolbarGroup firstChild={true}>
            <DropDownMenu
              value={this.state.selection}
              disabled={this.state.tableViewEnabled}
              style={styles.menu}
              labelStyle={this.state.tableViewEnabled ? styles.disabled : styles.label}
              iconStyle={styles.label}
              selectedMenuItemStyle={styles.selected}
              targetOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              iconButton={<i className={'material-icons'}>arrow_drop_up</i>}
              onChange={(key, value) => {
                emitOne('LOCATION_SELECT', value) // Re-center map
                this.select(value) // Select the item in the menu
                emit('MARKER_CLICKED', [marks[value].name, marks[value].country, marks[value].image]) // Open/update drawer
              }}
            >
              {this.generateListItems()}
            </DropDownMenu>
          </ToolbarGroup>
          {/* Add observation button */}
          <ToolbarGroup>
            <RaisedButton
              label={'Lisää säähavainto'}
              onClick={() => { emitOne('REQUEST_DIALOG') }}
            />
          </ToolbarGroup>
          {/* Toggle between table and map view */}
          <ToolbarGroup>
            <Toggle
              label={'Näytä taulukko'}
              labelPosition={'right'}
              labelStyle={styles.label}
              thumbSwitchedStyle={styles.thumbOn}
              trackSwitchedStyle={styles.trackOn}
              onToggle={this.toggleTableView}
            />
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    )
  }
}
