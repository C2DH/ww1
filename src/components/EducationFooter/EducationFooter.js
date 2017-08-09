import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import './EducationFooter.css'

const EducationFooter = () => (
  <div className="EducationFooter__wrapper">
    <Container>
      <Row>
        <Col md="12">
          <div className="EducationFooter__content">
            <h5>Did you use our manuals? Tell us more!</h5>
            <a className="btn btn-secondary EducationFooter__Btn" href="https://docs.google.com/forms/d/e/1FAIpQLSey5ZCDw49_li-rFjzbLtGbKmVlEljQZZBxqpJG1uU_sv1sVA/viewform" target="_blank">submit</a>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
)

export default EducationFooter
