// Main app layout
import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Navbar from '../components/Navbar'
import Spacer from '../components/Spacer'
import Map from '../components/Map'
import WeatherSidebar from '../components/WeatherSidebar'
import WeatherTable from '../components/WeatherTable'
import ObservationDialog from '../components/ObservationDialog'
import ControlToolbar from '../components/ControlToolbar'
import Alert from '../components/Alert'
import ErrorOverlay from '../components/ErrorOverlay'
import { dispatcher, emit } from '../system/dispatcher'
import { ping, getAllWeatherInfo } from '../system/apiHandler'
import * as config from '../config'

const styles = {
  col: {
    height: 500
  },
  lowCol: {
    height: 310
  }
}

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { tableViewEnabled: false }
    this.toggleTableView = this.toggleTableView.bind(this)
  }

  componentWillMount () {
    getAllWeatherInfo()
  }

  componentDidMount () {
    ping()
  }

  toggleTableView () {
    this.setState({ tableViewEnabled: !this.state.tableViewEnabled })
  }

  render () {
    dispatcher.once('TOGGLE_TABLE_VIEW', () => {
      this.toggleTableView()
    })

    return (
      <div>
        <Navbar/>
        <Spacer top={'40px'}/>
        <Container>
          <Row>
            <Col lg={12} style={this.state.tableViewEnabled ? styles.lowCol : styles.col}>
              <WeatherTable/>
              <Map/>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <ControlToolbar/>
              {/* Hidden components called via events */}
              <ObservationDialog/>
              <WeatherSidebar/>
              <Alert/>
              <ErrorOverlay/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
