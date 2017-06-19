import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import BigTitle from '../../components/BigTitle'
import ResourceCard from '../../components/ResourceCard'
import './Resources.css'

const Resources = () => (
  <Container fluid className="padding-r-l-0">
    <BigTitle title="Resources" />
    <div className="Resources__whiteBackground">
      <Row>
        <Col md="6">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
        <Col md="6">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
      </Row>
    </div>
    <div className="Resources__cards_container">
      <ResourceCard
        pubDate="12 April 2017"
        title="Yankees go home"
        author="John Doe"
      />
      <ResourceCard
        pubDate="12 April 2017"
        title="Yankees go home"
        author="John Doe"
      />
      <ResourceCard
        pubDate="12 April 2017"
        title="Yankees go home"
        author="John Doe"
      />
      <ResourceCard
        pubDate="12 April 2017"
        title="Yankees go home"
        author="John Doe"
      />
    </div>
  </Container>

)

export default Resources
