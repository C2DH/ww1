import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import { Card, CardImg, CardBlock } from 'reactstrap';
import EducationFooter from '../../components/EducationFooter'
import ManualExpandableItem from '../../components/ManualExpandableItem'
import './Manual.css'

const LinkedObjectCard = () => (
  <div>
    <Card className="Manual__LinkedObjectCard">
      <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" className="ManualCard__CardImg" />
      <CardBlock>
        <div className="d-inline-flex">
          <i className="icon-hand Manual__LinkedObjectCard_icon"  />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </CardBlock>
    </Card>
  </div>
)

const Manual = (props) => (
  <Container fluid className="padding-r-l-0">
    <div className="whitebackground-container">
      <div className="Manual__title_container">
        <Row className="Manual__TitleRow">
          <h6 className="red-subtitle">MANUALS</h6>
          <h1 className="Manual__title">The forgotten monument</h1>
        </Row>
      </div>
      <Row>
        <Col md="7" className="Manual__leftCol">
          <h6 className="red-subtitle">Goal of activity</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
        </Col>
        <Col md="5" className="Manual__rightCol">
          <h6 className="red-subtitle">Related themes</h6>
          <img src="https://images.pexels.com/photos/30772/pexels-photo-30772.jpg?h=350&auto=compress&cs=tinysrgb" className="img-fluid shadow" />
        </Col>
      </Row>
    </div>
    <div className="padding-left-30">
      <Row className="Manual__middleRow">
        <Col md="12">
          <h6 className="red-subtitle">suggested activities</h6>
        </Col>
        <Col md="8">
          <ManualExpandableItem num="1" title="manual 1" />
          <ManualExpandableItem num="2" title="manual 2" />
          <ManualExpandableItem num="3" title="manual 3" />
        </Col>
        <Col md="4">
          <LinkedObjectCard />
        </Col>
      </Row>
      <EducationFooter />
    </div>
  </Container>

)

export default Manual
