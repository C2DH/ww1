import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => (
  <Container className="Home__container">
    <Row className="Home__MainRow">
      <Col md="1" sm="1" xs="1" className="Home__MainRow-yearsCol"><h3>1914</h3></Col>
      <Col md="10" sm="10"  xs="10">
        <h1 className="Home__title">ÉISCHTE WELTKRICH</h1>
        <h4 className="Home__subtitle">Remembering the Great War in Luxembourg</h4>
      </Col>
      <Col md="1" sm="1"  xs="1" className="Home__MainRow-yearsCol"><h3>1918</h3></Col>
    </Row>
    <Row className="Home__NavigationRow">
      <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_themes">
        <Link to="/themes">
          <h6 className="Home__NavigationCol_h6">DISCOVER THE</h6>
          <h2>Themes</h2>
        </Link>
      </Col>
      <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_collection">
        <Link to="/collection">
        <h6 className="Home__NavigationCol_h6">BROWSE THE</h6>
        <h2>Collection</h2>
        </Link>
      </Col>
      <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_map">
        <Link to="/map">
          <h6 className="Home__NavigationCol_h6">EXPLORE THE</h6>
          <h2>Map</h2>
        </Link>
      </Col>
      <Col md="3" sm="6" xs="6" className="Home__NavigationCol Home__NavigationCol_timeline">
        <Link to="/timeline">
          <h6 className="Home__NavigationCol_h6">FOLLOW THE</h6>
          <h2>Timeline</h2>
        </Link>
      </Col>
    </Row>
  </Container>
)

export default Home
