import React from 'react'
import { Row } from 'reactstrap'
import './BigTitle.css'

const BigTitle = (props) => (
  <div className="BigTitle__container">
    <Row className="BigTitle__TitleRow">
      <h1 className="BigTitle__title">{props.title}</h1>
    </Row>
  </div>
)

export default BigTitle
