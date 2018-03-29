import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Container, Row, Col, Collapse } from 'reactstrap'
import EventDate from '../EventDate'
import CollectionItemLink from '../CollectionItemLink'
import './TimelineExpandableItem.css'
import MdTitle from '../../components/MdTitle'
import { Link } from 'react-router-dom'
import { getCurrentLanguage } from '../../state/selectors'

const TimelineEventDate = ({ startDate, endDate }) => (
  <EventDate
    startDate={startDate}
    endDate={endDate}
    component='h6'
    format='DD MMMM YYYY'
  />
)

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
        node.scrollIntoView(true)
        this.props.onScrollComplete()
      }
    }

render () {
  const {lang} = this.props;
  return (
      <Container fluid={true} className='TimelineExpandableItem'>
        <Row>
          <Col xs="12" md="3" lg="2" className="TimelineExpandableItem__date_container">
            <TimelineEventDate
              startDate={this.props.item.translated.date}
              endDate={this.props.item.translated.end_date}
            />
          </Col>
          <Col xs="12" md="8" lg="9">
          <h2 className="TimelineExpandableItem__title" onClick={this.toggleExpand}>
              <MdTitle title={this.props.item.translated.title}></MdTitle>
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
            <h6 className="TimelineExpandableItem__show_less hidden-md-up" onClick={this.toggleExpand}><span>{this.context.t('show less')}</span></h6>
              <p className="TimelineExpandableItem__text">{this.props.item.translated.description}</p>
          </Col>
          </Row>
          { (this.props.item.documents.length > 0) &&
              <Row>
                <Col md={{ size: 9, offset: 3 }}  lg={{ size: 10, offset: 2 }}>
                    <h6 className="TimelineExpandableItem__imgTitle">related objects</h6>
                    <div className="TimelineExpandableItem__imgsContShadow">
                      <div className="TimelineExpandableItem__imgsCont">
                        {this.props.item.documents.map(document =>(
                          <div
                            key={document.id}
                            className="TimelineExpandableItem__imgFrame">
                            {/*<CollectionItemLink className="TimelineExpandableItem__imgLink" doc={document}></CollectionItemLink>*/}
                            <Link to={{ pathname:`/collection/item/${document.id}`, search: '?lang=' + lang.label.toLowerCase(), state:{modal:true} }}>
                              <img src={document.data.resolutions.thumbnail.url}></img>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                </Col>
              </Row>
          }
        </Collapse>
      </Container>
     )
   }
}

TimelineExpandableItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect(state => ({
  lang: getCurrentLanguage(state),
}))(TimelineExpandableItem)
// export default TimelineExpandableItem
