import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap';
import './TimelineExpandableItem.css'

class TimelineExpandableItem extends PureComponent {

    state = {
      open:false
    }

    toggleExpand = () => {
      this.setState({
        open: !this.state.open
      })
    }

render () {
  const { item } = this.props
  return (
      <Container className={this.state.open ? "TimelineExpandableItem__containerOpen" : "TimelineExpandableItem__containerClose" }>
        <Row>
          <Col md="2">
            <p>{this.props.item.date}</p>
          </Col>
          <Col md="9" className={this.state.open ? "TimelineExpandableItem__titleContainerOpen" : null}>
            <h2 className="TimelineExpandableItem__title">{this.props.item.title}</h2>
          </Col>
          <Col md="1">
            <button onClick={this.toggleExpand} className="TimelineExpandableItem__btn" key="button">
              {this.state.open ? <i className="icon-remove" /> : <i className="icon-add" />}
            </button>
          </Col>
        </Row>
        {this.state.open ?
        <div>
          <Row>
            <Col md="2" />
            <Col md="9">
              <p className="TimelineExpandableItem__text">{this.props.item.text}</p>
            </Col>
            <Col md="2" />
          </Row>
          <Row>
            <Col md="2" />
            <Col md="10">
              <h6 className="TimelineExpandableItem__imgTitle">RELATED OBJECTS</h6>
              <div>
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" />
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" />
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" />
              </div>
            </Col>
          </Row>
        </div> : null }
      </Container>
     )
   }
}

export default TimelineExpandableItem
