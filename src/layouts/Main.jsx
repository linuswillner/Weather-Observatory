// Main app layout
import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Navbar from '../components/Navbar'
import Spacer from '../components/Spacer'
import Map from '../components/Map'
import { init } from '../system/dbhandler' // For connection checks

const styles = {
  log: {
    textAlign: 'right'
  },
  map: {
    height: '500px'
  }
}

export default class Main extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        <Spacer top="30px"/>
        <Container>
          {/* <Row>
            <Col lg={6}>
              Havaintopisteet statseineen
            </Col>
            <Col lg={6} style={styles.log}>
              Viimeisimmät kirjatut merkinnät (loki)
            </Col>
          </Row>
          <Spacer top="50px"/> */}
          <Row>
            <Col lg={12} style={styles.map}>
              <Map/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
