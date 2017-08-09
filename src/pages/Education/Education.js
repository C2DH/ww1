import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import ManualCard from '../../components/ManualCard'
import OtherTeachersCard from '../../components/OtherTeachersCard'
import BigTitle from '../../components/BigTitle'
import EducationFooter from '../../components/EducationFooter'
import StaticStory from '../../components/StaticStory'
import './Education.css'

const Education = () => (
  <div>
    <div className="Resources__top_wrapper">
      <Container>
        <BigTitle title="Education" />
        <Row>
          <Col>
              <StaticStory slug='education' />
          </Col>
        </Row>
      </Container>
    </div>
    <Container>
      <Row>
        <Col>
          <h6 className="Education__h6">Pedagogical manuals</h6>
        </Col>
      </Row>
      <Row className="Education__ManualsRow">
        <Col lg="3" xs="12">
            <ManualCard theme="grief and loss" title="the forgotten monument"/>
        </Col>
        <Col lg="3" xs="12">
            <ManualCard theme="aftermath" title="an invitation to the Ball"/>
        </Col>
        <Col lg="3" xs="12">
            <ManualCard theme="migration" title="the passport of Jean-Baptiste Gratia"/>
        </Col>
        <Col lg="3" xs="12">
            <ManualCard theme="food crisis" title="250 grams of bread"/>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <div className="Education__OtherTeachersRow">
            <h6 className="Education__h6">See how other teachers used our materials</h6>
            <div className="Education__Card-container">
              <OtherTeachersCard />
              <OtherTeachersCard />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <EducationFooter />
  </div>

)

export default Education
