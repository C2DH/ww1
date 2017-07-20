import React, { PureComponent } from 'react'
import './TimelineExpandableYear.css'

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Month = ({ month, open, disabled }) => {
  if(open) {
    return (
      <div className="d-inline-block">
        <i className="icon-hand TimelineExpandableYear__month_marker_hand" />
        <i className="icon-fiber_manual_record TimelineExpandableYear__month_marker_active" />
      </div>)}
  if(disabled) {
    return (<i className="icon-fiber_manual_record TimelineExpandableYear__month_marker" style={{color: 'green'}}/>)
  } else {
    return (<i className="icon-fiber_manual_record TimelineExpandableYear__month_marker" />)
  }
}

class TimelineExpandableYear extends PureComponent {

  onYearClick = () => {
    this.props.onYearClick(this.props.year)
  }

   render() {
    const { year, openMonth, disabledMonths = [] } = this.props
    return (
      <div onClick={this.onYearClick} className="TimelineExpandableYear__container">
        <span className={this.props.open ? "TimelineExpandableYear__year expanded" : "TimelineExpandableYear__year"}>{year}</span>
        {this.props.open ?
          <div className="TimelineExpandableYear__expandable hidden-md-down">
            {months.map(month =>(
              <Month key={month} open={month === openMonth} disabled={disabledMonths.indexOf(month) !== -1}/>
            ))}
          </div>
         : null}
      </div>
    )
   }
}



export default TimelineExpandableYear
