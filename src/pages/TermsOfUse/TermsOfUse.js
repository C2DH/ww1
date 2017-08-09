import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import StaticStory from '../../components/StaticStory'
import BigTitle from '../../components/BigTitle'
import './TermsOfUse.css'

const TermOfUse = () => (
    <div className="About__wrapper">
      <Container>
        <BigTitle title="Terms of use" />
        <Row>
          <Col>
              <StaticStory slug='terms-of-use' />
          </Col>
        </Row>
      </Container>
    </div>

)

export default TermOfUse
