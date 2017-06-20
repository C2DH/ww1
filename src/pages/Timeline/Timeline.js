import React from 'react'
import {  Row, Col } from 'reactstrap';
import TimelineExpandableItem from '../../components/TimelineExpandableItem'
import TimelineExpandableYear from '../../components/TimelineExpandableYear'
import './Timeline.css'

const items = [
  { id:1,  date : "28 June 1914", title: "Assassination of Archduke Franz Ferdinand of Austria in Sarajevo", text: "Donec rutrum congue leo eget malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit. Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada."},
  { id:2,  date : "2 August 1914", title: "German Troops Invade Luxembourg", text: "Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim."},
  { id:3,  date : "3 August 1914", title: "Germany Declares War to France", text: "Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim."},
]


const Timeline = () => (
  <div>
    <Row className="Timeline__TopRow">
      <Col md="12">
        <h2>Timeline</h2>
      </Col>
    </Row>
    <Row>
      <Col md="2" sm="12" className="Timeline__TimelineNav">
        <div className="Timeline__yearsContainer">
          <TimelineExpandableYear />
        </div>
      </Col>
      <Col md="10" sm="12">
        {
          items.map(item => (
              <TimelineExpandableItem item={item} key={item.id}/>
          ))
        }
      </Col>
    </Row>
  </div>
)

export default Timeline
