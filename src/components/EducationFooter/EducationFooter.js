import React from 'react'
import { Row, Col } from 'reactstrap'
import './EducationFooter.css'

const EducationFooter = () => (
  <div>
    <Row className="EducationFooter__row">
      <Col md="10">
        <h5>Did you use our manuals? Tell us more!</h5>
      </Col>
      <Col md="2">
        <button className="EducationFooter__Btn">submit</button>
      </Col>
    </Row>
  </div>
)

export default EducationFooter
