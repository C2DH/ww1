import React from 'react'
import moment from 'moment'



const EventDate = ({date, startDate, endDate}) => {

  const startDateFormatted = moment(startDate).format('MMMM DD, YYYY')
  const endDateFormatted = moment(endDate).format('MMMM DD, YYYY')

 if(startDate === endDate) {
   return (<span>{startDateFormatted}</span>)
 }  if(startDate && endDate) {
    return (<span>{startDateFormatted} - {endDateFormatted}</span>)
  } if(startDate && !endDate) {
    return (<span>{startDateFormatted}</span>)
  } if(date && (!startDate && !endDate)) {
    return (<span>{date}</span>)
  }
  return (<span>Unknow date</span>)

}

export default EventDate
