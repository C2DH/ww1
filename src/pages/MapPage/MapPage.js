import React from 'react'
import { Row, Col } from 'reactstrap';
import './MapPage.css'

const MapPage = () => (
  <div>
    <Row className="MapPage__TopRow">
      <Col md="10" className="MapPage__TopInfo">
        <h2>Map</h2>
        <p><span>123/123</span> items shown</p>
      </Col>
      <Col md="2">
        search
      </Col>
    </Row>
    <Row>
      <Col md="10">
         map
      </Col>
      <Col md="2">

      </Col>
    </Row>
  </div>
)

export default MapPage
