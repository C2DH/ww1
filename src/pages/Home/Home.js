import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
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
      <Col md="3" className="Home__NavigationCol-borderRight">
        <Link to="/themes">
          <h6>DISCOVER THE</h6>
          <h2>Themes</h2>
        </Link>
      </Col>
      <Col md="3" className="Home__NavigationCol-borderRight">
        <Link to="/collection">
        <h6>BROWSE THE</h6>
        <h2>Collection</h2>
        </Link>
      </Col>
      <Col md="3" className="Home__NavigationCol-borderLeft">
        <Link to="/map">
          <h6>EXPLORE THE</h6>
          <h2>Map</h2>
        </Link>
      </Col>
      <Col md="3" className="Home__NavigationCol-borderLeft">
        <Link to="/">
          <h6>FOLLOW THE</h6>
          <h2>Timeline</h2>
        </Link>
      </Col>
    </Row>
  </Container>
)

export default Home
