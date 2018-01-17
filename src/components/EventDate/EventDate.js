import React from 'react'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import moment from 'moment'
import { getCurrentLanguage } from '../../state/selectors'

const EventDate = ({
  date,
  startDate,
  endDate,
  locale,
  component = 'span',
  format = 'MMMM DD, YYYY',
}) => {

  moment.locale(locale)
  const startDateFormatted = moment(startDate).format(format)
  const endDateFormatted = moment(endDate).format(format)
  // Ok this not look really good but i hate sbatte this clear possible
  // side effects of changing moment locale...
  moment.locale('en')
  console.log('~~~', startDate, endDate)

  if (date) {
    return React.createElement(component, null, date)
  }
  if (startDate === endDate) {
    return React.createElement(component, null, startDateFormatted)
  }
  if (startDate && endDate) {
    return React.createElement(component, null, `${startDateFormatted} - ${endDateFormatted}`)
  }
  if (startDate && !endDate) {
    return React.createElement(component, null, startDateFormatted)
  }
  if (!startDate && endDate) {
    return React.createElement(component, null, endDateFormatted)
  }
  return React.createElement(component, null, 'Unknow date')
}

const mapStateToProps = state => ({
  locale: getCurrentLanguage(state).label.toLowerCase(),
})
export default connect(mapStateToProps)(EventDate)
