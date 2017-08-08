import React from 'react'
import { Row, Col } from 'reactstrap'
import './BigTitle.css'

const BigTitle = (props) => (
    <Row>
      <Col>
        <h1 className="BigTitle__title">{props.title}</h1>
      </Col>
    </Row>
)

export default BigTitle
