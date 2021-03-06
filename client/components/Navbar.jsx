// Main navbar
import React from 'react'
import AppBar from 'material-ui/AppBar'
import * as Colors from 'material-ui/styles/colors'
import Clock from 'react-live-clock'

const styles = {
  appBar: {
    backgroundColor: Colors.blue900
  },
  rightElement: {
    color: '#ffffff',
    fontSize: 22,
    paddingTop: '10px',
    paddingRight: '10px'
  }
}

export default class Navbar extends React.Component {
  render () {
    return (
      <AppBar
        title={'Weather Observatory'}
        showMenuIconButton={false}
        style={styles.appBar}
        iconStyleRight={styles.rightElement}
        iconElementRight={
          <Clock
            format={'HH:mm:ss'}
            ticking={true}
            interval={1000}
            timezone={'Europe/Helsinki'}
            className={'clock'}
          />
        }
      />
    )
  }
}
