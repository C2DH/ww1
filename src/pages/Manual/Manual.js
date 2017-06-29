import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import EducationFooter from '../../components/EducationFooter'
import './Manual.css'

const Manual = (props) => (
  <Container fluid className="padding-r-l-0">
    <div className="whitebackground-container">
      <div className="Manual__title_container">
        <Row className="Manual__TitleRow">
          <h6 className="red-subtitle">MANUALS</h6>
          <h1 className="Manual__title">The forgotten monument</h1>
        </Row>
      </div>
      <Row>
        <Col md="7" className="Education__leftCol">
          <h6 className="red-subtitle">Goal of activity</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
        <Col md="5" className="Education__rightCol">
          <h6 className="red-subtitle">Related themes</h6>
          <img src="https://images.pexels.com/photos/30772/pexels-photo-30772.jpg?h=350&auto=compress&cs=tinysrgb" className="img-fluid" />
        </Col>
      </Row>
    </div>
    <div className="padding-left-30">
      <Row className="Manual__middleRow">
        <Col md="12">
          <h6 className="red-subtitle">Step by step manual</h6>
        </Col>
      </Row>
      <EducationFooter />
    </div>
  </Container>

)

export default Manual
