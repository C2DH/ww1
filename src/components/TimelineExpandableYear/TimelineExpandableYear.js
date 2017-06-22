import React, { PureComponent } from 'react'
import './TimelineExpandableYear.css'

const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

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
    const {year=""} = this.props
    return (
      <div onClick={this.toggleExpand} className="TimelineExpandableYear__container">
        <span className={this.state.open ? "TimelineExpandableYear__year" : null}>{year}</span>
        {this.state.open ?
          <div className="TimelineExpandableYear__expandable">
            {months.map(month =>(
              <i className="icon-fiber_manual_record TimelineExpandableYear__month_marker" key={month.id} />
            ))}
          </div>
         : null}
      </div>
    )
   }
}



export default TimelineExpandableYear
