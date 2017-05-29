import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import TimelineExpandableItem from '../../components/TimelineExpandableItem'
import './Timeline.css'

const Timeline = () => (
  <div>
    <Row className="Timeline__TopRow">
      <Col md="12">
        <h2>Timeline</h2>
      </Col>
    </Row>
    <Row>
      <Col md="2">
        TimelineNav
      </Col>
      <Col md="10">
        <TimelineExpandableItem date="28 June 1914" title="Assassination of Archduke Franz Ferdinand of Austria in Sarajevo" />
        <TimelineExpandableItem date="2 August 1914" title="German Troops Invade Luxembourg" />
        <TimelineExpandableItem date="28 June 1914" title="Assassination of Archduke Franz Ferdinand of Austria in Sarajevo" />
        <TimelineExpandableItem date="28 June 1914" title="Assassination of Archduke Franz Ferdinand of Austria in Sarajevo" />
      </Col>
    </Row>
  </div>
)

export default Timeline
