import React, { PureComponent } from 'react'
import './TimelineExpandableYear.css'

class TimelineExpandableYear extends PureComponent {

   state = {
     open:false
   }

   toggleExpand = () => {
     this.setState({
       open: !this.state.open
     })
   }
   render() {
    return (
      <div onClick={this.toggleExpand} className="TimelineExpandableYear__container">
        <span className={this.state.open ? "TimelineExpandableYear__year" : null}>1914</span>
        {this.state.open ?
          <div>
            <i className="icon-fiber_manual_record" />
          </div>
         : null}
      </div>
    )
   }
}



export default TimelineExpandableYear
