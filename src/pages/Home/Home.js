import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './Home.css'

const Home = () => (
  <Container>
    <Row className="Home__MainRow">
      <Col md="1" className="Home__MainRow-yearsCol"><h3>1914</h3></Col>
      <Col md="10">
        <h1>ÉISCHTE WELTKRICH</h1>
        <h4>Remembering the Great War in Luxembourg</h4>
      </Col>
      <Col md="1" className="Home__MainRow-yearsCol"><h3>1918</h3></Col>
    </Row>
    <Row className="Home__NavigationRow">
      <Col md="3">
        <h6>DISCOVER THE</h6>
        <h2>Themes</h2>
      </Col>
      <Col md="3">
        <h6>BROWSE THE</h6>
        <h2>Collection</h2>
      </Col>
      <Col md="3">
        <h6>EXPLORE THE</h6>
        <h2>Map</h2>
      </Col>
      <Col md="3">
        <h6>FOLLOW THE</h6>
        <h2>Timeline</h2>
      </Col>
    </Row>
  </Container>
)

export default Home
