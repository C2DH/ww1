import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import ManualCard from '../../components/ManualCard'
import OtherTeachersCard from '../../components/OtherTeachersCard'
import BigTitle from '../../components/BigTitle'
import EducationFooter from '../../components/EducationFooter'
import './Education.css'

const Education = () => (
  <Container fluid className="padding-r-l-0">
    <BigTitle title="Education" />
    <div className="whitebackground-container">
      <Row className="Education__TwoColRow">
        <Col sm="6" xs="12" className="Education__leftCol">
          <h6>Introduction and pedagogical approach</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
        <Col sm="6" xs="12" className="Education__rightCol">
          <h6>Goal</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
      </Row>
    </div>
    <div className="padding-left-30">
      <Row className="Education__ManualsRow">
        <Col md="12" sm="12" xs="12">
          <h6>Pedagogical manuals</h6>
        </Col>
        <Col md="12" sm="12" xs="12" className="overflow-y">
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
      <EducationFooter />
    </div>
  </Container>

)

export default Education
