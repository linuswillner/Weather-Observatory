// Toast component for displaying brief info
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { dispatcher } from '../system/dispatcher'

export default class Toast extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      msg: '',
      action: ''
    }
    this.close = this.close.bind(this)
  }

  close () {
    this.setState({ open: false })
  }

  render () {
    dispatcher.once('REQUEST_TOAST', (args) => {
      this.setState({
        open: true,
        msg: args[0],
        action: args[1]
      })
    })

    return (
      <Snackbar
        open={this.state.open}
        action={this.state.action}
        message={this.state.msg}
        onActionClick={this.close}
      />
    )
  }
}
