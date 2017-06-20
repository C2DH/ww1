import React, { PureComponent } from 'react'
import { Container } from 'reactstrap';
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
        <div className="TimelineExpandableItem__flex_container">
          <div className="TimelineExpandableItem__date_container">
            <p>{this.props.item.date}</p>
          </div>
          <div className={this.state.open ? "TimelineExpandableItem__titleContainerOpen" : null}>
            <h2 className="TimelineExpandableItem__title">{this.props.item.title}</h2>
          </div>
          <div className="TimelineExpandableItem__btn_container">
            <button onClick={this.toggleExpand} className="TimelineExpandableItem__btn" key="button">
              {this.state.open ? <i className="icon-remove" /> : <i className="icon-add" />}
            </button>
          </div>
        </div>
        {this.state.open ?
        <div>
          <div className="TimelineExpandableItem__flex_container">
            <div style={{minWidth: 130}}></div>
            <div>
              <p className="TimelineExpandableItem__text">{this.props.item.text}</p>
            </div>
            <div style={{minWidth: 130}}></div>
          </div>
          <div className="TimelineExpandableItem__flex_container">
            <div style={{minWidth: 130}}></div>
            <div>
              <h6 className="TimelineExpandableItem__imgTitle">RELATED OBJECTS</h6>
              <div>
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" />
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" />
                <img className="img-responsives TimelineExpandableItem__img" src="http://placehold.it/200x120" />
              </div>
            </div>
          </div>
        </div> : null }
      </Container>

     )
   }
}

export default TimelineExpandableItem
