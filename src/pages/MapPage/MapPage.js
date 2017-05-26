import React from 'react'
import { Row, Col } from 'reactstrap';
import MapSearchInput from '../../components/MapSearchInput'
import MapSideMenu from '../../components/MapSideMenu'
import './MapPage.css'

const MapPage = () => (
  <div>
    <Row className="MapPage__TopRow">
      <Col md="9" className="MapPage__TopInfo">
        <h2>Map</h2>
        <p><span>123/123</span> items shown</p>
      </Col>
      <Col md="3" className="MapPage__Search">
        <MapSearchInput />
      </Col>
    </Row>
    <Row className="MapPage__MainRow">
      <Col md="9">
         map
      </Col>
      <Col md="3" className="MapPage__SideMenu">
        <MapSideMenu />
      </Col>
    </Row>
  </div>
)

export default MapPage
