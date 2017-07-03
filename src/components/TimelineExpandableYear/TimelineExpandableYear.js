import React, { PureComponent } from 'react'
import './TimelineExpandableYear.css'

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Month = ({ month, open }) => {
  if(open) {
    return (
      <div className="d-inline-block">
        <i className="fa fa-hand-pointer-o TimelineExpandableYear__month_marker_hand" />
        <i className="icon-fiber_manual_record TimelineExpandableYear__month_marker_active" />
      </div>)
  } else {
    return (<i className="icon-fiber_manual_record TimelineExpandableYear__month_marker" />)
  }
}

class TimelineExpandableYear extends PureComponent {

  onYearClick = () => {
    this.props.onYearClick(this.props.year)
  }

   render() {
    const { year, openMonth } = this.props
    return (
      <div onClick={this.onYearClick} className="TimelineExpandableYear__container">
        <span className={this.props.open ? "TimelineExpandableYear__year" : null}>{year}</span>
        {this.props.open ?
          <div className="TimelineExpandableYear__expandable">
            {months.map(month =>(
              <Month key={month} open={month === openMonth} />
            ))}
          </div>
         : null}
      </div>
    )
   }
}



export default TimelineExpandableYear
