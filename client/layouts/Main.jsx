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

const styles = {
  map: {
    height: '500px'
  }
}

export default class Main extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        <Spacer top={'40px'}/>
        <Container>
          <Row>
            <Col lg={12} style={styles.map}>
              <Map/>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <ObservationDialog/>
              <WeatherSidebar/>
              <ControlToolbar/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
