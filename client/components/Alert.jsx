// Alert component
import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import * as Colors from 'material-ui/styles/colors'
import { dispatcher } from '../system/dispatcher'

const styles = {
  button: {
    color: Colors.blue900
  }
}

export default class Alert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      title: '',
      content: ''
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open () {
    this.setState({ open: true })
  }

  close () {
    this.setState({ open: false })
  }

  render () {
    dispatcher.once('REQUEST_ALERT', (args) => {
      this.setState({
        title: args[0] || 'Error',
        content: args[1]
      })
      this.open()
    })

    return (
      <Dialog
        modal={false}
        open={this.state.open}
        onRequestClose={this.close}
        actions={
          <FlatButton
            label={'Close'}
            styles={styles.button}
            onClick={this.close}
          />
        }
      >
        <h1>{this.state.title}</h1>
        {this.state.content}
      </Dialog>
    )
  }
}

Alert.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node
  // Not enforced due to them not being defined on load
}
