// Main app layout
import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Navbar from '../components/Navbar'
import Spacer from '../components/Spacer'
import Map from '../components/Map'
import MapPointDrawer from '../components/WeatherSidebar'
import { init } from '../system/dbhandler' // For connection checks

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
            <Col lg={6}>
              Havaintopisteet statseineen
            </Col>
            <Col lg={6} style={styles.map}>
              <Map/>
            </Col>
          </Row>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <MapPointDrawer/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
