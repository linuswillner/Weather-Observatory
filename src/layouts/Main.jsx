// Main app layout
import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Navbar from '../components/Navbar'
import Spacer from '../components/Spacer'
import { init } from '../system/dbhandler' // For database initialization

const styles = {
  textAlign: 'right'
}

export default class Main extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        <Spacer top="30px"/>
        <Container>
          <Row>
            <Col lg={6}>
              Havaintopisteet statseineen
            </Col>
            <Col lg={6} style={styles}>
              Viimeisimmät kirjatut merkinnät (loki)
            </Col>
          </Row>
          <Spacer top="50px"/>
          <Row>
            <Col lg={12}>
              Kartta tai jotain
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
