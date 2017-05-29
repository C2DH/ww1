import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './TimelineExpandableItem.css'

const TimelineExpandableItem = (props) => (
  <Container className="TimelineExpandableItem__container">
    <Row>
      <Col md="2">
        <p>{props.date}</p>
      </Col>
      <Col md="9" className="TimelineExpandableItem__title">
        <h2>{props.title}</h2>
      </Col>
      <Col md="1">
        <button className="TimelineExpandableItem__btn"><i className="icon-add" /></button>
      </Col>
    </Row>
  </Container>
)

export default TimelineExpandableItem
