import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import moment from 'moment'
import { Container, Row, Col, Collapse } from 'reactstrap';
import './TimelineExpandableItem.css'


const TimelineEventDate = ({ startDate, endDate}) => {

  const startDateFormatted = moment(startDate).format('DD MMMM YYYY')
  const endDateFormatted = moment(endDate).format('DD MMMM YYYY')

 if(startDate === endDate) {
   return (<h6>{startDateFormatted}</h6>)
 }  if(startDate && endDate) {
    return (<h6>{startDateFormatted} <br/> {endDateFormatted}</h6>)
  } if(startDate && !endDate) {
    return (<h6>{startDateFormatted}</h6>)
  } if(!startDate && endDate) {
    return (<h6>{endDateFormatted}</h6>)
  }
  return (<h6>Unknow date</h6>)

}



class TimelineExpandableItem extends PureComponent {

    state = {
      open:false
    }

    toggleExpand = () => {
      this.setState({
        open: !this.state.open
      })
    }

    componentDidUpdate() {
      if (this.props.scrollTo) {
        const node = ReactDOM.findDOMNode(this)
        node.scrollIntoView()
        this.props.onScrollComplete()
      }
    }

render () {

  return (
      <Container fluid={true}>
        <Row>
          <Col xs="12" md="3" lg="2" className="TimelineExpandableItem__date_container">
            <TimelineEventDate
              startDate={this.props.item.translated.date}
              endDate={this.props.item.translated.end_date}
            />
          </Col>
          <Col xs="12" md="8" lg="9">
          <h2 className="TimelineExpandableItem__title" onClick={this.toggleExpand}>
              {this.props.item.title}
            </h2>
          </Col>
          <Col md="1" lg="1" className="TimelineExpandableItem__btn_container hidden-sm-down">
            <button onClick={this.toggleExpand} className="btn btn-secondary TimelineExpandableItem__btn" key="button">
              <i className="material-icons">{this.state.open ? 'remove': 'add'}</i>
            </button>
          </Col>
        </Row>
        <Collapse isOpen={this.state.open}>
          <Row>
          <Col md={{ size: 9, offset: 3 }} lg={{ size: 9, offset: 2 }} className="TimelineExpandableItem__container">
            <h6 className="TimelineExpandableItem__show_less hidden-md-up" onClick={this.toggleExpand}><span>show less</span></h6>
              <p className="TimelineExpandableItem__text">{this.props.item.translated.description}</p>
          </Col>
          </Row>
          <Row>
          <Col md={{ size: 10, offset: 3 }}  lg={{ size: 10, offset: 2 }} className="TimelineExpandableItem__container">
              <h6 className="TimelineExpandableItem__imgTitle">related objects</h6>
              <div>
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" alt="historical document"/>
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" alt="historical document" />
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" alt="historical document" />
              </div>
          </Col>
          </Row>
        </Collapse>
      </Container>

     )
   }
}

export default TimelineExpandableItem
