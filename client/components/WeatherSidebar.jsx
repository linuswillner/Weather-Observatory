// Weather information sidebar
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import * as Colors from 'material-ui/styles/colors'
import Tip from './Tip'
import LocationInfo from './LocationInfo'
import Spacer from './Spacer'
import * as config from '../config'
import { dispatcher } from '../system/dispatcher'

const styles = {
  menuHeader: {
    backgroundColor: Colors.blue900
  }
}

class MenuHeader extends React.Component {
  render () {
    return (
      <AppBar
        title={this.props.title}
        showMenuIconButton={true}
        style={styles.menuHeader}
        iconElementLeft={
          <IconButton iconClassName={'material-icons'}>close</IconButton>
        }
        onLeftIconButtonClick={this.props.onRequestClose}
      />
    )
  }
}

export default class WeatherSidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      location: 'None',
      country: 'None',
      image: require('../assets/images/loading.png') // Loading image for slow connections
    }
    this.toggle = this.toggle.bind(this)
  }

  generateLocationInfo (locationName, locationCountry, locationImagePath) {
    this.setState({
      location: locationName,
      country: locationCountry,
      image: require(`../${locationImagePath}`)
    })
  }

  toggle () {
    this.setState({ open: !this.state.open })
  }

  render () {
    dispatcher.on('MARKER_CLICKED', (args) => {
      this.generateLocationInfo(args[0], args[1], args[2])
      if (this.state.open !== true) this.toggle() // If the drawer is open, don't toggle it
    })

    return (
      <Drawer
        width={215}
        openSecondary={true}
        onRequestChange={(open) => this.setState({ open })}
        open={this.state.open}
      >
        <MenuHeader onRequestClose={this.toggle}/>
        <LocationInfo location={this.state.location} country={this.state.country} image={this.state.image} />
      </Drawer>
    )
  }
}
