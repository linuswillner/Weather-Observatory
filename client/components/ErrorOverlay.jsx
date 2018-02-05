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
        <h1>Nyt jokin on kunnolla pielessä...</h1>
        <p style={styles.text}>Applikaatiossa tapahtui katastrofaalinen virhe jota se ei itse pysty korjaamaan. Lisätietoja alla.</p>
        <p style={styles.error}>{this.state.error}</p>
        <p style={styles.text}>Ole hyvä ja ota yhteyttä sivuston omistajaan ja anna hänelle seuraavat tiedot:</p>
        <p>
          Virhekoodi: <b>{this.state.errorCode}</b>
          <br/>
          Viesti: {this.state.errorMessage}
        </p>
        <p>Sivuston omistaja: <b>Linus Willner</b> (hello@linuswillner.me)</p>
      </Dialog>
    )
  }
}
