import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import StaticStory from '../../components/StaticStory'
import BigTitle from '../../components/BigTitle'
import './About.css'

const About = () => (
    <div className="About__wrapper">
      <Container>
        <BigTitle title="About" />
        <Row>
          <Col>
              <StaticStory slug='about' />
          </Col>
        </Row>
      </Container>
    </div>

)

export default About
