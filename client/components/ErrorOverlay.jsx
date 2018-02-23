// Error overlay for fatal errors in the app
import React from 'react'
import Dialog from 'material-ui/Dialog'
import { dispatcher } from '../system/dispatcher'

const styles = {
  content: {
    textAlign: 'center'
  },
  text: {
    fontSize: 17
  },
  error: {
    color: 'red'
  }
}

export default class ErrorOverlay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      error: '',
      errorCode: '',
      errorMessage: ''
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
    dispatcher.once('REQUEST_ERROR_OVERLAY', (args) => {
      this.setState({ error: args[0], errorMessage: args[1], errorCode: args[2] })
      this.open()
    })

    return (
      <Dialog
        modal={true}
        open={this.state.open}
        contentStyle={styles.content}
      >
        <h1>Something broke...</h1>
        <p style={styles.text}>There was a catastrophic error in the application that cannot be self-repaired. More information below.</p>
        <p style={styles.error}>{this.state.error}</p>
        <p style={styles.text}>Please contact the site owner and send them the following information:</p>
        <p>
          Error code: <b>{this.state.errorCode}</b>
          <br/>
          Message: {this.state.errorMessage}
        </p>
        <p>Site owner: <b>Linus Willner</b> (hello@linuswillner.me)</p>
      </Dialog>
    )
  }
}
