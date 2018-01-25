// Small tip card
import React from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

export default class Description extends React.Component {
  constructor (props) {
    super(props)
    this.state = { dismissed: false }
    this.delete = this.delete.bind(this)
  }

  delete () {
    this.setState({ dismissed: !this.state.dismissed })
  }

  render () {
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

    if (this.props.dismissable === true) {
      return (
        <Chip
          style={this.state.dismissed === false ? styles.visible : styles.hidden}
          onRequestDelete={this.delete}
        >
          <Avatar icon={<i className={'material-icons'}>info_outline</i>}/>
          {this.props.text}
        </Chip>
      )
    } else {
      return (
        <Chip
          style={this.state.dismissed === false ? styles.visible : styles.hidden}
        >
          <Avatar icon={<i className={'material-icons'}>priority_high</i>}/>
          {this.props.text}
        </Chip>
      )
    }
  }
}
