import React from 'react'
import {  Container, Row, Col } from 'reactstrap';
import ManualCard from '../../components/ManualCard'
import OtherTeachersCard from '../../components/OtherTeachersCard'
import './Education.css'

const Education = () => (
  <Container>
    <div className="Education_whiteBackground">
      <Row className="Education__TitleRow">
        <h1>Education</h1>
      </Row>
      <Row className="Education__TwoColRow">
        <Col md="6" className="Education__leftCol">
          <h6>Introduction and pedagogical approach</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
        <Col md="6" className="Education__rightCol">
          <h6>Goal</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
      </Row>
    </div>
    <Row className="Education__ManualsRow">
      <Col md="12">
        <h6>Pedagogical manuals</h6>
        <div className="Education__Card-container">
          <ManualCard />
          <ManualCard />
          <ManualCard />
          <ManualCard />
        </div>
      </Col>
    </Row>
    <Row className="Education__OtherTeachersRow">
      <Col md="12">
        <h6>See how other teacher used our materials</h6>
        <div className="Education__Card-container">
          <OtherTeachersCard />
          <OtherTeachersCard />
        </div>
      </Col>
    </Row>
  </Container>

)

export default Education
