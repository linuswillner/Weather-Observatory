// Main app
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { HashRouter } from 'react-router-dom'
// The curly braces are necessary - the app will not render properly otherwise

// CSS
import './assets/css/custom.css'

// Layouts
import Main from './layouts/Main'

export default class App extends React.Component {
  render () {
    return (
      <HashRouter>
        <MuiThemeProvider>
          <Main/>
        </MuiThemeProvider>
      </HashRouter>
    )
  }
}
