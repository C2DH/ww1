import React, { PureComponent } from 'react'
import { get, padStart } from 'lodash'
import './TimelineExpandableYear.css'

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Month = ({ month, validMonths, open, disabled, onMonthClick }) => {
  if(open) {
    return (
      <div className="d-inline-block">
        <i className="icon-hand TimelineExpandableYear__month_marker_hand" />
        <i className="icon-fiber_manual_record TimelineExpandableYear__month_marker_active" />
      </div>)
    }
  if (typeof validMonths[padStart(month, 2, 0)] === 'undefined') {
    return (<i className="icon-fiber_manual_record TimelineExpandableYear__month_marker" style={{color: '#222'}}/>)
  } else {
    return (<i className="icon-fiber_manual_record TimelineExpandableYear__month_marker" onClick={e => {
      e.preventDefault()
      e.stopPropagation()
      onMonthClick(month)
    }} />)
  }
}

const emptyObject = {}
class TimelineExpandableYear extends PureComponent {

  onYearClick = () => {
    this.props.onYearClick(this.props.year)
  }

  onMonthClick = (month) => {
    this.props.onYearClick(this.props.year, month)
  }

   render() {
    const { year, openMonth, validMonthsByYears, disabledMonths = [] } = this.props
    return (
      <div onClick={this.onYearClick} className="TimelineExpandableYear__container">
        <span className={this.props.open ? "TimelineExpandableYear__year expanded" : "TimelineExpandableYear__year"}>{year}</span>
        {this.props.open ?
          <div className="TimelineExpandableYear__expandable hidden-md-down">
            {months.map(month =>(
              <Month
                key={month}
                month={month}
                open={month === openMonth}
                onMonthClick={this.onMonthClick}
                validMonths={get(validMonthsByYears, year, emptyObject)}
                disabled={disabledMonths.indexOf(month) !== -1}
              />
            ))}
          </div>
         : null}
      </div>
    )
   }
}



export default TimelineExpandableYear
