import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import moment from 'moment'
import { Container } from 'reactstrap';
import './TimelineExpandableItem.css'


const TimelineEventDate = ({ startDate, endDate}) => {

  const startDateFormatted = moment(startDate).format('DD MMMM YYYY')
  const endDateFormatted = moment(endDate).format('DD MMMM YYYY')

 if(startDate === endDate) {
   return (<span>{startDateFormatted}</span>)
 }  if(startDate && endDate) {
    return (<span>{startDateFormatted} <br/> {endDateFormatted}</span>)
  } if(startDate && !endDate) {
    return (<span>{startDateFormatted}</span>)
  } if(!startDate && endDate) {
    return (<span>{endDateFormatted}</span>)
  }
  return (<span>Unknow date</span>)

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
      <Container className={this.state.open ? "TimelineExpandableItem__containerOpen" : "TimelineExpandableItem__containerClose" }>
        <div className="TimelineExpandableItem__responsive_click" onClick={this.toggleExpand} ></div>
        <div className="TimelineExpandableItem__flex_container">
          <div className="TimelineExpandableItem__date_container">
            <TimelineEventDate
              startDate={this.props.item.translated.date}
              endDate={this.props.item.translated.end_date}
            />
            {/* <p style={{marginBottom: 0}}>{this.props.item.translated.date}</p>
            <p>{(this.props.item.translated.date !== this.props.item.translated.end_date) && this.props.item.translated.end_date}</p> */}
          </div>
          <div className={this.state.open ? "TimelineExpandableItem__titleContainerOpen" : null}>
            <h2 className="TimelineExpandableItem__title">
              {this.props.item.translated.date}{' '}
              {this.props.item.title}
            </h2>
          </div>
          <div className="TimelineExpandableItem__btn_container hidden-xs-down">
            <button onClick={this.toggleExpand} className="expandableItem__btn" key="button">
              {this.state.open ? <i className="icon-remove" /> : <i className="icon-add" />}
            </button>
          </div>
        </div>
        {this.state.open ?
        <div>
          <div className="TimelineExpandableItem__flex_container">
            <div className="TimelineExpandableItem__show_less" onClick={this.toggleExpand}><p>SHOW LESS</p></div>
            <div className="TimelineExpandableItem__empty_left"></div>
            <div>
              <p className="TimelineExpandableItem__text">{this.props.item.translated.description}</p>
            </div>
            <div className="TimelineExpandableItem__empty_right"></div>
          </div>

          <div className="TimelineExpandableItem__flex_container">
            <div className="TimelineExpandableItem__empty_left"></div>
            <div>
              <h6 className="TimelineExpandableItem__imgTitle">RELATED OBJECTS</h6>
              <div>
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" alt="historical document"/>
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" alt="historical document" />
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" alt="historical document" />
              </div>
            </div>
          </div>
        </div> : null }
      </Container>

     )
   }
}

export default TimelineExpandableItem
