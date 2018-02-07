// Main app
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// CSS
import './assets/css/common.css'

// Layouts
import Main from './layouts/Main'

export default class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Main/>
      </MuiThemeProvider>
    )
  }
}
