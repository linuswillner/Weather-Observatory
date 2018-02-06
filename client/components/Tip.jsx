// Small tip card
import React from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

const styles = {
  visible: {
    marginTop: 10,
    padding: 10,
    marginLeft: 'auto', // Center
    marginRight: 'auto', // Center
    backgroundColor: '#ffffff'
  },
  hidden: {
    marginTop: 10,
    padding: 10,
    marginLeft: 'auto', // Center
    marginRight: 'auto', // Center
    backgroundColor: '#ffffff',
    opacity: 0,
    transition: 'all 300ms'
  }
}

export default class Description extends React.Component {
  constructor (props) {
    super(props)
    this.state = { dismissed: false }
    this.dismiss = this.dismiss.bind(this)
  }

  dismiss () {
    this.setState({ dismissed: !this.state.dismissed })
  }

  render () {
    if (this.props.dismissable === true) {
      return (
        <Chip
          style={this.state.dismissed === false ? styles.visible : styles.hidden}
          onRequestDelete={this.dismiss}
        >
          {this.props.text}
        </Chip>
      )
    } else {
      return (
        <Chip
          style={this.state.dismissed === false ? styles.visible : styles.hidden}
        >
          {this.props.text}
        </Chip>
      )
    }
  }
}
