import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './ThemesCard.css'

const ThemesCard = (props) => (
  <Container className="ThemesCard__container">
    <Row>
      <Col md="5" className="ThemesCard__titleCol">
        <h1>{props.title}</h1>
      </Col>
      <Col md="7" className="ThemesCard__imgCol">
        <img className="img-responsives" alt={'placeholder'} src="http://placehold.it/630x370" />
      </Col>
    </Row>
  </Container>
)

export default ThemesCard
