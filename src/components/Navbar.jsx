// The navbar (App bar per Material design)
import React from 'React'
import AppBar from 'material-ui/AppBar'
import * as Colors from 'material-ui/styles/colors'
import Clock from 'react-live-clock'

const styles = {
  appBar: {
    backgroundColor: Colors.blue900,
    textAlign: 'left'
  },
  rightElement: {
    paddingTop: '10px',
    paddingRight: '10px'
  }
}

export default class Navbar extends React.Component {
  render () {
    return (
      <AppBar
        title={'Säähavainnot'}
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
